'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, total } = useCart()

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-6">Add some items to get started!</p>
                    <Link href="/shop/men" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        )
    }

    const shippingCharge = total > 2000 ? 0 : 100
    const finalTotal = total + shippingCharge

    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="card p-6">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-4 py-6 border-b last:border-b-0">
                                    {/* Product Image */}
                                    <div className="w-24 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                                        <p className="text-lg font-bold text-primary">₹{item.price}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex flex-col items-end justify-between">
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-accent"
                                            >
                                                <MinusIcon className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-accent"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₹{total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {shippingCharge === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            `₹${shippingCharge}`
                                        )}
                                    </span>
                                </div>
                                {total < 2000 && (
                                    <p className="text-xs text-gray-500">
                                        Add ₹{2000 - total} more for free shipping
                                    </p>
                                )}
                                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-accent">₹{finalTotal}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="btn btn-primary w-full mb-3">
                                Proceed to Checkout
                            </Link>
                            <Link href="/shop/men" className="btn btn-outline w-full">
                                Continue Shopping
                            </Link>

                            <div className="mt-6 pt-6 border-t">
                                <h3 className="font-semibold mb-3 text-sm">We Accept</h3>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="badge badge-primary">UPI</span>
                                    <span className="badge badge-primary">Cards</span>
                                    <span className="badge badge-primary">COD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
