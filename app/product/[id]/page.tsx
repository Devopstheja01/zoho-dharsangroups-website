'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProductById } from '@/lib/products'
import { useCart } from '@/lib/CartContext'
import { ShoppingCartIcon, HeartIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { addToCart } = useCart()
    const product = getProductById(params.id as string)

    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <Link href="/shop/men" className="btn btn-primary">
                        Back to Shop
                    </Link>
                </div>
            </div>
        )
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size')
            return
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor || undefined,
        })

        alert('Added to cart!')
    }

    return (
        <div className="min-h-screen bg-surface py-8">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-accent">Home</Link>
                    <span>/</span>
                    <Link href={`/shop/${product.category}`} className="hover:text-accent">
                        {product.category === 'men' ? "Men's" : "Women's"} Collection
                    </Link>
                    <span>/</span>
                    <span className="text-primary font-semibold">{product.name}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden mb-4">
                            <div className="w-full h-full relative"></div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-accent' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <div className="w-full h-full"></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            {product.customStitchingAvailable && (
                                <span className="badge badge-accent mb-2">Custom Stitching Available</span>
                            )}
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <p className="text-gray-600 mb-4">{product.subcategory}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-accent' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.rating} ({product.reviewCount} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                                        <span className="badge badge-accent">
                                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <label className="font-semibold">Select Size:</label>
                                <Link href="#size-chart" className="text-sm text-accent hover:underline">
                                    Size Guide
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${selectedSize === size
                                                ? 'border-accent bg-accent text-primary'
                                                : 'border-gray-300 hover:border-accent'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        {product.colors && (
                            <div className="mb-6">
                                <label className="font-semibold mb-3 block">Select Color:</label>
                                <div className="flex gap-2">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${selectedColor === color
                                                    ? 'border-accent bg-accent text-primary'
                                                    : 'border-gray-300 hover:border-accent'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="font-semibold mb-3 block">Quantity:</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-accent"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-accent"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button onClick={handleAddToCart} className="btn btn-primary flex-1">
                                <ShoppingCartIcon className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="btn btn-outline">
                                <HeartIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-6 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <TruckIcon className="w-5 h-5 text-accent" />
                                <span>Free shipping on orders above ₹2000</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <ShieldCheckIcon className="w-5 h-5 text-accent" />
                                <span>2-day return policy on damaged items</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-16">
                    <div className="border-b mb-6">
                        <div className="flex gap-8">
                            <button className="pb-4 border-b-2 border-accent font-semibold">
                                Description
                            </button>
                            <button className="pb-4 border-b-2 border-transparent hover:border-gray-300">
                                Reviews ({product.reviewCount})
                            </button>
                        </div>
                    </div>
                    <div className="prose max-w-none">
                        <p>{product.description}</p>
                        <h3 className="mt-6">Product Details</h3>
                        <ul>
                            <li>Category: {product.subcategory}</li>
                            <li>Available Sizes: {product.sizes.join(', ')}</li>
                            {product.colors && <li>Available Colors: {product.colors.join(', ')}</li>}
                            <li>Stock: {product.stockCount} units available</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
