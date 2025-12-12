export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'men' | 'women';
    subcategory: string;
    image: string;
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: 'm1',
        name: 'Premium Linen Shirt',
        price: 2499,
        category: 'men',
        subcategory: 'Shirts',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'm2',
        name: 'Tailored Chinos',
        price: 1999,
        category: 'men',
        subcategory: 'Pants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'm3',
        name: 'Classic White Shirt',
        price: 1899,
        category: 'men',
        subcategory: 'Shirts',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'm4',
        name: 'Slim Fit Jeans',
        price: 2299,
        category: 'men',
        subcategory: 'Pants',
        image: 'https://images.unsplash.com/photo-1542272617-08f086302542?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'm5',
        name: 'Cotton Kurta',
        price: 1499,
        category: 'men',
        subcategory: 'Ethnic',
        image: 'https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'm6',
        name: 'Formal Trousers',
        price: 2199,
        category: 'men',
        subcategory: 'Pants',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'w1',
        name: 'Silk Saree - Kanchipuram',
        price: 12999,
        category: 'women',
        subcategory: 'Sarees',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'w2',
        name: 'Designer Anarkali Suit',
        price: 5999,
        category: 'women',
        subcategory: 'Dresses',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800',
        inStock: false,
    },
    {
        id: 'w3',
        name: 'Cotton Printed Kurti',
        price: 1299,
        category: 'women',
        subcategory: 'Dresses',
        image: 'https://images.unsplash.com/photo-1550614000-4b9519e02a48?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'w4',
        name: 'Palazzo Pants',
        price: 999,
        category: 'women',
        subcategory: 'Pants',
        image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'w5',
        name: 'Embroidered Dupatta',
        price: 799,
        category: 'women',
        subcategory: 'Chunnis',
        image: 'https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
    {
        id: 'w6',
        name: 'Floral Maxi Dress',
        price: 2499,
        category: 'women',
        subcategory: 'Dresses',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        inStock: true,
    },
];
