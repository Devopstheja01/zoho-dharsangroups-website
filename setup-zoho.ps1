# Zoho Integration Setup Script
# Run this after creating .env.local file

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    Zoho Inventory Integration Setup" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create .env.local with your Zoho credentials:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ZOHO_ORGANIZATION_ID=60062787877" -ForegroundColor White
    Write-Host "ZOHO_CLIENT_ID=1000.RNSZ3RLVP5JPPIQIMAQL4KDSJ63XTG" -ForegroundColor White
    Write-Host "ZOHO_CLIENT_SECRET=ba02a4a39cbadcaee26cd85dd48d8a10eb9f6b0274" -ForegroundColor White
    Write-Host "ZOHO_REFRESH_TOKEN=1000.bce628c431ef7fa038760edf373c2a19.f0d6c0b42894fc5a259bd2bac2112df9" -ForegroundColor White
    Write-Host "ZOHO_API_DOMAIN=https://www.zohoapis.in" -ForegroundColor White
    Write-Host ""
    exit 1
} else {
    Write-Host "✅ .env.local file found" -ForegroundColor Green
}

# Check if npm is available
Write-Host ""
Write-Host "Checking for npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version  2>$null
    if ($npmVersion) {
        Write-Host "✅ npm version $npmVersion detected" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Check for Netlify CLI
Write-Host ""
Write-Host "Checking for Netlify CLI..." -ForegroundColor Cyan
try {
    $netlifyVersion = netlify --version 2>$null
    if ($netlifyVersion) {
        Write-Host "✅ Netlify CLI detected" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Netlify CLI installed!" -ForegroundColor Green
    }
}

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    Setup Complete! 🎉" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Test locally:" -ForegroundColor White
Write-Host "   netlify dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Visit:" -ForegroundColor White
Write-Host "   http://localhost:8888" -ForegroundColor Cyan
Write-Host "   http://localhost:8888/.netlify/functions/zoho-products" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Deploy to Netlify:" -ForegroundColor White
Write-Host "   - Add environment variables in Netlify Dashboard" -ForegroundColor Gray
Write-Host "   - git add . && git commit -m 'feat: Zoho integration' && git push" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 See ZOHO_SETUP.md for full documentation" -ForegroundColor Yellow
Write-Host ""
