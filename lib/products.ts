// Product categories
export const categories = {
    men: {
        name: "Men's Collection",
        subcategories: ['Shirts', 'Pants', 'Jeans', 'Formals', 'Wedding Suits', 'Innerwear']
    },
    women: {
        name: "Women's Collection",
        subcategories: ['Cotton Sarees', 'Silk Sarees', 'Premium Sarees', 'Dresses', 'Chunnis', 'Innerwear']
    }
}

// Product interface
export interface Product {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    category: 'men' | 'women'
    subcategory: string
    images: string[]
    sizes: string[]
    colors?: string[]
    inStock: boolean
    stockCount: number
    customStitchingAvailable: boolean
    rating: number
    reviewCount: number
    tags: string[]
}

// Mock product data with actual images
export const products: Product[] = [
    // Men's Products
    {
        id: 'm1',
        name: 'Premium Cotton Shirt',
        description: 'Luxury cotton shirt with custom stitching available. Perfect for formal and casual wear.',
        price: 1200,
        originalPrice: 1500,
        category: 'men',
        subcategory: 'Shirts',
        images: ['/images/mens-shirt.png'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
        colors: ['White', 'Blue', 'Black'],
        inStock: true,
        stockCount: 45,
        customStitchingAvailable: true,
        rating: 4.5,
        reviewCount: 23,
        tags: ['formal', 'cotton', 'premium']
    },
    {
        id: 'm2',
        name: 'Formal Trousers',
        description: 'Classic formal pants with perfect fit. Available in multiple sizes.',
        price: 1400,
        category: 'men',
        subcategory: 'Pants',
        images: ['/images/mens-pants.png'],
        sizes: ['28', '30', '32', '34', '36', '38', 'Custom'],
        colors: ['Black', 'Navy', 'Grey'],
        inStock: true,
        stockCount: 32,
        customStitchingAvailable: true,
        rating: 4.7,
        reviewCount: 18,
        tags: ['formal', 'office']
    },
    {
        id: 'm3',
        name: 'Designer Wedding Suit',
        description: 'Luxury wedding suit with intricate embroidery. Custom measurements recommended.',
        price: 8500,
        originalPrice: 10000,
        category: 'men',
        subcategory: 'Wedding Suits',
        images: ['/images/mens-wedding.png'],
        sizes: ['S', 'M', 'L', 'XL', 'Custom'],
        colors: ['Cream', 'Gold', 'Maroon'],
        inStock: true,
        stockCount: 8,
        customStitchingAvailable: true,
        rating: 5.0,
        reviewCount: 12,
        tags: ['wedding', 'ethnic', 'premium']
    },
    {
        id: 'm4',
        name: 'Premium Denim Jeans',
        description: 'Comfortable stretch denim with modern fit.',
        price: 1800,
        category: 'men',
        subcategory: 'Jeans',
        images: ['/images/mens-pants.png'],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Blue', 'Black'],
        inStock: true,
        stockCount: 28,
        customStitchingAvailable: false,
        rating: 4.3,
        reviewCount: 31,
        tags: ['casual', 'denim']
    },

    // Women's Products
    {
        id: 'w1',
        name: 'Elegant Silk Saree',
        description: 'Pure silk saree with traditional border. Perfect for weddings and special occasions.',
        price: 4500,
        originalPrice: 5500,
        category: 'women',
        subcategory: 'Silk Sarees',
        images: ['/images/womens-saree.png'],
        sizes: ['Standard'],
        colors: ['Red', 'Green', 'Blue', 'Gold'],
        inStock: true,
        stockCount: 15,
        customStitchingAvailable: true,
        rating: 4.8,
        reviewCount: 42,
        tags: ['wedding', 'traditional', 'silk']
    },
    {
        id: 'w2',
        name: 'Cotton Saree Collection',
        description: 'Comfortable cotton saree for daily wear. Soft and breathable fabric.',
        price: 850,
        category: 'women',
        subcategory: 'Cotton Sarees',
        images: ['/images/womens-cotton.png'],
        sizes: ['Standard'],
        colors: ['Pink', 'Yellow', 'Green', 'Blue'],
        inStock: true,
        stockCount: 52,
        customStitchingAvailable: true,
        rating: 4.4,
        reviewCount: 67,
        tags: ['daily wear', 'cotton', 'comfortable']
    },
    {
        id: 'w3',
        name: 'Premium Designer Saree',
        description: 'Luxury designer saree with handwork. Limited edition piece.',
        price: 12000,
        category: 'women',
        subcategory: 'Premium Sarees',
        images: ['/images/womens-saree.png'],
        sizes: ['Standard'],
        colors: ['Maroon', 'Gold'],
        inStock: true,
        stockCount: 3,
        customStitchingAvailable: true,
        rating: 5.0,
        reviewCount: 8,
        tags: ['premium', 'designer', 'limited']
    },
    {
        id: 'w4',
        name: 'Western Dress',
        description: 'Modern western dress with elegant design. Available in all sizes.',
        price: 2200,
        category: 'women',
        subcategory: 'Dresses',
        images: ['/images/womens-dress.png'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
        colors: ['Black', 'Navy', 'Maroon'],
        inStock: true,
        stockCount: 24,
        customStitchingAvailable: true,
        rating: 4.6,
        reviewCount: 29,
        tags: ['western', 'modern', 'casual']
    },
    {
        id: 'w5',
        name: 'Designer Chunni',
        description: 'Beautiful chunni with embroidery work.',
        price: 650,
        category: 'women',
        subcategory: 'Chunnis',
        images: ['/images/womens-dress.png'],
        sizes: ['Standard'],
        colors: ['Red', 'Pink', 'Orange', 'Green'],
        inStock: true,
        stockCount: 38,
        customStitchingAvailable: false,
        rating: 4.2,
        reviewCount: 19,
        tags: ['ethnic', 'accessory']
    },
]

// Get products by category
export function getProductsByCategory(category: 'men' | 'women') {
    return products.filter(p => p.category === category)
}

// Get product by ID
export function getProductById(id: string) {
    return products.find(p => p.id === id)
}

// Filter products
export function filterProducts(
    category: 'men' | 'women',
    filters: {
        subcategories?: string[]
        priceRange?: [number, number]
        inStockOnly?: boolean
    }
) {
    let filtered = getProductsByCategory(category)

    if (filters.subcategories && filters.subcategories.length > 0) {
        filtered = filtered.filter(p => filters.subcategories!.includes(p.subcategory))
    }

    if (filters.priceRange) {
        const [min, max] = filters.priceRange
        filtered = filtered.filter(p => p.price >= min && p.price <= max)
    }

    if (filters.inStockOnly) {
        filtered = filtered.filter(p => p.inStock)
    }

    return filtered
}
