'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('products');

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
                        className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'inventory' ? styles.active : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >
                        Inventory
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
                                <button className="btn btn-primary">Add New Product</button>
                            </div>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Premium Linen Shirt</td>
                                        <td>Men</td>
                                        <td>₹2,499</td>
                                        <td><span className={styles.badgeSuccess}>In Stock</span></td>
                                        <td><button className={styles.btnLink}>Edit</button></td>
                                    </tr>
                                    <tr>
                                        <td>Silk Saree</td>
                                        <td>Women</td>
                                        <td>₹12,999</td>
                                        <td><span className={styles.badgeSuccess}>In Stock</span></td>
                                        <td><button className={styles.btnLink}>Edit</button></td>
                                    </tr>
                                    <tr>
                                        <td>Designer Anarkali</td>
                                        <td>Women</td>
                                        <td>₹5,999</td>
                                        <td><span className={styles.badgeError}>Out of Stock</span></td>
                                        <td><button className={styles.btnLink}>Edit</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Other tabs would be implemented similarly */}
                    {activeTab !== 'products' && (
                        <div className={styles.placeholder}>
                            <p>Select "Products" to view the demo.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
