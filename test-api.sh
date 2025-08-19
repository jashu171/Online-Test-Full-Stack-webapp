#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧪 Testing Authentication API${NC}"
echo "================================"

API_URL="http://localhost:5001/api"

# Test health endpoint
echo -e "${YELLOW}1. Testing health endpoint...${NC}"
curl -s "$API_URL/health" | python3 -m json.tool
echo ""

# Test registration
echo -e "${YELLOW}2. Testing user registration...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "Password123"}')

echo "$REGISTER_RESPONSE" | python3 -m json.tool
echo ""

# Extract token from registration response
TOKEN=$(echo "$REGISTER_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('token', ''))" 2>/dev/null)

if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✅ Registration successful! Token received.${NC}"
    
    # Test token verification
    echo -e "${YELLOW}3. Testing token verification...${NC}"
    curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/auth/verify" | python3 -m json.tool
    echo ""
    
    # Test profile endpoint
    echo -e "${YELLOW}4. Testing profile endpoint...${NC}"
    curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/auth/profile" | python3 -m json.tool
    echo ""
else
    echo -e "${RED}❌ Registration failed or user already exists.${NC}"
    
    # Try login instead
    echo -e "${YELLOW}3. Testing login with existing user...${NC}"
    LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
      -H "Content-Type: application/json" \
      -d '{"email": "test@example.com", "password": "Password123"}')
    
    echo "$LOGIN_RESPONSE" | python3 -m json.tool
    echo ""
    
    TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('token', ''))" 2>/dev/null)
    
    if [ -n "$TOKEN" ]; then
        echo -e "${GREEN}✅ Login successful! Token received.${NC}"
        
        # Test profile endpoint
        echo -e "${YELLOW}4. Testing profile endpoint...${NC}"
        curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/auth/profile" | python3 -m json.tool
        echo ""
    fi
fi

echo -e "${GREEN}🎉 API testing completed!${NC}"