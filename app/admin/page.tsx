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

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        sku: '',
        category: 'men',
        subcategory: '',
        price: 0,
        image: '',
        inStock: true
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    const handleGenerateId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleGenerateSKU = () => {
        const prefix = formData.category === 'men' ? 'MN' : 'WM';
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${random}`;
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation 1: Size (Max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size too large! Please upload an image under 2MB.');
            e.target.value = ''; // Reset input
            return;
        }

        // Validation 2: Type
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            alert('Invalid format! Please upload JPG or PNG.');
            e.target.value = '';
            return;
        }

        // Convert to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            id: handleGenerateId(),
            name: formData.name || 'Untitled Product',
            sku: formData.sku || handleGenerateSKU(),
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
            sku: '',
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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            className="input w-full p-3 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Admin Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full py-3 rounded-lg font-bold">
                        Login
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">Hint: admin123</p>
                </form>
            </div>
        );
    }

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
                                            <label className="block text-sm font-bold mb-1">SKU (Optional)</label>
                                            <input
                                                className="input w-full p-2 border rounded"
                                                value={formData.sku}
                                                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                                                placeholder="Auto-generated if empty"
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
                                            <label className="block text-sm font-bold mb-1">Product Image</label>
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/webp"
                                                className="input w-full p-2 border rounded bg-white"
                                                onChange={handleImageUpload}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Required: JPG/PNG, Max 2MB. Aspect Ratio 3:4 recommended for best display.
                                            </p>
                                            {formData.image && (
                                                <div className="mt-2">
                                                    <p className="text-xs text-green-600 mb-1">✓ Image Selected</p>
                                                    <img src={formData.image} alt="Preview" className="h-20 w-auto rounded border" />
                                                </div>
                                            )}
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
                                            <th>SKU</th>
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
                                                        <img
                                                            src={p.image}
                                                            className="w-10 h-10 rounded object-cover border"
                                                            alt=""
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = `https://placehold.co/100x100?text=${p.name.charAt(0)}`;
                                                            }}
                                                        />
                                                        <span className="font-medium">{p.name}</span>
                                                    </div>
                                                </td>
                                                <td className="font-mono text-sm text-gray-600">{p.sku || '-'}</td>
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

                            <div className="pagination flex justify-center items-center gap-4 mt-6">
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </button>
                                <span className="text-sm font-medium">Page {page} of {totalPages}</span>
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
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

