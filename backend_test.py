#!/usr/bin/env python3
"""
Comprehensive backend testing for IP Care P1 form pipeline.
Tests all API endpoints with various scenarios including rate limiting,
input sanitization, PDF upload validation, and database persistence.
"""

import requests
import json
import time
import os
import tempfile
import random
import string
from pymongo import MongoClient
from datetime import datetime
import re

# Configuration
BASE_URL = "https://ecstatic-ptolemy-10.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "ipcare"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Backend-Test-Suite/1.0'
        })
        self.mongo_client = MongoClient(MONGO_URL)
        self.db = self.mongo_client[DB_NAME]
        self.test_results = []
        
    def log_result(self, test_name, success, details=""):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details
        })
        
    def generate_unique_ip(self):
        """Generate a unique IP for rate limit testing"""
        return f"192.168.{random.randint(1,254)}.{random.randint(1,254)}"
        
    def test_health_endpoint(self):
        """Test GET /api/health endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/health")
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('ok') == True and 
                    data.get('service') == 'IP Care Technologies API' and 
                    'time' in data):
                    self.log_result("Health endpoint", True, f"Response: {data}")
                    return True
                else:
                    self.log_result("Health endpoint", False, f"Invalid response structure: {data}")
                    return False
            else:
                self.log_result("Health endpoint", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Health endpoint", False, f"Exception: {str(e)}")
            return False
            
    def test_newsletter_subscribe(self):
        """Test POST /api/newsletter/subscribe endpoint"""
        try:
            # Test 1: Valid subscription
            test_email = f"user{random.randint(1000,9999)}@example.com"
            payload = {
                "email": test_email,
                "source": "test"
            }
            
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('ok') == True and 
                    data.get('emailSent') == True and 
                    data.get('mocked') == True):
                    self.log_result("Newsletter subscribe - valid email", True, f"Email: {test_email}")
                    
                    # Check MongoDB persistence
                    doc = self.db.newsletter_subscribers.find_one({"email": test_email})
                    if doc and all(field in doc for field in ['id', 'email', 'source', 'subscribedAt', 'ipAddress', 'userAgent', 'unsubscribeToken']):
                        self.log_result("Newsletter subscribe - DB persistence", True, "All required fields present")
                    else:
                        self.log_result("Newsletter subscribe - DB persistence", False, f"Missing fields in doc: {doc}")
                        
                else:
                    self.log_result("Newsletter subscribe - valid email", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_result("Newsletter subscribe - valid email", False, f"Status: {response.status_code}")
                return False
                
            # Test 2: Duplicate email (idempotent)
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=payload)
            if response.status_code == 200:
                data = response.json()
                if data.get('ok') == True and data.get('duplicate') == True:
                    self.log_result("Newsletter subscribe - duplicate email", True, "Idempotent behavior confirmed")
                else:
                    self.log_result("Newsletter subscribe - duplicate email", False, f"Expected duplicate=true, got: {data}")
            else:
                self.log_result("Newsletter subscribe - duplicate email", False, f"Status: {response.status_code}")
                
            # Test 3: Invalid email
            invalid_payload = {"email": "bad", "source": "test"}
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=invalid_payload)
            if response.status_code == 400:
                data = response.json()
                if data.get('error') == 'invalid-email':
                    self.log_result("Newsletter subscribe - invalid email", True, "Proper validation")
                else:
                    self.log_result("Newsletter subscribe - invalid email", False, f"Wrong error: {data}")
            else:
                self.log_result("Newsletter subscribe - invalid email", False, f"Expected 400, got: {response.status_code}")
                
            return True
            
        except Exception as e:
            self.log_result("Newsletter subscribe", False, f"Exception: {str(e)}")
            return False
            
    def test_contact_form(self):
        """Test POST /api/contact endpoint"""
        try:
            # Test 1: Valid contact form submission
            payload = {
                "name": "Test User",
                "company": "ACME Corp",
                "email": "test@example.com",
                "phone": "+971 50 123 4567",
                "country": "UAE",
                "service": "Managed IT Services",
                "message": "Hello <script>alert(1)</script>",
                "tab": "general",
                "recaptchaToken": ""
            }
            
            response = self.session.post(f"{API_BASE}/contact", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('ok') == True and 
                    'reference' in data and 
                    data.get('recaptchaScore') == 1):
                    
                    # Validate reference format CN-YYYYMMDD-XXXXXX
                    reference = data['reference']
                    if re.match(r'^CN-\d{8}-[A-Z0-9]{6}$', reference):
                        self.log_result("Contact form - valid submission", True, f"Reference: {reference}")
                        
                        # Check MongoDB persistence and XSS sanitization
                        doc = self.db.leads.find_one({"reference": reference, "type": "contact"})
                        if doc:
                            # Check if XSS payload was stripped
                            if '<script>' not in doc.get('message', '') and 'alert(1)' not in doc.get('message', ''):
                                self.log_result("Contact form - XSS sanitization", True, f"Message sanitized: {doc.get('message', '')}")
                            else:
                                self.log_result("Contact form - XSS sanitization", False, f"XSS not stripped: {doc.get('message', '')}")
                                
                            self.log_result("Contact form - DB persistence", True, "Document saved successfully")
                        else:
                            self.log_result("Contact form - DB persistence", False, "Document not found in database")
                    else:
                        self.log_result("Contact form - reference format", False, f"Invalid format: {reference}")
                else:
                    self.log_result("Contact form - valid submission", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_result("Contact form - valid submission", False, f"Status: {response.status_code}")
                return False
                
            # Test 2: Missing required field
            incomplete_payload = payload.copy()
            del incomplete_payload['email']
            
            response = self.session.post(f"{API_BASE}/contact", json=incomplete_payload)
            if response.status_code == 400:
                data = response.json()
                if data.get('error') == 'missing-required-fields':
                    self.log_result("Contact form - missing required field", True, "Proper validation")
                else:
                    self.log_result("Contact form - missing required field", False, f"Wrong error: {data}")
            else:
                self.log_result("Contact form - missing required field", False, f"Expected 400, got: {response.status_code}")
                
            return True
            
        except Exception as e:
            self.log_result("Contact form", False, f"Exception: {str(e)}")
            return False
            
    def test_rental_quote(self):
        """Test POST /api/rental/quote endpoint"""
        try:
            # Test 1: Valid rental quote submission
            payload = {
                "fullName": "Jane Doe",
                "company": "Event Co",
                "email": "jane@eventco.com",
                "phone": "+971 50 987 6543",
                "country": "UAE",
                "projectName": "Conference Setup",
                "startDate": "2026-03-01",
                "endDate": "2026-03-04",
                "location": "Yas Marina",
                "setupRequired": "Yes",
                "requirements": "Special setup notes",
                "source": "Google Search",
                "items": [
                    {
                        "brand": "Dell",
                        "model": "Latitude 5450",
                        "quantity": 25,
                        "duration": "Weekly"
                    }
                ],
                "recaptchaToken": ""
            }
            
            response = self.session.post(f"{API_BASE}/rental/quote", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('ok') == True and 
                    'reference' in data and 
                    data.get('recaptchaScore') == 1):
                    
                    # Validate reference format RQ-YYYYMMDD-XXXXXX
                    reference = data['reference']
                    if re.match(r'^RQ-\d{8}-[A-Z0-9]{6}$', reference):
                        self.log_result("Rental quote - valid submission", True, f"Reference: {reference}")
                        
                        # Check MongoDB persistence
                        doc = self.db.leads.find_one({"reference": reference, "type": "rental-quote"})
                        if doc and 'items' in doc and len(doc['items']) > 0:
                            item = doc['items'][0]
                            if all(field in item for field in ['brand', 'model', 'quantity', 'duration']):
                                self.log_result("Rental quote - DB persistence with items", True, f"Items preserved: {doc['items']}")
                            else:
                                self.log_result("Rental quote - DB persistence with items", False, f"Missing item fields: {item}")
                        else:
                            self.log_result("Rental quote - DB persistence", False, "Document or items not found")
                    else:
                        self.log_result("Rental quote - reference format", False, f"Invalid format: {reference}")
                else:
                    self.log_result("Rental quote - valid submission", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_result("Rental quote - valid submission", False, f"Status: {response.status_code}")
                return False
                
            # Test 2: Empty items array
            empty_items_payload = payload.copy()
            empty_items_payload['items'] = []
            
            response = self.session.post(f"{API_BASE}/rental/quote", json=empty_items_payload)
            if response.status_code == 200:
                self.log_result("Rental quote - empty items array", True, "Accepts empty items")
            else:
                self.log_result("Rental quote - empty items array", False, f"Status: {response.status_code}")
                
            # Test 3: Large items array (should truncate to 50)
            large_items_payload = payload.copy()
            large_items_payload['items'] = [payload['items'][0]] * 60  # 60 items
            
            response = self.session.post(f"{API_BASE}/rental/quote", json=large_items_payload)
            if response.status_code == 200:
                data = response.json()
                doc = self.db.leads.find_one({"reference": data['reference'], "type": "rental-quote"})
                if doc and len(doc['items']) == 50:
                    self.log_result("Rental quote - items truncation", True, f"Truncated to 50 items from 60")
                else:
                    self.log_result("Rental quote - items truncation", False, f"Expected 50 items, got: {len(doc['items']) if doc else 'no doc'}")
            else:
                self.log_result("Rental quote - items truncation", False, f"Status: {response.status_code}")
                
            return True
            
        except Exception as e:
            self.log_result("Rental quote", False, f"Exception: {str(e)}")
            return False
            
    def create_test_pdf(self, size_mb=None):
        """Create a test PDF file"""
        if size_mb:
            # Create large file for size testing
            content = b'%PDF-1.4\n' + b'x' * (size_mb * 1024 * 1024 - 10) + b'\n%EOF'
        else:
            # Create minimal valid PDF
            content = b'%PDF-1.4\ntest content\n%EOF'
            
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_file.write(content)
        temp_file.close()
        return temp_file.name
        
    def test_careers_apply(self):
        """Test POST /api/careers/apply endpoint (multipart/form-data)"""
        try:
            # Test 1: Valid application with PDF
            pdf_path = self.create_test_pdf()
            
            form_data = {
                'name': 'John Smith',
                'email': 'john@example.com',
                'role': 'Software Engineer',
                'cover': 'I am interested in this position.',
                'recaptchaToken': ''
            }
            
            with open(pdf_path, 'rb') as pdf_file:
                files = {'cv': ('resume.pdf', pdf_file, 'application/pdf')}
                
                # Remove Content-Type header for multipart
                headers = {k: v for k, v in self.session.headers.items() if k.lower() != 'content-type'}
                
                response = requests.post(f"{API_BASE}/careers/apply", 
                                       data=form_data, 
                                       files=files,
                                       headers=headers)
                
            os.unlink(pdf_path)  # Clean up
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('ok') == True and 
                    'reference' in data and 
                    data.get('cvReceived') == True and 
                    data.get('cvSize') > 0 and
                    data.get('recaptchaScore') == 1):
                    
                    # Validate reference format JOB-XXXXXXXXXX
                    reference = data['reference']
                    if re.match(r'^JOB-\d{10}$', reference):
                        self.log_result("Careers apply - valid with PDF", True, f"Reference: {reference}, CV size: {data['cvSize']}")
                        
                        # Check MongoDB persistence
                        doc = self.db.career_applications.find_one({"reference": reference})
                        if doc and all(field in doc for field in ['cvFileName', 'cvSize', 'cvReceived']):
                            self.log_result("Careers apply - DB persistence", True, f"CV info: {doc['cvFileName']}, {doc['cvSize']} bytes")
                        else:
                            self.log_result("Careers apply - DB persistence", False, f"Missing CV fields: {doc}")
                    else:
                        self.log_result("Careers apply - reference format", False, f"Invalid format: {reference}")
                else:
                    self.log_result("Careers apply - valid with PDF", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_result("Careers apply - valid with PDF", False, f"Status: {response.status_code}")
                return False
                
            # Test 2: Invalid PDF (plain text with .pdf extension)
            fake_pdf_path = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            fake_pdf_path.write(b'This is not a PDF file')
            fake_pdf_path.close()
            
            with open(fake_pdf_path.name, 'rb') as fake_pdf:
                files = {'cv': ('fake.pdf', fake_pdf, 'application/pdf')}
                headers = {k: v for k, v in self.session.headers.items() if k.lower() != 'content-type'}
                
                response = requests.post(f"{API_BASE}/careers/apply", 
                                       data=form_data, 
                                       files=files,
                                       headers=headers)
                                       
            os.unlink(fake_pdf_path.name)
            
            if response.status_code == 400:
                data = response.json()
                if data.get('error') == 'invalid-pdf-signature':
                    self.log_result("Careers apply - invalid PDF signature", True, "Proper PDF validation")
                else:
                    self.log_result("Careers apply - invalid PDF signature", False, f"Wrong error: {data}")
            else:
                self.log_result("Careers apply - invalid PDF signature", False, f"Expected 400, got: {response.status_code}")
                
            # Test 3: File too large (>5MB)
            large_pdf_path = self.create_test_pdf(6)  # 6MB file
            
            with open(large_pdf_path, 'rb') as large_pdf:
                files = {'cv': ('large.pdf', large_pdf, 'application/pdf')}
                headers = {k: v for k, v in self.session.headers.items() if k.lower() != 'content-type'}
                
                response = requests.post(f"{API_BASE}/careers/apply", 
                                       data=form_data, 
                                       files=files,
                                       headers=headers)
                                       
            os.unlink(large_pdf_path)
            
            if response.status_code == 413:
                data = response.json()
                if data.get('error') == 'file-too-large' and data.get('maxBytes') == 5242880:
                    self.log_result("Careers apply - file too large", True, f"Proper size validation: {data['maxBytes']} bytes max")
                else:
                    self.log_result("Careers apply - file too large", False, f"Wrong error: {data}")
            else:
                self.log_result("Careers apply - file too large", False, f"Expected 413, got: {response.status_code}")
                
            # Test 4: Wrong file type (PNG)
            png_path = tempfile.NamedTemporaryFile(delete=False, suffix='.png')
            png_path.write(b'\x89PNG\r\n\x1a\n')  # PNG signature
            png_path.close()
            
            with open(png_path.name, 'rb') as png_file:
                files = {'cv': ('image.png', png_file, 'image/png')}
                headers = {k: v for k, v in self.session.headers.items() if k.lower() != 'content-type'}
                
                response = requests.post(f"{API_BASE}/careers/apply", 
                                       data=form_data, 
                                       files=files,
                                       headers=headers)
                                       
            os.unlink(png_path.name)
            
            if response.status_code == 400:
                data = response.json()
                if data.get('error') == 'invalid-file-type':
                    self.log_result("Careers apply - wrong file type", True, "Proper file type validation")
                else:
                    self.log_result("Careers apply - wrong file type", False, f"Wrong error: {data}")
            else:
                self.log_result("Careers apply - wrong file type", False, f"Expected 400, got: {response.status_code}")
                
            # Test 5: No CV file (should still succeed)
            headers = {k: v for k, v in self.session.headers.items() if k.lower() != 'content-type'}
            response = requests.post(f"{API_BASE}/careers/apply", data=form_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('cvReceived') == False:
                    self.log_result("Careers apply - no CV file", True, "CV optional, application succeeded")
                else:
                    self.log_result("Careers apply - no CV file", False, f"Expected cvReceived=false, got: {data}")
            else:
                self.log_result("Careers apply - no CV file", False, f"Status: {response.status_code}")
                
            # Test 6: Missing required field
            incomplete_data = form_data.copy()
            del incomplete_data['role']
            
            headers = {k: v for k, v in self.session.headers.items() if k.lower() != 'content-type'}
            response = requests.post(f"{API_BASE}/careers/apply", data=incomplete_data, headers=headers)
            
            if response.status_code == 400:
                data = response.json()
                if data.get('error') == 'missing-required-fields':
                    self.log_result("Careers apply - missing required field", True, "Proper validation")
                else:
                    self.log_result("Careers apply - missing required field", False, f"Wrong error: {data}")
            else:
                self.log_result("Careers apply - missing required field", False, f"Expected 400, got: {response.status_code}")
                
            return True
            
        except Exception as e:
            self.log_result("Careers apply", False, f"Exception: {str(e)}")
            return False
            
    def test_rate_limiting(self):
        """Test rate limiting on contact endpoint"""
        try:
            # Use a unique IP for this test
            test_ip = self.generate_unique_ip()
            
            payload = {
                "name": "Rate Test",
                "company": "Test Corp",
                "email": "ratetest@example.com",
                "phone": "+971 50 123 4567",
                "country": "UAE",
                "service": "Test Service",
                "message": "Rate limit test",
                "tab": "general",
                "recaptchaToken": ""
            }
            
            headers = self.session.headers.copy()
            headers['X-Forwarded-For'] = test_ip
            
            success_count = 0
            rate_limited_count = 0
            
            # Make 7 requests quickly
            for i in range(7):
                response = requests.post(f"{API_BASE}/contact", json=payload, headers=headers)
                
                if response.status_code == 200:
                    success_count += 1
                elif response.status_code == 429:
                    rate_limited_count += 1
                    data = response.json()
                    if data.get('error') == 'too-many-requests' and 'retryAfter' in data:
                        self.log_result(f"Rate limit - request {i+1}", True, f"429 with retryAfter: {data['retryAfter']}")
                    else:
                        self.log_result(f"Rate limit - request {i+1}", False, f"Wrong 429 response: {data}")
                else:
                    self.log_result(f"Rate limit - request {i+1}", False, f"Unexpected status: {response.status_code}")
                    
                time.sleep(0.1)  # Small delay between requests
                
            # Verify rate limiting behavior
            if success_count == 5 and rate_limited_count == 2:
                self.log_result("Rate limiting behavior", True, f"First 5 succeeded, next 2 rate limited")
            else:
                self.log_result("Rate limiting behavior", False, f"Expected 5 success + 2 rate limited, got {success_count} + {rate_limited_count}")
                
            return True
            
        except Exception as e:
            self.log_result("Rate limiting", False, f"Exception: {str(e)}")
            return False
            
    def test_sanitization_regression(self):
        """Test input sanitization regression cases"""
        try:
            # Test 1: XSS in name field
            payload = {
                "name": "<img src=x onerror=alert(1)>",
                "company": "Test Corp",
                "email": "sanitize@example.com",
                "phone": "+971 50 123 4567",
                "country": "UAE",
                "service": "Test Service",
                "message": "Test message",
                "tab": "general",
                "recaptchaToken": ""
            }
            
            response = self.session.post(f"{API_BASE}/contact", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                doc = self.db.leads.find_one({"reference": data['reference'], "type": "contact"})
                
                if doc:
                    stored_name = doc.get('name', '')
                    if '<img' not in stored_name and 'onerror=' not in stored_name and 'alert(1)' not in stored_name:
                        self.log_result("Sanitization - XSS in name", True, f"Cleaned name: '{stored_name}'")
                    else:
                        self.log_result("Sanitization - XSS in name", False, f"XSS not cleaned: '{stored_name}'")
                else:
                    self.log_result("Sanitization - XSS in name", False, "Document not found")
            else:
                self.log_result("Sanitization - XSS in name", False, f"Status: {response.status_code}")
                
            # Test 2: Excessive newlines in message
            payload['name'] = "Normal Name"
            payload['message'] = "Line1\n\n\n\n\n\nLine2"
            
            response = self.session.post(f"{API_BASE}/contact", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                doc = self.db.leads.find_one({"reference": data['reference'], "type": "contact"})
                
                if doc:
                    stored_message = doc.get('message', '')
                    # Should collapse to maximum 2 consecutive newlines
                    if stored_message.count('\n\n\n') == 0:
                        self.log_result("Sanitization - excessive newlines", True, f"Collapsed message: '{stored_message}'")
                    else:
                        self.log_result("Sanitization - excessive newlines", False, f"Newlines not collapsed: '{stored_message}'")
                else:
                    self.log_result("Sanitization - excessive newlines", False, "Document not found")
            else:
                self.log_result("Sanitization - excessive newlines", False, f"Status: {response.status_code}")
                
            # Test 3: Email case normalization
            payload['message'] = "Normal message"
            payload['email'] = "USER@Example.COM"
            
            response = self.session.post(f"{API_BASE}/contact", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                doc = self.db.leads.find_one({"reference": data['reference'], "type": "contact"})
                
                if doc:
                    stored_email = doc.get('email', '')
                    if stored_email == "user@example.com":
                        self.log_result("Sanitization - email lowercase", True, f"Normalized email: '{stored_email}'")
                    else:
                        self.log_result("Sanitization - email lowercase", False, f"Email not normalized: '{stored_email}'")
                else:
                    self.log_result("Sanitization - email lowercase", False, "Document not found")
            else:
                self.log_result("Sanitization - email lowercase", False, f"Status: {response.status_code}")
                
            return True
            
        except Exception as e:
            self.log_result("Sanitization regression", False, f"Exception: {str(e)}")
            return False
            
    def test_resend_migration(self):
        """Test Resend migration - verify mock logs show [Resend][MOCKED] not [SendGrid][MOCKED]"""
        try:
            import subprocess
            
            # Clear previous logs by reading them
            subprocess.run(['sudo', 'supervisorctl', 'restart', 'nextjs'], 
                         capture_output=True, timeout=10)
            time.sleep(2)  # Wait for restart
            
            # Make a request that triggers email sending
            payload = {
                "email": f"resend-test-{random.randint(1000,9999)}@example.com",
                "source": "migration-test"
            }
            
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('ok') == True and data.get('mocked') == True:
                    # Check supervisor logs for Resend mock message
                    time.sleep(1)  # Give logs time to flush
                    
                    result = subprocess.run(
                        ['tail', '-n', '100', '/var/log/supervisor/nextjs.out.log'],
                        capture_output=True, text=True, timeout=5
                    )
                    
                    logs = result.stdout
                    
                    # Check for Resend mock log
                    if '[Resend][MOCKED]' in logs:
                        self.log_result("Resend migration - mock logs", True, "Found [Resend][MOCKED] in logs")
                        
                        # Verify NO SendGrid references
                        if '[SendGrid][MOCKED]' in logs or 'SendGrid' in logs:
                            self.log_result("Resend migration - no SendGrid logs", False, "Found SendGrid references in logs")
                        else:
                            self.log_result("Resend migration - no SendGrid logs", True, "No SendGrid references found")
                    else:
                        self.log_result("Resend migration - mock logs", False, f"[Resend][MOCKED] not found in logs. Log sample: {logs[-500:]}")
                else:
                    self.log_result("Resend migration - mock response", False, f"Expected mocked=true, got: {data}")
            else:
                self.log_result("Resend migration - request", False, f"Status: {response.status_code}")
                
            # Check source code for SendGrid imports
            result = subprocess.run(
                ['grep', '-r', 'sendgrid', '/app/app/', '/app/lib/'],
                capture_output=True, text=True, timeout=5
            )
            
            if result.returncode == 0:
                # Found sendgrid references
                self.log_result("Resend migration - no SendGrid imports", False, f"Found SendGrid references: {result.stdout[:200]}")
            else:
                # No sendgrid found (grep returns 1 when no matches)
                self.log_result("Resend migration - no SendGrid imports", True, "No SendGrid imports in codebase")
                
            return True
            
        except Exception as e:
            self.log_result("Resend migration", False, f"Exception: {str(e)}")
            return False
            
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting IP Care P1 Backend Testing Suite")
        print("=" * 60)
        
        # Wait for rate limit window to reset if needed
        print("⏳ Waiting 2 seconds for any previous rate limits to clear...")
        time.sleep(2)
        
        test_methods = [
            self.test_health_endpoint,
            self.test_resend_migration,  # NEW: Test Resend migration first
            self.test_newsletter_subscribe,
            self.test_contact_form,
            self.test_rental_quote,
            self.test_careers_apply,
            self.test_rate_limiting,
            self.test_sanitization_regression
        ]
        
        for test_method in test_methods:
            print(f"\n📋 Running {test_method.__name__}...")
            try:
                test_method()
            except Exception as e:
                self.log_result(test_method.__name__, False, f"Test method exception: {str(e)}")
            
            # Small delay between test groups to avoid rate limiting
            time.sleep(1)
            
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['details']}")
                    
        print("\n✅ PASSED TESTS:")
        for result in self.test_results:
            if result['success']:
                print(f"  - {result['test']}")
                
        return passed == total

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)