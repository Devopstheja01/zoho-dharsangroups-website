const fs = require('fs');
const path = require('path');

// Manually defining the products to avoid TypeScript compilation issues in this standalone script
// Copying data structure from lib/data.ts
const products = [
    {
        name: 'Premium Cotton Formal Shirt',
        price: 2499,
        sku: 'MEN-SHI-PRE-001',
        description: 'High-quality cotton shirt suitable for formal occasions.',
        current_stock: 15,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Tailored Formal Trousers',
        price: 1999,
        sku: 'MEN-PAN-TAI-002',
        current_stock: 20,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Classic White Cotton Shirt',
        price: 1899,
        sku: 'MEN-SHI-CLA-003',
        current_stock: 10,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Premium Sherwani - Wedding',
        price: 15999,
        sku: 'MEN-WED-SHE-004',
        description: 'Exquisite wedding sherwani with intricate embroidery.',
        current_stock: 5,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Traditional Cotton Kurta',
        price: 1499,
        sku: 'MEN-ETH-TRA-005',
        current_stock: 12,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Office Formal Trousers',
        price: 2199,
        sku: 'MEN-PAN-OFF-006',
        current_stock: 18,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Kanchipuram Silk Saree',
        price: 12999,
        sku: 'WOM-SAR-KAN-001',
        description: 'Authentic Kanchipuram silk saree with rich border.',
        current_stock: 8,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Designer Anarkali Suit',
        price: 5999,
        sku: 'WOM-DRE-DES-002',
        current_stock: 10,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Cotton Printed Saree',
        price: 2999,
        sku: 'WOM-SAR-COT-003',
        current_stock: 15,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Elegant Party Dress',
        price: 3499,
        sku: 'WOM-DRE-ELE-004',
        current_stock: 10,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Traditional Pattu Saree',
        price: 8999,
        sku: 'WOM-SAR-PAT-005',
        current_stock: 6,
        type: 'Goods',
        unit: 'pcs'
    },
    {
        name: 'Indo-Western Fusion Dress',
        price: 4499,
        sku: 'WOM-DRE-FUS-006',
        current_stock: 10,
        type: 'Goods',
        unit: 'pcs'
    }
];

// CSV Header mapped to Zoho Inventory Import format
const csvHeader = [
    'Item Name',
    'SKU',
    'Rate',
    'Description',
    'Initial Stock',
    'Initial Stock Rate',
    'Item Type',
    'Unit'
].join(',');

// Generate CSV rows
const csvRows = products.map(product => {
    // Escape quotes in description
    const description = product.description ? `"${product.description.replace(/"/g, '""')}"` : '';
    const name = `"${product.name}"`;

    return [
        name,
        product.sku,
        product.price,
        description,
        product.current_stock,
        product.price, // Assuming cost price is same as selling price for initial import
        'Goods',
        'pcs'
    ].join(',');
});

// Combine header and rows
const csvContent = [csvHeader, ...csvRows].join('\n');

// Write to file
const outputPath = path.join(__dirname, 'zoho_import_products.csv');
fs.writeFileSync(outputPath, csvContent);

console.log(`✅ CSV generated successfully at: ${outputPath}`);
console.log('📋 Next Step: Go to Zoho Inventory -> Items -> Hamburger Menu -> Import Items and upload this file.');
