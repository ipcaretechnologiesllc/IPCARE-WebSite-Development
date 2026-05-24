#!/usr/bin/env python3
"""
Test with detailed debugging to understand the careers issue
"""

import requests
import random

# Configuration
BASE_URL = "https://quizzical-pascal-7.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def test_careers_with_empty_file():
    """Test careers with an empty file field to trigger multipart"""
    unique_ip = f"172.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    
    form_data = {
        'name': 'John Smith Empty File',
        'email': f'johnempty{random.randint(1000,9999)}@example.com',
        'role': 'Software Engineer',
        'cover': 'I am interested in this position.',
        'recaptchaToken': ''
    }
    
    # Add an empty file field to ensure multipart/form-data
    files = {'cv': ('', '', 'application/octet-stream')}
    
    headers = {
        'X-Forwarded-For': unique_ip,
        'User-Agent': 'Empty-File-Test/1.0'
    }
    
    print("Testing careers with empty file field...")
    print(f"Form data: {form_data}")
    
    response = requests.post(f"{API_BASE}/careers/apply", data=form_data, files=files, headers=headers)
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success: {data}")
        if data.get('cvReceived') == False:
            print("✅ CV correctly marked as not received")
        else:
            print(f"❌ Expected cvReceived=false, got: {data.get('cvReceived')}")
    else:
        print(f"❌ Failed: {response.status_code}")

def test_simple_contact():
    """Test a simple contact to verify the API is working"""
    unique_ip = f"172.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    
    payload = {
        "name": "Simple Test",
        "company": "Test Corp",
        "email": f"simple{random.randint(1000,9999)}@example.com",
        "phone": "+971 50 123 4567",
        "country": "UAE",
        "service": "Test Service",
        "message": "Simple test message",
        "tab": "general",
        "recaptchaToken": ""
    }
    
    headers = {
        'Content-Type': 'application/json',
        'X-Forwarded-For': unique_ip,
        'User-Agent': 'Simple-Test/1.0'
    }
    
    print("\nTesting simple contact form...")
    response = requests.post(f"{API_BASE}/contact", json=payload, headers=headers)
    
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Contact Success: {data.get('reference')}")
    else:
        print(f"❌ Contact Failed: {response.text}")

if __name__ == "__main__":
    test_careers_with_empty_file()
    test_simple_contact()