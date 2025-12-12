'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/lib/data';
import styles from './page.module.css';
import Link from 'next/link';

export default function SearchPage() {
    const [query, setQuery] = useState('');

    const filteredProducts = query
        ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        : [];

    return (
        <main className={styles.main}>
            <Navbar />

            <div className="container section">
                <div className={styles.searchContainer}>
                    <h1 className={styles.title}>Search Products</h1>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search for shirts, sarees, etc..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className={styles.results}>
                    {query && filteredProducts.length === 0 && (
                        <p className={styles.noResults}>No products found matching "{query}"</p>
                    )}

                    <div className={styles.grid}>
                        {filteredProducts.map(product => (
                            <Link href={`/shop/${product.category}`} key={product.id} className={styles.card}>
                                <div className={styles.imageContainer}>
                                    <img src={product.image} alt={product.name} className={styles.image} />
                                </div>
                                <div className={styles.info}>
                                    <h3>{product.name}</h3>
                                    <p>₹{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
