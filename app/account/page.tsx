'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import { UserIcon, ShoppingBagIcon, MapPinIcon, HeartIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function AccountPage() {
    const router = useRouter()
    const { user, logout } = useCart()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Show loading state during SSR
    if (!mounted) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        router.push('/login')
        return null
    }

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">My Account</h1>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="card p-6">
                            <div className="mb-6 pb-6 border-b">
                                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserIcon className="w-10 h-10 text-accent" />
                                </div>
                                <h3 className="font-bold text-center">{user.name}</h3>
                                <p className="text-sm text-gray-600 text-center">{user.email}</p>
                            </div>

                            <nav className="space-y-2">
                                <Link href="/account" className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 text-accent font-semibold">
                                    <UserIcon className="w-5 h-5" />
                                    Profile
                                </Link>
                                <Link href="/account/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    Orders
                                </Link>
                                <Link href="/account/addresses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                                    <MapPinIcon className="w-5 h-5" />
                                    Addresses
                                </Link>
                                <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                                    <HeartIcon className="w-5 h-5" />
                                    Wishlist
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 w-full text-left"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        className="input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        className="input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Mobile</label>
                                    <input
                                        type="tel"
                                        value={user.mobile}
                                        className="input"
                                        readOnly
                                    />
                                </div>

                                <button className="btn btn-primary">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="card p-6 text-center">
                                <div className="text-3xl font-bold text-accent mb-2">0</div>
                                <div className="text-gray-600">Total Orders</div>
                            </div>
                            <div className="card p-6 text-center">
                                <div className="text-3xl font-bold text-accent mb-2">0</div>
                                <div className="text-gray-600">Wishlist Items</div>
                            </div>
                            <div className="card p-6 text-center">
                                <div className="text-3xl font-bold text-accent mb-2">₹0</div>
                                <div className="text-gray-600">Total Spent</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
