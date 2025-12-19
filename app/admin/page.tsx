'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useProducts } from '@/lib/productContext';
import { Product } from '@/lib/data';

export default function AdminPage() {
    const { products, addProduct } = useProducts();
    const [activeTab, setActiveTab] = useState('products');
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: 'men',
        subcategory: '',
        price: 0,
        image: '',
        inStock: true
    });

    const handleGenerateId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            id: handleGenerateId(),
            name: formData.name || 'Untitled Product',
            category: (formData.category as 'men' | 'women') || 'men',
            subcategory: formData.subcategory || 'General',
            price: Number(formData.price) || 0,
            image: formData.image || 'https://placehold.co/400x600?text=No+Image',
            inStock: formData.inStock ?? true
        };

        addProduct(newProduct);
        alert('Product added successfully!');
        setIsAdding(false);
        setFormData({
            name: '',
            category: 'men',
            subcategory: '',
            price: 0,
            image: '',
            inStock: true
        });
    };

    // Pagination for Admin Table (Client side simplified)
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const displayedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>DG Admin</div>
                <nav className={styles.nav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'inventory' ? styles.active : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >
                        Inventory List
                    </button>
                    <Link href="/" className={styles.navItem}>Back to Site</Link>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Dashboard</h1>
                    <div className={styles.user}>Admin User</div>
                </header>

                <div className={styles.content}>
                    {activeTab === 'products' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2>Product Management</h2>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsAdding(!isAdding)}
                                >
                                    {isAdding ? 'Cancel' : 'Add New Product'}
                                </button>
                            </div>

                            {isAdding && (
                                <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-lg mb-6 grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Product Name</label>
                                            <input
                                                className="input w-full p-2 border rounded"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Silk Shirt"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Category</label>
                                            <select
                                                className="input w-full p-2 border rounded"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                            >
                                                <option value="men">Men</option>
                                                <option value="women">Women</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Subcategory</label>
                                            <input
                                                className="input w-full p-2 border rounded"
                                                value={formData.subcategory}
                                                onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                                                placeholder="e.g. Shirts, Pants"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Price (₹)</label>
                                            <input
                                                type="number"
                                                className="input w-full p-2 border rounded"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-bold mb-1">Image URL</label>
                                            <input
                                                className="input w-full p-2 border rounded"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Leave empty for placeholder</p>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full mt-4">Save Product</button>
                                </form>
                            )}

                            <div className="overflow-x-auto">
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedProducts.map(p => (
                                            <tr key={p.id}>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <img src={p.image} className="w-8 h-8 rounded object-cover" alt="" />
                                                        {p.name}
                                                    </div>
                                                </td>
                                                <td>{p.category}</td>
                                                <td>₹{p.price}</td>
                                                <td>
                                                    <span className={p.inStock ? styles.badgeSuccess : styles.badgeError}>
                                                        {p.inStock ? 'In Stock' : 'Out Stock'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.pagination}>
                                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                                <span className="mx-2">Page {page} of {totalPages}</span>
                                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'products' && (
                        <div className={styles.placeholder}>
                            <p>Inventory management is integrated into the Products tab.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

