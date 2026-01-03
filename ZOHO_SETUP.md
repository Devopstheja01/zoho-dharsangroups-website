# Zoho Inventory Integration Setup Guide

## ✅ Integration Complete!

Your e-commerce site is now integrated with Zoho Inventory API. This guide will help you complete the setup.

---

## 📋 Step 1: Create `.env.local` File

1. In your project root, create a file named `.env.local`
2. Copy and paste the following content:

```env
# Zoho Inventory API Configuration - India Data Center
ZOHO_ORGANIZATION_ID=60062787877
ZOHO_CLIENT_ID=1000.RNSZ3RLVP5JPPIQIMAQL4KDSJ63XTG
ZOHO_CLIENT_SECRET=ba02a4a39cbadcaee26cd85dd48d8a10eb9f6b0274
ZOHO_REFRESH_TOKEN=1000.bce628c431ef7fa038760edf373c2a19.f0d6c0b42894fc5a259bd2bac2112df9
ZOHO_API_DOMAIN=https://www.zohoapis.in
```

**Important:** This file is already in `.gitignore` - it will NOT be committed to Git for security.

---

## 🔧 Step 2: Configure Netlify Environment Variables

### For Netlify Deployment:

1. Go to your Netlify Dashboard: https://app.netlify.com
2. Select your site: **dharsan-groups-ecommerce**
3. Navigate to: **Site settings** → **Environment variables**
4. Click **"Add a variable"** and add each of these:

| Variable Name | Value |
|---------------|-------|
| `ZOHO_ORGANIZATION_ID` | `60062787877` |
| `ZOHO_CLIENT_ID` | `1000.RNSZ3RLVP5JPPIQIMAQL4KDSJ63XTG` |
| `ZOHO_CLIENT_SECRET` | `ba02a4a39cbadcaee26cd85dd48d8a10eb9f6b0274` |
| `ZOHO_REFRESH_TOKEN` | `1000.bce628c431ef7fa038760edf373c2a19.f0d6c0b42894fc5a259bd2bac2112df9` |
| `ZOHO_API_DOMAIN` | `https://www.zohoapis.in` |

5. Click **"Save"** for each variable

---

## 🚀 Step 3: Test Locally

### Install Dependencies (if not already done):
```bash
npm install
```

### Test with Netlify Dev:
```bash
# Install Netlify CLI globally (one-time)
npm install -g netlify-cli

# Run locally with serverless functions
netlify dev
```

This will start your site at `http://localhost:8888` with working serverless functions!

### Test the API:
Once running, visit:
- **Products API**: http://localhost:8888/.netlify/functions/zoho-products
- **Main Site**: http://localhost:8888

---

## 📦 Step 4: Deploy to Netlify

### Option 1: Git Push (Recommended)
```bash
git add .
git commit -m "feat: integrate Zoho Inventory API"
git push
```

Netlify will auto-deploy!

###Option 2: Manual Deploy via Netlify CLI

```bash
netlify deploy --prod
```

---

## 🔍 What Was Changed?

### New Files Created:
1. **`lib/zoho-api.ts`** - Zoho API client with authentication
2. **`lib/zoho-mapper.ts`** - Maps Zoho items to your Product interface
3. **`netlify/functions/zoho-products.ts`** - Fetch products from Zoho
4. **`netlify/functions/zoho-webhook.ts`** - Handle Zoho webhooks
5. **`netlify/functions/zoho-create-order.ts`** - Create sales orders
6. **`.env.local.example`** - Template for environment variables

### Modified Files:
1. **`lib/data.ts`** - Added Zoho fields to Product interface
2. **`lib/productContext.tsx`** - Fetches from Zoho API with fallback to mock data
3. **`package.json`** - Added `@netlify/functions` dependency
4. **`netlify.toml`** - Configured serverless functions

---

## 🎯 How It Works

### Product Loading Flow:
1. **Primary**: Fetch from Zoho Inventory via `/.netlify/functions/zoho-products`
2. **Fallback 1**: Use cached Zoho data (if less than 1 hour old)
3. **Fallback 2**: Use mock data (original behavior)

This ensures your site always works, even if Zoho API is temporarily unavailable!

### Product Categorization:
The mapper automatically categorizes products as "men" or "women" based on:
- Custom fields in Zoho (e.g., `gender`)
- Category/Item Group names (e.g., "Men's Wear", "Sarees")
- Tags (e.g., "women", "men")
- Product name keywords (e.g., "shirt" → men, "saree" → women)

**You can customize this logic in `lib/zoho-mapper.ts`**

---

## 🔗 Step 5: Setup Zoho Webhooks (Optional)

For real-time inventory updates:

1. Go to **Zoho Inventory** → **Settings** → **Webhooks**
2. Click **"+ New Webhook"**
3. Configure:
   - **URL**: `https://dharsangroups.netlify.app/.netlify/functions/zoho-webhook`
   - **Events**: Select:
     - `item.created`
     - `item.updated`
     - `item.deleted`
     - `stock.updated`
   - **Status**: Active

4. Save

Now your site will be notified instantly when products change in Zoho!

---

## 📊 Step 6: Organize Your Products in Zoho

To ensure products appear correctly on your site:

### Option 1: Use Custom Fields
1. In Zoho, go to **Settings** → **Preferences** → **Items**
2. Add a custom field: `Gender` or `Category`
3. Set values: `Men` or `Women`

### Option 2: Use Categories
Create categories in Zoho:
- **Men's Wear**
  - Shirts
  - Pants
  - Ethnic
  - Wedding
- **Women's Wear**
  - Sarees
  - Dresses
  - Kurtis
  - Wedding

### Option 3: Use Tags
Simply tag items with "men" or "women"

The mapper will automatically detect and categorize!

---

## ✅ Verification Checklist

- [ ] `.env.local` file created with credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Tested locally with `netlify dev`
- [ ] API endpoint returns products: `/.netlify/functions/zoho-products`
- [ ] Netlify environment variables configured
- [ ] Pushed to Git and deployed
- [ ] Products from Zoho appear on website
- [ ] (Optional) Webhooks configured in Zoho

---

## 🐛 Troubleshooting

### "Cannot find module '@netlify/functions'"
Run: `npm install`

### "Invalid access token" error
- Check that all environment variables are set correctly
- Verify refresh token hasn't expired (regenerate if needed)
- Ensure you're using the India data center (`.in` not `.com`)

### Products not showing
- Check browser console for errors
- Visit `/.netlify/functions/zoho-products` to see raw API response
- Verify you have items in Zoho Inventory
- Check that items are marked as "active" in Zoho

### Local testing not working
- Make sure you're using `netlify dev` (not `npm run dev`)
- Verify `.env.local` exists in project root
- Check that Netlify CLI is installed: `npm install -g netlify-cli`

---

## 📞 Need Help?

- **Zoho API Docs**: https://www.zoho.com/inventory/api/v1/
- **Netlify Functions**: https://docs.netlify.com/functions/overview/

---

## 🎉 You're All Set!

Your e-commerce site is now powered by real inventory from Zoho! Products will sync automatically, and your team can manage everything from the Zoho Inventory dashboard.

**Next Steps:**
1. Add more products in Zoho Inventory
2. Test the checkout flow (orders will be created in Zoho)
3. Configure webhooks for real-time updates
4. Customize product categorization logic if needed
