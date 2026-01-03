'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ScissorsIcon, MapPinIcon } from '@heroicons/react/24/outline'

// Mock Partner Shops
const PARTNER_SHOPS = [
    { id: 1, name: 'Lakshmi Tailors', area: 'Tirupati Central', lat: 13.6288, lng: 79.4192, rating: 4.8 },
    { id: 2, name: 'Venkateswara Stitching', area: 'Renigunta Road', lat: 13.6420, lng: 79.4440, rating: 4.5 },
    { id: 3, name: 'Modern Fits', area: 'Alipiri', lat: 13.6550, lng: 79.4000, rating: 4.6 },
    { id: 4, name: 'Royal Cuts', area: 'Chandragiri', lat: 13.5900, lng: 79.3100, rating: 4.7 }
];

export default function TailoringPage() {
    const [submitted, setSubmitted] = useState(false)
    const [visitType, setVisitType] = useState<'store' | 'home'>('store')

    // Geolocation State
    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [nearbyShops, setNearbyShops] = useState<any[]>([]);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

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

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    const handleGetLocation = (forAddress = false) => {
        setLocationStatus('loading');
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            setLocationStatus('error');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                // 1. Sort shops by distance
                const sortedShops = PARTNER_SHOPS.map(shop => ({
                    ...shop,
                    distance: calculateDistance(latitude, longitude, shop.lat, shop.lng)
                })).sort((a, b) => a.distance - b.distance);

                setNearbyShops(sortedShops);
                setLocationStatus('success');

                // 2. Auto-fill address if requested or if address is empty
                if (forAddress || (visitType === 'home' && !formData.address)) {
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        if (data && data.display_name) {
                            setFormData(prev => ({ ...prev, address: data.display_name }));
                        }
                    } catch (error) {
                        console.error('Failed to reverse geocode:', error);
                    }
                }
            },
            (error) => {
                console.error(error);
                let msg = 'Unable to retrieve your location';
                if (error.code === 1) msg = 'Location permission denied. Please enable it in browser settings.';
                alert(msg);
                setLocationStatus('error');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleSimulateLocation = () => {
        setLocationStatus('loading');
        // Simulate waiting
        setTimeout(() => {
            // Tirupati Coordinates
            const lat = 13.6288;
            const lng = 79.4192;
            setUserLocation({ lat, lng });

            const sortedShops = PARTNER_SHOPS.map(shop => ({
                ...shop,
                distance: calculateDistance(lat, lng, shop.lat, shop.lng)
            })).sort((a, b) => a.distance - b.distance);

            setNearbyShops(sortedShops);
            setLocationStatus('success');

            // Demo address fill
            if (visitType === 'home') {
                setFormData(prev => ({ ...prev, address: 'Gandhi Road, Tirupati (Simulated Location)' }));
            }
        }, 800);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md w-full">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                        We've received your tailoring request. Our team will contact you within 24 hours.
                    </p>
                    <Link href="/" className="btn btn-primary w-full block">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ScissorsIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Custom Tailoring Services</h1>
                    <p className="text-lg text-gray-600">
                        Get perfectly fitted clothing with our premium custom stitching services
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-3">📐</div>
                        <h3 className="font-bold mb-2">Precise Measurements</h3>
                        <p className="text-sm text-gray-600">Upload or provide exact measurements</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-3">✂️</div>
                        <h3 className="font-bold mb-2">Expert Tailoring</h3>
                        <p className="text-sm text-gray-600">20+ years of tailoring experience</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-3">🚚</div>
                        <h3 className="font-bold mb-2">Home Delivery</h3>
                        <p className="text-sm text-gray-600">Delivered to your doorstep</p>
                    </div>
                </div>

                {/* Geolocation Section */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-12 border border-blue-100">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Find Nearby Partners</h2>
                            <p className="text-gray-600">Locate our trusted tailoring partners near you.</p>
                        </div>
                        <button
                            onClick={() => handleGetLocation(false)}
                            disabled={locationStatus === 'loading'}
                            className="mt-4 md:mt-0 btn btn-outline flex items-center gap-2"
                        >
                            <MapPinIcon className="w-5 h-5" />
                            {locationStatus === 'loading' ? 'Locating...' : 'Use My Location'}
                        </button>
                    </div>
                    {/* Demo Feature */}
                    <div className="mb-6 flex justify-end">
                        <button onClick={handleSimulateLocation} className="text-xs text-blue-500 underline">
                            (Demo) Simulate location in Tirupati
                        </button>
                    </div>

                    {locationStatus === 'success' && nearbyShops.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-4 animate-fadeIn">
                            {nearbyShops.map(shop => (
                                <div key={shop.id} className="border p-4 rounded-lg hover:border-blue-500 cursor-pointer transition-colors bg-blue-50/30">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg">{shop.name}</h3>
                                            <p className="text-gray-600">{shop.area}</p>
                                            <div className="flex items-center gap-1 mt-1 text-sm text-yellow-600">
                                                <span>★</span> {shop.rating}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-mono text-lg font-bold text-blue-600">
                                                {shop.distance.toFixed(1)} km
                                            </span>
                                            <span className="text-xs text-gray-500">Away</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-3 text-sm btn btn-primary py-1">View Details</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {locationStatus === 'idle' && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                            <p className="text-gray-500">Tap "Use My Location" to see tailored recommendations.</p>
                        </div>
                    )}
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
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
                                    className="input w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Mobile Number *</label>
                                <input
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    className="input w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Service Type *</label>
                                <select
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                    className="select w-full p-2 border rounded"
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
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold">Address *</label>
                                    <button
                                        type="button"
                                        onClick={() => handleGetLocation(true)}
                                        className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
                                    >
                                        <MapPinIcon className="w-3 h-3" /> Use Current Location
                                    </button>
                                </div>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="textarea w-full p-2 border rounded"
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
                                        className="input w-full p-2 border rounded"
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
                                        className="input w-full p-2 border rounded"
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
                                        className="input w-full p-2 border rounded"
                                        placeholder="16"
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-3">
                                <Link href="/size-guide" className="text-blue-600 hover:underline">
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
                                className="input w-full p-2 border rounded"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-3 rounded-lg font-bold text-lg">
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

