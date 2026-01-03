# ⚠️ IMPORTANT - Environment Variables Required!

**Before deploying to Netlify, you MUST configure these 5 environment variables:**

```env
ZOHO_ORGANIZATION_ID=60062787877
ZOHO_CLIENT_ID=1000.RNSZ3RLVP5JPPIQIMAQL4KDSJ63XTG
ZOHO_CLIENT_SECRET=ba02a4a39cbadcaee26cd85dd48d8a10eb9f6b0274
ZOHO_REFRESH_TOKEN=1000.bce628c431ef7fa038760edf373c2a19.f0d6c0b42894fc5a259bd2bac2112df9
ZOHO_API_DOMAIN=https://www.zohoapis.in
```

**Where to add them:**
1. Netlify Dashboard → Your Site → Site settings → Environment variables
2. Add each variable one by one
3. After adding, trigger a redeploy: Deploys → Clear cache and deploy site

**If you see error**: `"Missing Zoho configuration"` - it means you forgot this step!

See full setup guide in: `ZOHO_SETUP.md`
