'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'

export default function LoginPage() {
    const router = useRouter()
    const { login } = useCart()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Mock login
        login({
            id: '1',
            email: formData.email,
            name: formData.name || 'User',
            mobile: formData.mobile,
        })

        router.push('/account')
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center py-12">
            <div className="card p-8 max-w-md w-full mx-4">
                <h1 className="text-3xl font-bold text-center mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    {isLogin ? 'Login to your account' : 'Register for exclusive offers'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input"
                                placeholder="John Doe"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            className="input"
                            placeholder="+91 XXXXX XXXXX"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className="text-right">
                            <Link href="/forgot-password" className="text-sm text-accent hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-full">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-gray-600"
                    >
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <span className="text-accent font-semibold hover:underline">
                            {isLogin ? 'Register' : 'Login'}
                        </span>
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t text-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-accent">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
