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

            // 2. Get LocalStorage Data (Admin added products)
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

            // 3. Merge
            // We prepend localProducts so they appear first
            setProducts([...localProducts, ...allBaseProducts]);
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
