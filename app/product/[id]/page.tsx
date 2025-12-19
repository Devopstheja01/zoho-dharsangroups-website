'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import { useProducts } from '@/lib/productContext'
import { ShoppingCartIcon, HeartIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { Product } from '@/lib/data'

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { addToCart } = useCart()
    const { products, isLoading: isProductsLoading } = useProducts()

    const [product, setProduct] = useState<Product | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    const [selectedSize, setSelectedSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    // Determine if we are still waiting for global products or local lookup
    useEffect(() => {
        if (!isProductsLoading) {
            const found = products.find(p => p.id === params.id)
            setProduct(found)
            setLoading(false)
        }
    }, [products, isProductsLoading, params.id])


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

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

    // Default sizes/colors if not present (handling compatibility with different data shapes)
    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL']
    const colors = product.colors && product.colors.length > 0 ? product.colors : []

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size')
            return
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            // color: selectedColor || undefined, // Simplified for now
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
                            <img
                                src={product.images?.[activeImage] || product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/600x800?text=${product.name.charAt(0)}`;
                                }}
                            />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-accent' : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            {!product.inStock && (
                                <span className="badge bg-red-500 text-white mb-2">Out of Stock</span>
                            )}
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <p className="text-gray-600 mb-4">{product.subcategory}</p>

                            {/* Price */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-6">{product.description || "No description available for this product."}</p>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <label className="font-semibold">Select Size:</label>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map(size => (
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
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className={`btn btn-primary flex-1 ${!product.inStock && 'opacity-50 cursor-not-allowed'}`}
                            >
                                <ShoppingCartIcon className="w-5 h-5" />
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
            </div>
        </div>
    )
}
