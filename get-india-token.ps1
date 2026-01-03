
# Script to get Zoho Refresh Token (INDIA Data Center)
# Run this in PowerShell

Write-Host "=== Zoho Inventory Refresh Token Generator (INDIA .in) ===" -ForegroundColor Cyan
Write-Host "This script will help you generate the correct token for your India account." -ForegroundColor Gray
Write-Host ""

# 1. Get Client Details
$clientId = "1000.KAH9MKV3AEIB0HMMZS2CRN0GQY1WKM"
$clientSecret = "8279e502cb770f4a0a388e626b7585be2f793504e3"

Write-Host "Using Client ID: $clientId" -ForegroundColor Gray


# 2. Open Browser for Code
$redirectUri = "https://zoho-dharsangroups.netlify.app/.netlify/functions/zoho-products"
$authUrl = "https://accounts.zoho.in/oauth/v2/auth?scope=ZohoInventory.FullAccess.all&client_id=$clientId&response_type=code&access_type=offline&redirect_uri=$redirectUri&prompt=consent"

Write-Host ""
Write-Host "1. A browser window will open." -ForegroundColor Yellow
Write-Host "2. Click 'Accept'." -ForegroundColor Yellow
Write-Host "3. You will be redirected to an error page (that's okay!)." -ForegroundColor Yellow
Write-Host "4. COPY the 'code' from the address bar URL." -ForegroundColor Yellow
Write-Host "   (Look for ?code=1000.xxxxxxx)" -ForegroundColor Yellow
Write-Host ""
pause

Start-Process $authUrl

# 3. Get Code
$code = Read-Host "Paste the 'code' here"

if ([string]::IsNullOrWhiteSpace($code)) {
    Write-Error "Code is required."
    exit
}

# 4. Exchange for Token
Write-Host ""
Write-Host "Exchanging code for Refresh Token..." -ForegroundColor Cyan

$tokenUrl = "https://accounts.zoho.in/oauth/v2/token"
$body = @{
    code = $code
    client_id = $clientId
    client_secret = $clientSecret
    redirect_uri = $redirectUri
    grant_type = "authorization_code"
}

try {
    $response = Invoke-RestMethod -Uri $tokenUrl -Method Post -Body $body
    
    if ($response.refresh_token) {
        Write-Host ""
        Write-Host "SUCCESS! Here is your new Refresh Token:" -ForegroundColor Green
        Write-Host "---------------------------------------------------"
        Write-Host $response.refresh_token -ForegroundColor Magenta
        Write-Host "---------------------------------------------------"
        Write-Host ""
        Write-Host "Now go to Netlify Site Settings > Environment Variables"
        Write-Host "Update ZOHO_REFRESH_TOKEN with this value."
        Write-Host "Add ZOHO_API_DOMAIN = https://www.zohoapis.in"
    } else {
        Write-Error "Failed to get refresh token. Response:"
        Write-Host ($response | Out-String) -ForegroundColor Red
    }
} catch {
    Write-Error "Request failed."
    Write-Host $_.Exception.Message -ForegroundColor Red
}
