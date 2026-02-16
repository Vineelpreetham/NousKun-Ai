#!/bin/bash

# Helper script to extract Google Service Account credentials
# This script will help you find and extract the private key from the downloaded JSON file

echo "🔍 Searching for Google Service Account JSON files..."
echo ""

# Search in common download locations
JSON_FILES=$(find ~/Downloads ~/Desktop ~/Documents -name "*nouskun-ai-integration*.json" -o -name "*c7e5ccc33937*.json" 2>/dev/null)

if [ -z "$JSON_FILES" ]; then
    echo "❌ Could not find the JSON file automatically."
    echo ""
    echo "Please manually locate the file:"
    echo "  Filename: nouskun-ai-integration-c7e5ccc33937.json"
    echo "  Likely location: ~/Downloads/"
    echo ""
    echo "Once found, run this command to extract the private key:"
    echo '  cat /path/to/file.json | jq -r .private_key'
    echo ""
    echo "Then copy the output and paste it into .env.local as GOOGLE_PRIVATE_KEY"
    exit 1
fi

echo "✅ Found JSON file(s):"
echo "$JSON_FILES"
echo ""

# Use the first file found
JSON_FILE=$(echo "$JSON_FILES" | head -1)

echo "📄 Extracting credentials from: $JSON_FILE"
echo ""

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "⚠️  jq is not installed. Installing via Homebrew..."
    brew install jq
fi

# Extract credentials
CLIENT_EMAIL=$(cat "$JSON_FILE" | jq -r '.client_email')
PRIVATE_KEY=$(cat "$JSON_FILE" | jq -r '.private_key')

echo "✅ Extracted credentials:"
echo ""
echo "GOOGLE_CLIENT_EMAIL=\"$CLIENT_EMAIL\""
echo ""
echo "GOOGLE_PRIVATE_KEY (first 50 chars):"
echo "${PRIVATE_KEY:0:50}..."
echo ""

# Update .env.local
ENV_FILE="/Users/vineelpreetham/Documents/nouskun-ai/.env.local"

echo "📝 Updating $ENV_FILE..."

# Escape the private key for sed
ESCAPED_KEY=$(echo "$PRIVATE_KEY" | sed 's/[&/\]/\\&/g')

# Update the .env.local file
sed -i '' "s|GOOGLE_PRIVATE_KEY=\".*\"|GOOGLE_PRIVATE_KEY=\"$ESCAPED_KEY\"|" "$ENV_FILE"

echo "✅ Updated .env.local with private key!"
echo ""
echo "🎉 Setup complete! Your credentials are now configured."
echo ""
echo "Next steps:"
echo "1. cd /Users/vineelpreetham/Documents/nouskun-ai"
echo "2. npm run dev"
echo "3. Test the contact form!"
