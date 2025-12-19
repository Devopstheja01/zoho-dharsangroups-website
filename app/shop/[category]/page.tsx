'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import AuthModal from '@/components/AuthModal';
import Link from 'next/link';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useCart } from '@/lib/CartContext';
import { useProducts } from '@/lib/productContext';

export default function ShopCategory({ params }: { params: { category: string } }) {
    const category = params.category;

    if (category !== 'men' && category !== 'women') {
        notFound();
    }

    const { products, isLoading } = useProducts();
    const { addToCart, user, login } = useCart();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<any>(null);

    // State for filters and pagination
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Grid of 3x3

    // Get unique subcategories for the current main category
    const subCategories = useMemo(() => {
        const cats = products
            .filter(p => p.category === category)
            .map(p => p.subcategory);
        return Array.from(new Set(cats));
    }, [products, category]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            if (p.category !== category) return false;
            if (selectedCategories.length > 0 && !selectedCategories.includes(p.subcategory)) return false;
            // Handle undefined price just in case
            const pPrice = p.price || 0;
            if (pPrice < priceRange[0] || pPrice > priceRange[1]) return false;
            return true;
        });
    }, [products, category, selectedCategories, priceRange]);

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
        login({
            id: Date.now().toString(),
            email: `${mobile}@customer.com`,
            name: 'Customer',
            mobile: mobile
        });
        if (pendingProduct) {
            addToCart(pendingProduct);
            setPendingProduct(null);
            alert('Item added to cart!');
        }
    };

    // Generate page numbers for display (sliding window or simple range)
    const getPageNumbers = () => {
        // Simplified for 10+ pages: show all if under 10, else show window
        // For this request "10 next pages", we'll just show what we have.
        // If we have 150 items / 9 = ~17 pages.

        const pages = [];
        // Show max 5 page buttons + First/Last if needed, or simple scrolling
        // To strictly meet "10 pages", let's just show a range around current
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);

        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
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
                <aside className={styles.sidebarWrapper}>
                    <FilterSidebar
                        categories={subCategories}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />
                </aside>

                <div className={styles.contentWrapper}>
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            <section className={styles.productGrid}>
                                {currentProducts.map(product => (
                                    <div key={product.id} className={styles.productCard}>
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className={styles.image}
                                                onError={(e) => {
                                                    // Fallback for broken images
                                                    (e.target as HTMLImageElement).src = `https://placehold.co/400x600?text=${product.name.charAt(0)}`;
                                                }}
                                            />
                                            {!product.inStock && (
                                                <span className={styles.outOfStockBadge}>Out of Stock</span>
                                            )}
                                        </div>
                                        <div className={styles.productInfo}>
                                            <h3 className={styles.productName}>{product.name}</h3>
                                            <p className={styles.productCategory}>{product.subcategory}</p>
                                            <p className={styles.productPrice}>₹{product.price?.toLocaleString('en-IN')}</p>
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

                                    <div className="flex gap-2 mx-4">
                                        {getPageNumbers().map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setCurrentPage(p)}
                                                className={`${styles.pageBtn} ${currentPage === p ? 'bg-black text-white' : ''}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                        className={styles.pageBtn}
                                    >
                                        Next
                                    </button>
                                    <div className="text-sm text-gray-500 ml-4 self-center">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                </div>
                            )}
                        </>
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

