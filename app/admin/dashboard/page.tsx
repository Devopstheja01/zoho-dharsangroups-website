'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    ShoppingBagIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    PlusIcon,
    MapPinIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboardPage() {
    const router = useRouter()
    const [admin, setAdmin] = useState<any>(null)

    useEffect(() => {
        const adminData = localStorage.getItem('admin')
        if (!adminData) {
            router.push('/admin/login')
        } else {
            setAdmin(JSON.parse(adminData))
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('admin')
        router.push('/admin/login')
    }

    if (!admin) return null

    return (
        <div className="min-h-screen bg-surface">
            {/* Header */}
            <div className="bg-primary text-white py-6">
                <div className="container-custom flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-300">Welcome back, {admin.username}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/" className="btn bg-white text-primary hover:bg-gray-100">
                            View Website
                        </Link>
                        <button onClick={handleLogout} className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<ShoppingBagIcon className="w-8 h-8" />}
                        title="Total Orders"
                        value="0"
                        change="+0%"
                    />
                    <StatCard
                        icon={<UserGroupIcon className="w-8 h-8" />}
                        title="Total Customers"
                        value="0"
                        change="+0%"
                    />
                    <StatCard
                        icon={<CurrencyDollarIcon className="w-8 h-8" />}
                        title="Revenue"
                        value="₹0"
                        change="+0%"
                    />
                    <StatCard
                        icon={<ChartBarIcon className="w-8 h-8" />}
                        title="Products"
                        value="9"
                        change="+0%"
                    />
                </div>

                {/* Quick Actions */}
                <div className="card p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        <button className="btn btn-primary">
                            <PlusIcon className="w-5 h-5" />
                            Add Product
                        </button>
                        <button className="btn btn-secondary">
                            <ShoppingBagIcon className="w-5 h-5" />
                            View Orders
                        </button>
                        <button className="btn btn-outline">
                            <UserGroupIcon className="w-5 h-5" />
                            Manage Customers
                        </button>
                        <button className="btn btn-outline">
                            <MapPinIcon className="w-5 h-5" />
                            Partner Shops
                        </button>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                    <div className="text-center py-12 text-gray-500">
                        No orders yet
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon, title, value, change }: {
    icon: React.ReactNode
    title: string
    value: string
    change: string
}) {
    return (
        <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                    {icon}
                </div>
                <span className="text-sm text-green-600 font-semibold">{change}</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    )
}
