import { Product } from './data';

const PRODUCT_TYPES = {
    men: [
        { name: 'Classic Cotton Shirt', price: 1299, sub: 'Shirts' },
        { name: 'Slim Fit Chinos', price: 1499, sub: 'Pants' },
        { name: 'Urban Denim Jacket', price: 2499, sub: 'Jackets' },
        { name: 'Formal Oxford Shirt', price: 1899, sub: 'Shirts' },
        { name: 'Wedding Sherwani', price: 15999, sub: 'Wedding' },
        { name: 'Linen Kurta', price: 999, sub: 'Ethnic' },
        { name: 'Tailored Suit Trousers', price: 2199, sub: 'Pants' },
        { name: 'Casual Polo', price: 799, sub: 'T-Shirts' }
    ],
    women: [
        { name: 'Kanchipuram Silk Saree', price: 12999, sub: 'Sarees' },
        { name: 'Designer Anarkali', price: 5999, sub: 'Dresses' },
        { name: 'Cotton Printed Saree', price: 2499, sub: 'Sarees' },
        { name: 'Embroidered Kurti', price: 1299, sub: 'Kurtis' },
        { name: 'Party Wear Gown', price: 8999, sub: 'Dresses' },
        { name: 'Banarasi Silk Saree', price: 15999, sub: 'Sarees' },
        { name: 'Floral Summer Dress', price: 1999, sub: 'Dresses' },
        { name: 'Designer Lehenga', price: 25000, sub: 'Wedding' }
    ]
};

// Generate deterministic random-looking data
export function generateMockProducts(): Product[] {
    const products: Product[] = [];
    let idCounter = 1;

    // Generate 80 Men's items
    for (let i = 0; i < 80; i++) {
        const type = PRODUCT_TYPES.men[i % PRODUCT_TYPES.men.length];
        products.push({
            id: `m_gen_${idCounter++}`,
            name: `${type.name} - Vol. ${Math.floor(i / 8) + 1}`,
            price: type.price + (Math.floor(Math.random() * 500) - 250),
            category: 'men',
            subcategory: type.sub,
            image: `https://placehold.co/400x600/1a1a1a/FFF?text=${encodeURIComponent(type.name)}`,
            inStock: Math.random() > 0.1, // 90% in stock
            stockQuantity: 25,
            onlineSales: Math.floor(Math.random() * 5),
            offlineSales: Math.floor(Math.random() * 5)
        });
    }

    // Generate 80 Women's items
    for (let i = 0; i < 80; i++) {
        const type = PRODUCT_TYPES.women[i % PRODUCT_TYPES.women.length];
        products.push({
            id: `w_gen_${idCounter++}`,
            name: `${type.name} - Collection ${Math.floor(i / 8) + 1}`,
            price: type.price + (Math.floor(Math.random() * 1000) - 500),
            category: 'women',
            subcategory: type.sub,
            image: `https://placehold.co/400x600/e91e63/FFF?text=${encodeURIComponent(type.name)}`,
            inStock: Math.random() > 0.1,
            stockQuantity: 20,
            onlineSales: Math.floor(Math.random() * 3),
            offlineSales: Math.floor(Math.random() * 3)
        });
    }

    return products;
}
