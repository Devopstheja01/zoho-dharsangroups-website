'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ScissorsIcon } from '@heroicons/react/24/outline'

export default function TailoringPage() {
    const [submitted, setSubmitted] = useState(false)
    const [visitType, setVisitType] = useState<'store' | 'home'>('store')
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        serviceType: '',
        preferredDate: '',
        measurements: {
            chest: '',
            waist: '',
            shoulder: '',
            sleeves: '',
            pantLength: '',
            pantWaist: '',
        },
        address: '',
        notes: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="card p-12 text-center max-w-md">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                        We've received your tailoring request. Our team will contact you within 24 hours.
                    </p>
                    <Link href="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ScissorsIcon className="w-8 h-8 text-accent" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Custom Tailoring Services</h1>
                    <p className="text-lg text-gray-600">
                        Get perfectly fitted clothing with our premium custom stitching services
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="card p-6 text-center">
                        <div className="text-4xl mb-3">📐</div>
                        <h3 className="font-bold mb-2">Precise Measurements</h3>
                        <p className="text-sm text-gray-600">Upload or provide exact measurements</p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-4xl mb-3">✂️</div>
                        <h3 className="font-bold mb-2">Expert Tailoring</h3>
                        <p className="text-sm text-gray-600">20+ years of tailoring experience</p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-4xl mb-3">🚚</div>
                        <h3 className="font-bold mb-2">Home Delivery</h3>
                        <p className="text-sm text-gray-600">Delivered to your doorstep</p>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="card p-8">
                    <h2 className="text-2xl font-bold mb-6">Book Tailoring Service</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Mobile Number *</label>
                                <input
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Service Type *</label>
                                <select
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                    className="select"
                                    required
                                >
                                    <option value="">Select Service</option>
                                    <option value="shirt">Shirt Stitching</option>
                                    <option value="pant">Pant Stitching</option>
                                    <option value="suit">Full Suit</option>
                                    <option value="saree-blouse">Saree Blouse</option>
                                    <option value="dress">Dress Stitching</option>
                                </select>
                            </div>
                        </div>

                        {/* Visit Type */}
                        <div>
                            <label className="block text-sm font-semibold mb-3">Visit Preference *</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="visitType"
                                        value="store"
                                        checked={visitType === 'store'}
                                        onChange={() => setVisitType('store')}
                                        className="w-5 h-5 accent-accent"
                                    />
                                    <span>Visit Our Store</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="visitType"
                                        value="home"
                                        checked={visitType === 'home'}
                                        onChange={() => setVisitType('home')}
                                        className="w-5 h-5 accent-accent"
                                    />
                                    <span>Home Visit</span>
                                </label>
                            </div>
                        </div>

                        {/* Address for Home Visit */}
                        {visitType === 'home' && (
                            <div>
                                <label className="block text-sm font-semibold mb-2">Address *</label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="textarea"
                                    rows={3}
                                    required={visitType === 'home'}
                                />
                            </div>
                        )}

                        {/* Measurements */}
                        <div>
                            <h3 className="font-semibold mb-3">Measurements (in inches)</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">Chest</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={formData.measurements.chest}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            measurements: { ...formData.measurements, chest: e.target.value }
                                        })}
                                        className="input"
                                        placeholder="36"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Waist</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={formData.measurements.waist}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            measurements: { ...formData.measurements, waist: e.target.value }
                                        })}
                                        className="input"
                                        placeholder="32"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Shoulder</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={formData.measurements.shoulder}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            measurements: { ...formData.measurements, shoulder: e.target.value }
                                        })}
                                        className="input"
                                        placeholder="16"
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-3">
                                <Link href="/size-guide" className="text-accent hover:underline">
                                    View measurement guide
                                </Link> or leave blank and we'll take measurements during visit
                            </p>
                        </div>

                        {/* Preferred Date */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Preferred Date</label>
                            <input
                                type="date"
                                value={formData.preferredDate}
                                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                className="input"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="textarea"
                                rows={3}
                                placeholder="Any specific requirements or preferences..."
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Book Appointment
                        </button>
                    </form>
                </div>

                {/* Partner Shops */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Our Partner Tailoring Shops</h2>
                    <div className="card p-6">
                        <p className="text-center text-gray-600 mb-4">
                            Find tailoring services near you across Telugu states
                        </p>
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Google Maps integration (partner locations)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
