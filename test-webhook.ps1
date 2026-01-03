# Test your deployed webhook with this script
# Usage: ./test-webhook.ps1

$WebhookUrl = "https://zoho-dharsangroups.netlify.app/.netlify/functions/zoho-webhook"

Write-Host "Testing Webhook at: $WebhookUrl" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $WebhookUrl `
        -Method Post `
        -Body '{"event_type": "test_event", "item_id": "12345"}' `
        -ContentType "application/json"

    Write-Host "✅ Success! Response:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json)
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Server Message: $($reader.ReadToEnd())" -ForegroundColor Red
    }
}
