'use client'

import { useState } from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom max-w-6xl">
                <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
                <p className="text-center text-gray-600 mb-12">We'd love to hear from you!</p>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 space-y-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                        <MapPinIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold">Visit Us</h3>
                                </div>
                                <p className="text-gray-700">Tirupati, Andhra Pradesh</p>
                                <p className="text-gray-700">Telugu States, India</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                        <PhoneIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold">Call Us</h3>
                                </div>
                                <p className="text-gray-700">+91 XXX XXX XXXX</p>
                                <a
                                    href="https://wa.me/91XXXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:underline inline-flex items-center gap-2 mt-2"
                                >
                                    💬 WhatsApp Chat
                                </a>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                        <EnvelopeIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold">Email Us</h3>
                                </div>
                                <p className="text-gray-700">info@dharsangroups.com</p>
                                <p className="text-gray-700">support@dharsangroups.com</p>
                            </div>

                            <div className="pt-6 border-t">
                                <h3 className="font-bold mb-3">Business Hours</h3>
                                <p className="text-sm text-gray-700">Monday - Saturday: 9 AM - 8 PM</p>
                                <p className="text-sm text-gray-700">Sunday: 10 AM - 6 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="card p-8">
                            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                            {submitted && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    Thank you! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Email *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Mobile</label>
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Subject *</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="select"
                                            required
                                        >
                                            <option value="">Select Subject</option>
                                            <option value="product">Product Inquiry</option>
                                            <option value="order">Order Status</option>
                                            <option value="tailoring">Tailoring Services</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Message *</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="textarea"
                                        rows={5}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12 card p-6">
                    <h2 className="text-2xl font-bold mb-6">Find Us</h2>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Google Maps - Dharsan Groups, Tirupati</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
