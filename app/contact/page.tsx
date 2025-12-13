'use client'

import { useState } from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { storeInfo } from '@/lib/data'

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
                                    <h3 className="font-bold">Visit Our Store</h3>
                                </div>
                                <p className="text-gray-700 font-semibold">{storeInfo.name}</p>
                                <p className="text-gray-700">{storeInfo.address}</p>
                                <p className="text-gray-700">{storeInfo.city}, {storeInfo.state}</p>
                                <p className="text-gray-700">PIN: {storeInfo.pincode}</p>
                                <a
                                    href={storeInfo.googleMapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:underline inline-flex items-center gap-2 mt-2"
                                >
                                    📍 Get Directions
                                </a>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                        <PhoneIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold">Call Us</h3>
                                </div>
                                {storeInfo.phone.map((phone, index) => (
                                    <p key={index} className="text-gray-700">
                                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-accent">
                                            {phone}
                                        </a>
                                    </p>
                                ))}
                                <a
                                    href={`https://wa.me/${storeInfo.phone[1].replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:underline inline-flex items-center gap-2 mt-2"
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
                                <p className="text-gray-700">
                                    <a href={`mailto:${storeInfo.email}`} className="hover:text-accent">
                                        {storeInfo.email}
                                    </a>
                                </p>
                            </div>

                            <div className="pt-6 border-t">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                        <ClockIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold">Business Hours</h3>
                                </div>
                                <p className="text-sm text-gray-700">Mon - Sat: {storeInfo.hours.weekdays}</p>
                                <p className="text-sm text-gray-700">Sunday: {storeInfo.hours.weekends}</p>
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
                    <h2 className="text-2xl font-bold mb-6">Find Us - {storeInfo.name}</h2>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.3!2d79.4192!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b6eb2cf4ab7%3A0x8b47c6c9c7b12345!2sYadava%20Street%2C%20Varadaraja%20Nagar%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501!5e0!3m2!1sen!2sin!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Dharsan Dresses Location"
                        />
                    </div>
                    <div className="mt-4 p-4 bg-accent/5 rounded-lg">
                        <p className="text-gray-700">
                            <strong>Address:</strong> {storeInfo.address}, {storeInfo.city}, {storeInfo.state} - {storeInfo.pincode}
                        </p>
                        <p className="text-gray-700 mt-2">
                            <strong>Landmark:</strong> Near R S Junction, Yadava Street
                        </p>
                        <a
                            href={storeInfo.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-4 inline-block"
                        >
                            📍 Open in Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
