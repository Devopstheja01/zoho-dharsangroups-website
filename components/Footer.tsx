import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="container-custom py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-accent font-serif text-xl font-bold mb-4">Dharsan Groups</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Premium tailoring and fashion brand serving Tirupati and Telugu states with luxury clothing and custom stitching services.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/shop/men" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                Men's Collection
                            </Link>
                            <Link href="/shop/women" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                Women's Collection
                            </Link>
                            <Link href="/tailoring" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                Custom Tailoring
                            </Link>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-bold mb-4">Customer Service</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                Contact Us
                            </Link>
                            <Link href="/policies/shipping" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                Shipping Policy
                            </Link>
                            <Link href="/policies/returns" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                Returns & Refunds
                            </Link>
                            <Link href="/faq" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                FAQ
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <div className="flex flex-col gap-2 text-sm text-gray-300">
                            <p>📍 Tirupati, Telugu States</p>
                            <p>📞 +91 XXX XXX XXXX</p>
                            <p>✉️ info@dharsangroups.com</p>
                            <a
                                href="https://wa.me/91XXXXXXXXXX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-2 mt-2"
                            >
                                <span>💬 WhatsApp Us</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Dharsan Groups. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/policies/privacy" className="text-gray-400 hover:text-accent transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/policies/terms" className="text-gray-400 hover:text-accent transition-colors text-sm">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
