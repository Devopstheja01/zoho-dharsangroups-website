'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProductsByCategory, categories, filterProducts, type Product } from '@/lib/products'
import { useCart } from '@/lib/CartContext'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function WomenShopPage() {
    const { addToCart } = useCart()
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
    const [wishlist, setWishlist] = useState<Set<string>>(new Set())

    const allProducts = getProductsByCategory('women')
    const filteredProducts = filterProducts('women', {
        subcategories: selectedSubcategories.length > 0 ? selectedSubcategories : undefined,
        priceRange,
        inStockOnly: true
    })

    const toggleSubcategory = (sub: string) => {
        setSelectedSubcategories(prev =>
            prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
        )
    }

    const toggleWishlist = (id: string) => {
        setWishlist(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    return (
        <div className="min-h-screen bg-surface">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light text-white py-12">
                <div className="container-custom">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Women's Collection</h1>
                    <p className="text-gray-300 text-lg">
                        Elegant sarees, dresses & ethnic wear with custom stitching options
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Filters</h3>

                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3 text-sm text-gray-600">CATEGORY</h4>
                                <div className="space-y-2">
                                    {categories.women.subcategories.map(sub => (
                                        <label key={sub} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSubcategories.includes(sub)}
                                                onChange={() => toggleSubcategory(sub)}
                                                className="rounded text-accent focus:ring-accent"
                                            />
                                            <span className="text-sm">{sub}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="font-semibold mb-3 text-sm text-gray-600">PRICE RANGE</h4>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="15000"
                                        step="500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-accent"
                                    />
                                    <div className="flex justify-between text-sm">
                                        <span>₹0</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Showing {filteredProducts.length} of {allProducts.length} products
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    inWishlist={wishlist.has(product.id)}
                                    onToggleWishlist={() => toggleWishlist(product.id)}
                                    onAddToCart={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.images[0],
                                        size: 'Standard'
                                    })}
                                />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No products found matching your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductCard({ product, inWishlist, onToggleWishlist, onAddToCart }: {
    product: Product
    inWishlist: boolean
    onToggleWishlist: () => void
    onAddToCart: () => void
}) {
    return (
        <div className="card card-hover group">
            <Link href={`/product/${product.id}`}>
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                    {product.originalPrice && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="badge badge-accent">
                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                            </span>
                        </div>
                    )}
                    {product.customStitchingAvailable && (
                        <div className="absolute top-3 right-3 z-10">
                            <span className="badge bg-primary/90 text-white text-xs">
                                Custom Stitch
                            </span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
                </div>
            </Link>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>
                    <button onClick={onToggleWishlist} className="p-1">
                        {inWishlist ? (
                            <HeartIconSolid className="w-5 h-5 text-red-500" />
                        ) : (
                            <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                        )}
                    </button>
                </div>

                <p className="text-sm text-gray-500 mb-2">{product.subcategory}</p>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                </div>

                <button
                    onClick={onAddToCart}
                    className="btn btn-secondary w-full text-sm"
                >
                    <ShoppingCartIcon className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
