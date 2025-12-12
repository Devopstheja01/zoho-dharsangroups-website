'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCartIcon, UserIcon, HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/CartContext'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { cart, user } = useCart()

    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="sticky top-0 z-50 bg-primary text-white shadow-lg">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Dharsan Groups"
                            width={50}
                            height={50}
                            className="rounded-lg"
                        />
                        <span className="text-2xl font-bold font-serif text-accent">
                            Dharsan<span className="text-white">Groups</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/shop/men" className="hover:text-accent transition-colors font-semibold">
                            Men
                        </Link>
                        <Link href="/shop/women" className="hover:text-accent transition-colors font-semibold">
                            Women
                        </Link>
                        <Link href="/tailoring" className="hover:text-accent transition-colors font-semibold">
                            Tailoring
                        </Link>
                        <Link href="/about" className="hover:text-accent transition-colors font-semibold">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-accent transition-colors font-semibold">
                            Contact
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/wishlist" className="p-2 hover:text-accent transition-colors">
                            <HeartIcon className="w-6 h-6" />
                        </Link>
                        <Link href="/cart" className="p-2 hover:text-accent transition-colors relative">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <Link href="/account" className="p-2 hover:text-accent transition-colors">
                                <UserIcon className="w-6 h-6" />
                            </Link>
                        ) : (
                            <Link href="/login" className="btn btn-primary text-sm">
                                Login
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-primary-light">
                        <div className="flex flex-col gap-4">
                            <Link href="/shop/men" className="hover:text-accent transition-colors">
                                Men's Collection
                            </Link>
                            <Link href="/shop/women" className="hover:text-accent transition-colors">
                                Women's Collection
                            </Link>
                            <Link href="/tailoring" className="hover:text-accent transition-colors">
                                Custom Tailoring
                            </Link>
                            <Link href="/about" className="hover:text-accent transition-colors">
                                About Us
                            </Link>
                            <Link href="/contact" className="hover:text-accent transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
