#!/usr/bin/env python3
"""
Test careers endpoint with proper multipart form data
"""

import requests
import random

# Configuration
BASE_URL = "https://quizzical-pascal-7.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def test_careers_multipart():
    """Test careers with proper multipart form data (no file)"""
    unique_ip = f"172.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    
    # Use requests to create proper multipart form data
    form_data = {
        'name': 'John Smith Multipart',
        'email': f'johnmp{random.randint(1000,9999)}@example.com',
        'role': 'Software Engineer',
        'cover': 'I am interested in this position.',
        'recaptchaToken': ''
    }
    
    headers = {
        'X-Forwarded-For': unique_ip,
        'User-Agent': 'Multipart-Test/1.0'
    }
    
    print("Testing careers with proper multipart (no CV file)...")
    print(f"Form data: {form_data}")
    
    # This will automatically set the correct multipart/form-data content-type
    response = requests.post(f"{API_BASE}/careers/apply", data=form_data, headers=headers)
    
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

if __name__ == "__main__":
    test_careers_multipart()