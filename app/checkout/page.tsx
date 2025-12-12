'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function CheckoutPage() {
    const router = useRouter()
    const { cart, total, clearCart, user } = useCart()
    const [step, setStep] = useState(1)
    const [orderPlaced, setOrderPlaced] = useState(false)

    const [shippingInfo, setShippingInfo] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    })

    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('cod')

    const shippingCharge = total > 2000 ? 0 : 100
    const finalTotal = total + shippingCharge

    const handlePlaceOrder = () => {
        // Mock order placement
        setOrderPlaced(true)
        setTimeout(() => {
            clearCart()
            router.push('/account/orders')
        }, 3000)
    }

    if (cart.length === 0 && !orderPlaced) {
        router.push('/cart')
        return null
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="card p-12 text-center max-w-md">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-6">
                        Your order has been confirmed. You will receive an email confirmation shortly.
                    </p>
                    <p className="text-sm text-gray-500">
                        Redirecting to orders page...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom max-w-6xl">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4">
                        <StepIndicator number={1} active={step >= 1} label="Shipping" />
                        <div className={`h-1 w-20 ${step >= 2 ? 'bg-accent' : 'bg-gray-300'}`}></div>
                        <StepIndicator number={2} active={step >= 2} label="Payment" />
                        <div className={`h-1 w-20 ${step >= 3 ? 'bg-accent' : 'bg-gray-300'}`}></div>
                        <StepIndicator number={3} active={step >= 3} label="Review" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <div className="card p-6">
                                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={shippingInfo.name}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                        className="input"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={shippingInfo.email}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                        className="input"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        value={shippingInfo.mobile}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, mobile: e.target.value })}
                                        className="input"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Pincode"
                                        value={shippingInfo.pincode}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                                        className="input"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={shippingInfo.address}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                        className="input md:col-span-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={shippingInfo.city}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                        className="input"
                                        required
                                    />
                                    <select
                                        value={shippingInfo.state}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                        className="select"
                                        required
                                    >
                                        <option value="">Select State</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Telangana">Telangana</option>
                                    </select>
                                </div>
                                <button onClick={() => setStep(2)} className="btn btn-primary mt-6">
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="card p-6">
                                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-accent">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            className="w-5 h-5 accent-accent"
                                        />
                                        <div>
                                            <p className="font-semibold">Cash on Delivery</p>
                                            <p className="text-sm text-gray-600">Pay when you receive</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-accent">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={() => setPaymentMethod('upi')}
                                            className="w-5 h-5 accent-accent"
                                        />
                                        <div>
                                            <p className="font-semibold">UPI Payment</p>
                                            <p className="text-sm text-gray-600">GPay, PhonePe, Paytm</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-accent">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="w-5 h-5 accent-accent"
                                        />
                                        <div>
                                            <p className="font-semibold">Credit/Debit Card</p>
                                            <p className="text-sm text-gray-600">Visa, Mastercard, Rupay</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button onClick={() => setStep(1)} className="btn btn-outline">
                                        Back
                                    </button>
                                    <button onClick={() => setStep(3)} className="btn btn-primary flex-1">
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="card p-6">
                                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

                                {/* Shipping Info */}
                                <div className="mb-6 pb-6 border-b">
                                    <h3 className="font-semibold mb-3">Shipping Address</h3>
                                    <p className="text-gray-700">{shippingInfo.name}</p>
                                    <p className="text-gray-700">{shippingInfo.address}</p>
                                    <p className="text-gray-700">{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                                    <p className="text-gray-700">{shippingInfo.mobile}</p>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-6 pb-6 border-b">
                                    <h3 className="font-semibold mb-3">Payment Method</h3>
                                    <p className="text-gray-700 capitalize">{paymentMethod.replace('_', ' ')}</p>
                                </div>

                                {/* Items */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Order Items</h3>
                                    {cart.map(item => (
                                        <div key={`${item.id}-${item.size}`} className="flex justify-between py-2">
                                            <span>{item.name} (Size: {item.size}) x {item.quantity}</span>
                                            <span className="font-semibold">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(2)} className="btn btn-outline">
                                        Back
                                    </button>
                                    <button onClick={handlePlaceOrder} className="btn btn-primary flex-1">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                                    <span className="font-semibold">₹{total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                                    </span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-accent">₹{finalTotal}</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p className="mb-2">✓ Secure checkout</p>
                                <p className="mb-2">✓ 2-day return policy</p>
                                <p>✓ Free shipping above ₹2000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StepIndicator({ number, active, label }: { number: number; active: boolean; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${active ? 'bg-accent text-primary' : 'bg-gray-300 text-gray-600'
                    }`}
            >
                {number}
            </div>
            <span className="text-sm font-semibold">{label}</span>
        </div>
    )
}
