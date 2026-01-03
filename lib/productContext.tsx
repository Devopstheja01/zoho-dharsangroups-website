'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialStaticProducts } from './data';


interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    // Cache settings - Short duration (1 min) for better sync responsiveness
    const STORAGE_KEY = 'zoho_products_cache_v3';
    const CACHE_DURATION = 60 * 1000;

    useEffect(() => {
        // Initialize data
        const loadData = async () => {
            try {
                // 1. Try to fetch from Zoho Inventory via Netlify Function
                console.log('Fetching products from Zoho Inventory...');

                const response = await fetch('/.netlify/functions/zoho-products');

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.products) {
                        console.log(`Loaded ${data.products.length} products from Zoho`);

                        // 2. Get LocalStorage Data (Admin added products + Overrides)
                        let localProducts: Product[] = [];
                        if (typeof window !== 'undefined') {
                            const saved = localStorage.getItem('admin_products');
                            if (saved) {
                                try {
                                    localProducts = JSON.parse(saved);
                                } catch (e) {
                                    console.error('Failed to parse admin products', e);
                                }
                            }
                        }

                        // 3. Merge: Zoho products + local overrides
                        const localIds = new Set(localProducts.map(p => p.id));
                        const filteredZoho = data.products.filter((p: Product) => !localIds.has(p.id));

                        const merged = [...localProducts, ...filteredZoho];

                        setProducts(merged);
                        setIsLoading(false);

                        // Cache the data with timestamp
                        if (typeof window !== 'undefined') {
                            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                                products: data.products,
                                timestamp: Date.now(),
                            }));
                        }

                        return;
                    }
                }

                throw new Error('Failed to fetch from Zoho API');

            } catch (error) {
                console.warn('Zoho API unavailable:', error);

                // Fallback 1: Try cached Zoho data
                if (typeof window !== 'undefined') {
                    const cached = localStorage.getItem(STORAGE_KEY);
                    if (cached) {
                        try {
                            const { products: cachedProducts, timestamp } = JSON.parse(cached);
                            // Valid if within duration (1 min) OR offline mode fallback (24h)
                            const isFresh = Date.now() - timestamp < CACHE_DURATION;
                            const isOfflineBackup = Date.now() - timestamp < 24 * 60 * 60 * 1000;

                            if (isOfflineBackup) {
                                console.log(isFresh ? 'Using fresh cache' : 'Using offline backup cache');
                                setProducts(cachedProducts);
                                setIsLoading(false);
                                return;
                            }
                        } catch (e) {
                            console.error('Failed to parse cached data', e);
                        }
                    }
                }

                // Final State: No Products (Strict Mode)
                console.error('No valid Zoho data found. Website will show empty catalog.');
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const addProduct = (product: Product) => {
        setProducts(prev => {
            const newProducts = [product, ...prev];

            // Persist ONLY the admin added products
            // We filter out the base ones to avoid duplicating 150+ items in localStorage
            if (typeof window !== 'undefined') {
                const currentAdminProducts = localStorage.getItem('admin_products');
                let existingAdmin = currentAdminProducts ? JSON.parse(currentAdminProducts) : [];
                localStorage.setItem('admin_products', JSON.stringify([product, ...existingAdmin]));
            }

            return newProducts;
        });
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => {
            const index = prev.findIndex(p => p.id === id);
            if (index === -1) return prev; // Product not found

            const originalProduct = prev[index];
            const updatedProduct = { ...originalProduct, ...updates };

            const newProducts = [...prev];
            newProducts[index] = updatedProduct;

            // Persistence: Always save edits to localStorage
            // If it was a mock product, it effectively becomes an "admin" product now
            if (typeof window !== 'undefined') {
                try {
                    const currentAdminProducts = localStorage.getItem('admin_products');
                    let adminProducts: Product[] = currentAdminProducts ? JSON.parse(currentAdminProducts) : [];

                    const adminIndex = adminProducts.findIndex(p => p.id === id);
                    if (adminIndex >= 0) {
                        // Update existing admin product
                        adminProducts[adminIndex] = updatedProduct;
                    } else {
                        // "Fork" mock product -> admin product
                        adminProducts = [updatedProduct, ...adminProducts];
                    }

                    localStorage.setItem('admin_products', JSON.stringify(adminProducts));
                } catch (e) {
                    console.error('Failed to update admin products persistence', e);
                }
            }
            return newProducts;
        });
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, isLoading }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
