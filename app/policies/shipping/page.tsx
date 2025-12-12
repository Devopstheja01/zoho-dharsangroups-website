export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>

                <div className="card p-8 prose max-w-none">
                    <h2>Delivery Areas</h2>
                    <p>We currently deliver to all locations within Andhra Pradesh and Telangana states.</p>

                    <h2>Shipping Charges</h2>
                    <ul>
                        <li><strong>Free Shipping</strong> on orders above ₹2,000</li>
                        <li><strong>₹100</strong> flat shipping charge for orders below ₹2,000</li>
                    </ul>

                    <h2>Delivery Timeline</h2>
                    <p>Standard delivery takes 3-7 business days depending on your location:</p>
                    <ul>
                        <li>Tirupati & nearby areas: 2-3 days</li>
                        <li>Other cities in AP/Telangana: 4-7 days</li>
                        <li>Custom tailoring orders: 10-15 days</li>
                    </ul>

                    <h2>Order Tracking</h2>
                    <p>Once your order is shipped, you will receive a tracking number via SMS and email.</p>

                    <h2>Contact</h2>
                    <p>For shipping inquiries, contact us at support@dharsangroups.com or call +91 XXX XXX XXXX</p>
                </div>
            </div>
        </div>
    )
}
