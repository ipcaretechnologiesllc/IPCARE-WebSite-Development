#!/usr/bin/env python3
"""
Focused backend testing for remaining issues with rate limit handling.
"""

import requests
import json
import time
import os
import tempfile
import random
from pymongo import MongoClient
import re

# Configuration
BASE_URL = "https://ipcare-go-live.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "ipcare"

class FocusedTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Backend-Test-Suite/1.0'
        })
        self.mongo_client = MongoClient(MONGO_URL)
        self.db = self.mongo_client[DB_NAME]
        
    def generate_unique_ip(self):
        """Generate a unique IP for rate limit testing"""
        return f"10.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
        
    def test_contact_with_unique_ip(self):
        """Test contact form with unique IP to avoid rate limiting"""
        try:
            unique_ip = self.generate_unique_ip()
            
            payload = {
                "name": "Test User",
                "company": "ACME Corp",
                "email": f"test{random.randint(1000,9999)}@example.com",
                "phone": "+971 50 123 4567",
                "country": "UAE",
                "service": "Managed IT Services",
                "message": "Hello <script>alert(1)</script>",
                "tab": "general",
                "recaptchaToken": ""
            }
            
            headers = {
                'Content-Type': 'application/json',
                'X-Forwarded-For': unique_ip,
                'User-Agent': 'Backend-Test-Suite/1.0'
            }
            
            response = requests.post(f"{API_BASE}/contact", json=payload, headers=headers)
            
            print(f"Contact form test - Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Contact form successful: {data}")
                
                # Check XSS sanitization
                if 'reference' in data:
                    doc = self.db.leads.find_one({"reference": data['reference'], "type": "contact"})
                    if doc:
                        message = doc.get('message', '')
                        if '<script>' not in message and 'alert(1)' not in message:
                            print(f"✅ XSS sanitization working: '{message}'")
                        else:
                            print(f"❌ XSS not sanitized: '{message}'")
                    else:
                        print("❌ Document not found in database")
                        
                return True
            else:
                print(f"❌ Contact form failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Contact test exception: {str(e)}")
            return False
            
    def test_careers_no_cv(self):
        """Test careers application without CV file"""
        try:
            unique_ip = self.generate_unique_ip()
            
            form_data = {
                'name': 'John Smith',
                'email': f'john{random.randint(1000,9999)}@example.com',
                'role': 'Software Engineer',
                'cover': 'I am interested in this position.',
                'recaptchaToken': ''
            }
            
            headers = {
                'X-Forwarded-For': unique_ip,
                'User-Agent': 'Backend-Test-Suite/1.0'
            }
            
            response = requests.post(f"{API_BASE}/careers/apply", data=form_data, headers=headers)
            
            print(f"Careers no CV test - Status: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('cvReceived') == False:
                    print(f"✅ Careers without CV successful: {data}")
                    return True
                else:
                    print(f"❌ Expected cvReceived=false, got: {data}")
                    return False
            else:
                print(f"❌ Careers without CV failed: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Careers no CV test exception: {str(e)}")
            return False
            
    def test_sanitization_cases(self):
        """Test specific sanitization cases with unique IPs"""
        try:
            # Test XSS in name
            unique_ip1 = self.generate_unique_ip()
            
            payload = {
                "name": "<img src=x onerror=alert(1)>",
                "company": "Test Corp",
                "email": f"sanitize{random.randint(1000,9999)}@example.com",
                "phone": "+971 50 123 4567",
                "country": "UAE",
                "service": "Test Service",
                "message": "Test message",
                "tab": "general",
                "recaptchaToken": ""
            }
            
            headers = {
                'Content-Type': 'application/json',
                'X-Forwarded-For': unique_ip1,
                'User-Agent': 'Backend-Test-Suite/1.0'
            }
            
            response = requests.post(f"{API_BASE}/contact", json=payload, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                doc = self.db.leads.find_one({"reference": data['reference'], "type": "contact"})
                
                if doc:
                    stored_name = doc.get('name', '')
                    if '<img' not in stored_name and 'onerror=' not in stored_name:
                        print(f"✅ XSS in name sanitized: '{stored_name}'")
                    else:
                        print(f"❌ XSS not cleaned: '{stored_name}'")
                else:
                    print("❌ Document not found for XSS test")
            else:
                print(f"❌ XSS test failed: {response.status_code}")
                
            time.sleep(1)  # Brief pause
            
            # Test email case normalization
            unique_ip2 = self.generate_unique_ip()
            
            payload2 = {
                "name": "Normal Name",
                "company": "Test Corp",
                "email": "USER@Example.COM",
                "phone": "+971 50 123 4567",
                "country": "UAE",
                "service": "Test Service",
                "message": "Test message",
                "tab": "general",
                "recaptchaToken": ""
            }
            
            headers2 = {
                'Content-Type': 'application/json',
                'X-Forwarded-For': unique_ip2,
                'User-Agent': 'Backend-Test-Suite/1.0'
            }
            
            response = requests.post(f"{API_BASE}/contact", json=payload2, headers=headers2)
            
            if response.status_code == 200:
                data = response.json()
                doc = self.db.leads.find_one({"reference": data['reference'], "type": "contact"})
                
                if doc:
                    stored_email = doc.get('email', '')
                    if stored_email == "user@example.com":
                        print(f"✅ Email normalized: '{stored_email}'")
                    else:
                        print(f"❌ Email not normalized: '{stored_email}'")
                else:
                    print("❌ Document not found for email test")
            else:
                print(f"❌ Email normalization test failed: {response.status_code}")
                
            return True
            
        except Exception as e:
            print(f"❌ Sanitization test exception: {str(e)}")
            return False
            
    def run_focused_tests(self):
        """Run focused tests for the failing cases"""
        print("🔍 Running Focused Backend Tests")
        print("=" * 50)
        
        print("\n1. Testing Contact Form with XSS...")
        self.test_contact_with_unique_ip()
        
        time.sleep(2)
        
        print("\n2. Testing Careers without CV...")
        self.test_careers_no_cv()
        
        time.sleep(2)
        
        print("\n3. Testing Sanitization Cases...")
        self.test_sanitization_cases()
        
        print("\n" + "=" * 50)
        print("🏁 Focused tests completed")

if __name__ == "__main__":
    tester = FocusedTester()
    tester.run_focused_tests()