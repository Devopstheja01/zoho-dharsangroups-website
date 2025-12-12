'use client';

import { products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import AuthModal from '@/components/AuthModal';
import Link from 'next/link';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useCart } from '@/lib/CartContext';

export default function ShopCategory({ params }: { params: { category: string } }) {
    const category = params.category;

    if (category !== 'men' && category !== 'women') {
        notFound();
    }

    const { addToCart, user, login } = useCart();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<any>(null);

    // State for filters and pagination
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Get unique subcategories for the current main category
    const subCategories = useMemo(() => {
        const cats = products
            .filter(p => p.category === category)
            .map(p => p.subcategory);
        return Array.from(new Set(cats));
    }, [category]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            if (p.category !== category) return false;
            if (selectedCategories.length > 0 && !selectedCategories.includes(p.subcategory)) return false;
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            return true;
        });
    }, [category, selectedCategories, priceRange]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
        setCurrentPage(1);
    };

    const handleAddToCart = (product: any) => {
        if (!user) {
            setPendingProduct(product);
            setIsAuthModalOpen(true);
        } else {
            addToCart(product);
            alert('Item added to cart!');
        }
    };

    const handleLogin = (mobile: string) => {
        login(mobile);
        if (pendingProduct) {
            addToCart(pendingProduct);
            setPendingProduct(null);
            alert('Item added to cart!');
        }
    };

    return (
        <main className={styles.main}>
            <Navbar />

            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>
                        {category === 'men' ? "Men's Collection" : "Women's Collection"}
                    </h1>
                    <p className={styles.subtitle}>
                        {category === 'men'
                            ? "Premium shirts, pants, and tailored suits for the modern gentleman."
                            : "Elegant sarees, dresses, and ethnic wear for every occasion."}
                    </p>
                </div>
            </header>

            <div className={`container ${styles.layout}`}>
                <div className={styles.sidebarWrapper}>
                    <FilterSidebar
                        categories={subCategories}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />
                </div>

                <div className={styles.contentWrapper}>
                    <section className={styles.productGrid}>
                        {currentProducts.map(product => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.imageContainer}>
                                    <img src={product.image} alt={product.name} className={styles.image} />
                                    {!product.inStock && (
                                        <span className={styles.outOfStockBadge}>Out of Stock</span>
                                    )}
                                </div>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productName}>{product.name}</h3>
                                    <p className={styles.productCategory}>{product.subcategory}</p>
                                    <p className={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</p>
                                    <button
                                        className={`btn ${product.inStock ? 'btn-primary' : 'btn-outline'}`}
                                        disabled={!product.inStock}
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        {product.inStock ? 'Add to Cart' : 'Notify Me'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {filteredProducts.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No products found matching your criteria.</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className={styles.pageBtn}
                            >
                                Previous
                            </button>
                            <span className={styles.pageInfo}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className={styles.pageBtn}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin}
            />

            <Footer />
        </main>
    );
}
