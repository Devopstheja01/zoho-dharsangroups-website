'use client';

import React from 'react';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    priceRange: [number, number];
    onPriceChange: (range: [number, number]) => void;
}

export default function FilterSidebar({
    categories,
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceChange
}: FilterSidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.section}>
                <h3 className={styles.title}>Categories</h3>
                <div className={styles.options}>
                    {categories.map(cat => (
                        <label key={cat} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => onCategoryChange(cat)}
                            />
                            <span className={styles.labelText}>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.title}>Price Range</h3>
                <div className={styles.priceInputs}>
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                        className={styles.priceInput}
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                        className={styles.priceInput}
                        placeholder="Max"
                    />
                </div>
            </div>
        </aside>
    );
}
