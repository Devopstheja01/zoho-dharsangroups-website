import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/CartContext'
import { ProductProvider } from '@/lib/productContext'

export const metadata: Metadata = {
    title: 'Dharsan Groups - Premium Tailoring & Fashion | Tirupati',
    description: 'Luxury clothing, custom tailoring, and premium fashion for men and women in Tirupati. Shop readymade shirts, sarees, formals, and custom stitching services.',
    keywords: 'tailoring, fashion, clothing, tirupati, custom stitching, sarees, formal wear',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ProductProvider>
                    <CartProvider>
                        <Navbar />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </ProductProvider>
            </body>
        </html>
    )
}

