'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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
    user: User | null
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: string, size: string) => void
    updateQuantity: (id: string, size: string, quantity: number) => void
    clearCart: () => void
    login: (user: User) => void
    logout: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [user, setUser] = useState<User | null>(null)

    // Load cart and user from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        const savedUser = localStorage.getItem('user')
        if (savedCart) setCart(JSON.parse(savedCart))
        if (savedUser) setUser(JSON.parse(savedUser))
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(
                cartItem => cartItem.id === item.id && cartItem.size === item.size
            )

            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id && cartItem.size === item.size
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            }

            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: string, size: string) => {
        setCart(prevCart => prevCart.filter(
            item => !(item.id === id && item.size === size)
        ))
    }

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id, size)
            return
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const clearCart = () => setCart([])

    const login = (newUser: User) => setUser(newUser)

    const logout = () => setUser(null)

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                user,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
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
