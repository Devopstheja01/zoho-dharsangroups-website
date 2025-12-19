'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialStaticProducts } from './data';
import { generateMockProducts } from './mockDataGenerator';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize data
        const loadData = () => {
            // 1. Get Static + Mock Data
            const mockData = generateMockProducts();
            const allBaseProducts = [...initialStaticProducts, ...mockData];

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

            // 3. Merge: Filter out base products that have been overridden by localProducts
            // This prevents duplicate keys and ensures the "edited" version is the one shown
            const localIds = new Set(localProducts.map(p => p.id));
            const filteredBase = allBaseProducts.filter(p => !localIds.has(p.id));

            let merged = [...localProducts, ...filteredBase];

            // 4. Backfill Missing SKUs
            let hasUpdates = false;
            const generateSKU = (p: Product) => {
                const cat = (p.category || 'GEN').substring(0, 1).toUpperCase();
                const sub = (p.subcategory || 'GEN').substring(0, 3).toUpperCase();
                const nam = p.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
                const rnd = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                return `${cat}-${sub}-${nam}-${rnd}`;
            };

            merged = merged.map(p => {
                if (!p.sku) {
                    hasUpdates = true;
                    return { ...p, sku: generateSKU(p) };
                }
                return p;
            });

            if (hasUpdates && typeof window !== 'undefined') {
                // We only persist the "admin" products (localProducts) + any base products that we modified
                // Ideally we should just modify the session data, but to persist across reloads we need to save to localStorage
                // For simplicity, we'll just save the ones that were missing SKUs into localStorage if they aren't there
                const updatesToSave = merged.filter(p => localIds.has(p.id) || !p.sku); // Actually just save all is safer for prototype
                // Let's just save the overrides like updateProduct
                try {
                    // Find products that got a new SKU and weren't in admin_products before
                    const newAdminProducts = merged.filter(p => hasUpdates && !localIds.has(p.id) && allBaseProducts.find(bp => bp.id === p.id));
                    const finalAdminList = [...localProducts, ...newAdminProducts];
                    localStorage.setItem('admin_products', JSON.stringify(finalAdminList));
                } catch (e) {
                    console.error(e);
                }
            }

            setProducts(merged);
            setIsLoading(false);
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
