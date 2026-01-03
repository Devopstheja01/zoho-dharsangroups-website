'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from './ToastContext'

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    size: string
    color?: string
    quantity: number
}

export interface User {
    id: string
    email: string
    name: string
    mobile: string
}

interface CartContextType {
    cart: CartItem[]
    wishlist: CartItem[]
    user: User | null
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: string, size: string) => void
    updateQuantity: (id: string, size: string, quantity: number) => void
    clearCart: () => void
    addToWishlist: (item: Omit<CartItem, 'quantity' | 'size'>) => void
    removeFromWishlist: (id: string) => void
    isInWishlist: (id: string) => boolean
    login: (user: User) => void
    logout: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [wishlist, setWishlist] = useState<CartItem[]>([])
    const [user, setUser] = useState<User | null>(null)
    const { showToast } = useToast()

    // Load cart, wishlist and user from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart')
            const savedWishlist = localStorage.getItem('wishlist')
            const savedUser = localStorage.getItem('user')

            if (savedCart) setCart(JSON.parse(savedCart))
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
            if (savedUser) setUser(JSON.parse(savedUser))
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify(wishlist))
        }
    }, [wishlist])

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                localStorage.removeItem('user')
            }
        }
    }, [user])

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart((prevCart: CartItem[]) => {
            const existingItem = prevCart.find(
                (cartItem: CartItem) => cartItem.id === item.id && cartItem.size === item.size
            )

            if (existingItem) {
                showToast(`Updated quantity for ${item.name}`, 'success')
                return prevCart.map((cartItem: CartItem) =>
                    cartItem.id === item.id && cartItem.size === item.size
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            }

            showToast(`Added ${item.name} to cart`, 'success')
            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: string, size: string) => {
        setCart((prevCart: CartItem[]) => prevCart.filter(
            (item: CartItem) => !(item.id === id && item.size === size)
        ))
    }

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id, size)
            return
        }

        setCart((prevCart: CartItem[]) =>
            prevCart.map((item: CartItem) =>
                item.id === id && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const clearCart = () => setCart([])

    // Wishlist Logic
    const addToWishlist = (item: Omit<CartItem, 'quantity' | 'size'>) => {
        setWishlist((prev: CartItem[]) => {
            if (prev.some((i: CartItem) => i.id === item.id)) return prev;
            // Store with default props
            return [...prev, { ...item, size: 'M', quantity: 1 }];
        });
    }

    const removeFromWishlist = (id: string) => {
        setWishlist((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));
    }

    const isInWishlist = (id: string) => {
        return wishlist.some((item: CartItem) => item.id === id);
    }

    const login = (newUser: User) => setUser(newUser)

    const logout = () => setUser(null)

    const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                wishlist,
                user,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                login,
                logout,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

