export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: 'men' | 'women';
    subcategory: string;
    image: string;
    images?: string[]; // Optional array for gallery
    description?: string;
    brand?: string;
    sku?: string;
    sizes?: string[];
    colors?: string[];
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
    customStitchingAvailable?: boolean;

    // Inventory Tracking
    stockQuantity?: number; // Total initial stock
    onlineSales?: number;
    offlineSales?: number;
}

export const products: Product[] = [
    // Men's Products
    {
        id: 'm1',
        name: 'Premium Cotton Formal Shirt',
        price: 2499,
        originalPrice: 2999,
        category: 'men',
        subcategory: 'Shirts',
        image: '/images/mens-shirt.png',
        images: ['/images/mens-shirt.png'],
        description: 'High-quality cotton shirt suitable for formal occasions.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Blue'],
        inStock: true,
        stockQuantity: 15,
        onlineSales: 2,
        offlineSales: 1,
        sku: 'MEN-SHI-PRE-001',
        rating: 4.5,
        reviewCount: 12,
        customStitchingAvailable: true
    },
    {
        id: 'm2',
        name: 'Tailored Formal Trousers',
        price: 1999,
        category: 'men',
        subcategory: 'Pants',
        image: '/images/mens-pants.png',
        inStock: true,
        stockQuantity: 20,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'MEN-PAN-TAI-002',
        sizes: ['30', '32', '34', '36'],
        customStitchingAvailable: true
    },
    {
        id: 'm3',
        name: 'Classic White Cotton Shirt',
        price: 1899,
        category: 'men',
        subcategory: 'Shirts',
        image: '/images/mens-shirt.png',
        inStock: true,
        stockQuantity: 10,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'MEN-SHI-CLA-003',
        sizes: ['S', 'M', 'L'],
    },
    {
        id: 'm4',
        name: 'Premium Sherwani - Wedding',
        price: 15999,
        originalPrice: 20000,
        category: 'men',
        subcategory: 'Wedding',
        image: '/images/mens-wedding.png',
        inStock: true,
        stockQuantity: 5,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'MEN-WED-SHE-004',
        customStitchingAvailable: true,
        description: 'Exquisite wedding sherwani with intricate embroidery.'
    },
    {
        id: 'm5',
        name: 'Traditional Cotton Kurta',
        price: 1499,
        category: 'men',
        subcategory: 'Ethnic',
        image: '/images/mens-shirt.png',
        inStock: true,
        stockQuantity: 12,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'MEN-ETH-TRA-005',
    },
    {
        id: 'm6',
        name: 'Office Formal Trousers',
        price: 2199,
        category: 'men',
        subcategory: 'Pants',
        image: '/images/mens-pants.png',
        inStock: true,
        stockQuantity: 18,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'MEN-PAN-OFF-006',
    },
    // Women's Products
    {
        id: 'w1',
        name: 'Kanchipuram Silk Saree',
        price: 12999,
        category: 'women',
        subcategory: 'Sarees',
        image: '/images/womens-saree.png',
        inStock: true,
        stockQuantity: 8,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'WOM-SAR-KAN-001',
        description: 'Authentic Kanchipuram silk saree with rich border.'
    },
    {
        id: 'w2',
        name: 'Designer Anarkali Suit',
        price: 5999,
        category: 'women',
        subcategory: 'Dresses',
        image: '/images/womens-dress.png',
        inStock: true,
        stockQuantity: 10,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'WOM-DRE-DES-002',
    },
    {
        id: 'w3',
        name: 'Cotton Printed Saree',
        price: 2999,
        category: 'women',
        subcategory: 'Sarees',
        image: '/images/womens-cotton.png',
        inStock: true,
        stockQuantity: 15,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'WOM-SAR-COT-003',
    },
    {
        id: 'w4',
        name: 'Elegant Party Dress',
        price: 3499,
        category: 'women',
        subcategory: 'Dresses',
        image: '/images/womens-dress.png',
        inStock: true,
        stockQuantity: 10,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'WOM-DRE-ELE-004',
    },
    {
        id: 'w5',
        name: 'Traditional Pattu Saree',
        price: 8999,
        category: 'women',
        subcategory: 'Sarees',
        image: '/images/womens-saree.png',
        inStock: true,
        stockQuantity: 6,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'WOM-SAR-PAT-005',
    },
    {
        id: 'w6',
        name: 'Indo-Western Fusion Dress',
        price: 4499,
        category: 'women',
        subcategory: 'Dresses',
        image: '/images/womens-dress.png',
        inStock: true,
        stockQuantity: 10,
        onlineSales: 0,
        offlineSales: 0,
        sku: 'WOM-DRE-FUS-006',
    },
];

// Store Information
export const storeInfo = {
    name: 'Dharsan Dresses',
    address: '81 Yadava Street, Varadaraja Nagar',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    pincode: '517501',
    country: 'India',
    phone: ['+91 8772224256', '+91 9440250863'],
    email: 'info@dharsangroups.com',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.3!2d79.4192!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzQzLjciTiA3OcKwMjUnMDkuMSJF!5e0!3m2!1sen!2sin!4v1234567890',
    googleMapsLink: 'https://maps.google.com/?q=Dharsan+Dresses+Yadava+Street+Tirupati',
    hours: {
        weekdays: '9:00 AM - 9:00 PM',
        weekends: '10:00 AM - 9:00 PM',
    },
};
