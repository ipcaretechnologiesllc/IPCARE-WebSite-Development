#!/usr/bin/env python3
"""
Simple test to debug specific issues
"""

import requests
import json
import random
from pymongo import MongoClient

# Configuration
BASE_URL = "https://tracking-config.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "ipcare"

def test_careers_debug():
    """Debug careers endpoint without CV"""
    unique_ip = f"172.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    
    form_data = {
        'name': 'John Smith Debug',
        'email': f'johndebug{random.randint(1000,9999)}@example.com',
        'role': 'Software Engineer',
        'cover': 'I am interested in this position.',
        'recaptchaToken': ''
    }
    
    headers = {
        'X-Forwarded-For': unique_ip,
        'User-Agent': 'Debug-Test/1.0'
    }
    
    print("Testing careers without CV...")
    print(f"Form data: {form_data}")
    print(f"Headers: {headers}")
    
    response = requests.post(f"{API_BASE}/careers/apply", data=form_data, headers=headers)
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success: {data}")
        
        # Check database
        mongo_client = MongoClient(MONGO_URL)
        db = mongo_client[DB_NAME]
        doc = db.career_applications.find_one({"reference": data.get('reference')})
        if doc:
            print(f"✅ DB record: cvReceived={doc.get('cvReceived')}, cvSize={doc.get('cvSize')}")
        else:
            print("❌ No DB record found")
    else:
        print(f"❌ Failed: {response.status_code}")

def test_contact_debug():
    """Debug contact form XSS"""
    unique_ip = f"172.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    
    payload = {
        "name": "<img src=x onerror=alert(1)>Test Name",
        "company": "Test Corp",
        "email": f"xsstest{random.randint(1000,9999)}@example.com",
        "phone": "+971 50 123 4567",
        "country": "UAE",
        "service": "Test Service",
        "message": "Hello <script>alert('xss')</script> world",
        "tab": "general",
        "recaptchaToken": ""
    }
    
    headers = {
        'Content-Type': 'application/json',
        'X-Forwarded-For': unique_ip,
        'User-Agent': 'Debug-Test/1.0'
    }
    
    print("\nTesting contact form XSS sanitization...")
    print(f"Payload: {payload}")
    
    response = requests.post(f"{API_BASE}/contact", json=payload, headers=headers)
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success: {data}")
        
        # Check database
        mongo_client = MongoClient(MONGO_URL)
        db = mongo_client[DB_NAME]
        doc = db.leads.find_one({"reference": data.get('reference'), "type": "contact"})
        if doc:
            print(f"✅ DB record found")
            print(f"   Name: '{doc.get('name', '')}'")
            print(f"   Message: '{doc.get('message', '')}'")
            
            # Check sanitization
            name = doc.get('name', '')
            message = doc.get('message', '')
            
            if '<img' not in name and 'onerror=' not in name:
                print("✅ Name: HTML tags stripped")
            else:
                print("❌ Name: HTML tags not stripped")
                
            if '<script>' not in message and 'alert(' not in message:
                print("✅ Message: Script tags and alerts stripped")
            else:
                print("❌ Message: Script content not fully stripped")
        else:
            print("❌ No DB record found")
    else:
        print(f"❌ Failed: {response.status_code}")

if __name__ == "__main__":
    test_careers_debug()
    test_contact_debug()