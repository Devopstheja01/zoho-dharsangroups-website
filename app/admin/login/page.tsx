'use client'

import { useState } from 'next/router'
import Link from 'next/link'

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock admin login - in production, verify credentials
        if (credentials.username && credentials.password) {
            localStorage.setItem('admin', JSON.stringify({ id: '1', username: credentials.username }))
            window.location.href = '/admin/dashboard'
        }
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center">
            <div className="card p-8 max-w-md w-full mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
                    <p className="text-gray-600">Login to manage Dharsan Groups</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className="input"
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Login to Admin Panel
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-accent">
                        ← Back to Website
                    </Link>
                </div>
            </div>
        </div>
    )
}
