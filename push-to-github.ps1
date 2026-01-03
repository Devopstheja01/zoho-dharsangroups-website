# Quick Push to GitHub - zoho-dharsangroups-website
# Run these commands after creating the repository on GitHub

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    Pushing to New GitHub Repository" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Updating remote URL..." -ForegroundColor Cyan
git remote set-url origin https://github.com/Devopstheja01/zoho-dharsangroups-website.git

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote URL updated!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to update remote" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "    ✅ Successfully Pushed! 🎉" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your repository is now live at:" -ForegroundColor Yellow
    Write-Host "https://github.com/Devopstheja01/zoho-dharsangroups-website" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Visit the repository URL above" -ForegroundColor White
    Write-Host "2. Deploy to Netlify from this new repository" -ForegroundColor White
    Write-Host "3. Add environment variables in Netlify Dashboard" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "- Repository not created on GitHub yet" -ForegroundColor White
    Write-Host "- Wrong repository URL" -ForegroundColor White
    Write-Host "- Authentication required" -ForegroundColor White
    exit 1
}
