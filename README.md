# Dharsan Groups - Enterprise E-commerce Platform

Premium tailoring and fashion e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

### Customer Features
- ✨ **Product Catalog** - Browse men's and women's collections with advanced filtering
- 🛒 **Shopping Cart** - Persistent cart with quantity controls
- 💳 **Checkout Flow** - Multi-step checkout with shipping, payment, and order review
- 👤 **User Accounts** - Registration, login, and profile management
- 📏 **Custom Tailoring** - Book tailoring services with measurement upload
- ❤️ **Wishlist** - Save favorite items
- 📱 **Responsive Design** - Works on all devices
- 🔍 **Product Search & Filters** - Find products by category, price, size

### Admin Features
- 📊 **Dashboard** - Overview of orders, revenue, and customers
- 📦 **Product Management** - Add, edit, and manage products
- 🛍️ **Order Management** - Track and manage customer orders
- 👥 **Customer Management** - View customer information
- 🗺️ **Partner Shops** - Manage tailoring partner locations

### Security Features
- 🔐 Secure authentication with localStorage (static site)
- 🛡️ Input validation and sanitization
- 🔒 Secure checkout process
- 📝 Privacy and security policies

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
cd c:\Users\HP\.gemini\antigravity\scratch\dharsan-groups
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production
```bash
npm run build
```

## 📁 Project Structure

```
dharsan-groups/
├── app/                    # Next.js app directory
│   ├── shop/              # Product catalog pages
│   ├── product/[id]/      # Product detail pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── account/           # User dashboard
│   ├── tailoring/         # Tailoring services
│   ├── admin/             # Admin portal
│   └── policies/          # Policy pages
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Utilities and data
│   ├── CartContext.tsx   # Cart state management
│   └── products.ts       # Product data
└── public/               # Static assets
    └── logo.png
```

## 🎨 Design System

### Colors
- **Primary (Navy)**: `#0f172a` - Headers, buttons, text
- **Accent (Gold)**: `#d4af37` - CTAs, highlights, accents
- **Surface**: `#f8fafc` - Page backgrounds
- **White**: `#ffffff` - Cards, overlays

### Typography
- **Headings**: Georgia serif font
- **Body**: System sans-serif stack

## 🌐 Deployment

### Netlify (Recommended for Testing)

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Deploy!

### Manual Deployment (Your Server with Podman)

1. Build the static site:
```bash
npm run build
```

2. The `out` directory contains the static files
3. Serve with any web server or containerize:

```dockerfile
FROM nginx:alpine
COPY out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
podman build -t dharsan-groups .
podman run -d -p 80:80 dharsan-groups
```

## 📝 Mock Credentials

### Customer Login
- Any email/mobile combination works (mock authentication)
- Password: any value

### Admin Login
- Username: `admin`
- Password: any value
- Access at: `/admin/login`

## 🛍️ Product Data

Products are stored in `lib/products.ts`. Currently includes:
- Men's: Shirts, Pants, Jeans, Wedding Suits
- Women's: Silk Sarees, Cotton Sarees, Dresses, Chunnis

## 📦 Payment Methods (Mock)
- Cash on Delivery (COD)
- UPI (GPay, PhonePe, Paytm)
- Credit/Debit Cards

## 🚚 Shipping
- Free shipping on orders above ₹2,000
- ₹100 flat rate for orders below ₹2,000
- Delivery within Telugu states (AP & Telangana)
- Estimated delivery: 3-7 business days

## 📞 Contact Information
- Location: Tirupati, Andhra Pradesh
- Email: info@dharsangroups.com
- WhatsApp: Available via contact page

## 🔄 Returns Policy
- 2-day return policy on damaged items
- Refund processed within 10 business days
- Custom-tailored items non-returnable

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Context API
- **Storage**: LocalStorage (client-side)

## 📄 License
Copyright © 2024 Dharsan Groups. All rights reserved.

## 🤝 Support
For questions or support, contact: support@dharsangroups.com

---

**Built with ❤️ for Dharsan Groups**
