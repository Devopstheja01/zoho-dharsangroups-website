import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline'
import InView from '@/components/InView'

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary min-h-[600px] flex items-center">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
                <div className="container-custom relative z-10 py-20">
                    <InView>
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                Premium Tailoring &
                                <span className="text-accent block">Fashion Excellence</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-8">
                                Discover luxury clothing and custom stitching services in Tirupati.
                                From traditional sarees to modern formals.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/shop/men" className="btn btn-primary text-lg">
                                    Shop Men's Collection
                                </Link>
                                <Link href="/shop/women" className="btn bg-white text-primary hover:bg-gray-100 text-lg">
                                    Shop Women's Collection
                                </Link>
                            </div>
                        </div>
                    </InView>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-surface">
                <div className="container-custom">
                    <InView delay={100}>
                        <h2 className="text-4xl font-bold text-center mb-12">Shop By Category</h2>
                    </InView>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <InView delay={200}>
                            <CategoryCard
                                title="Men's Collection"
                                description="Premium shirts, pants, formals & wedding suits"
                                image="/categories/men.jpg"
                                href="/shop/men"
                            />
                        </InView>
                        <InView delay={300}>
                            <CategoryCard
                                title="Women's Collection"
                                description="Elegant sarees, dresses & ethnic wear"
                                image="/categories/women.jpg"
                                href="/shop/women"
                            />
                        </InView>
                        <InView delay={400}>
                            <CategoryCard
                                title="Custom Tailoring"
                                description="Perfect fit with custom measurements"
                                image="/categories/tailoring.jpg"
                                href="/tailoring"
                            />
                        </InView>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid md:grid-cols-4 gap-8">
                        <FeatureCard
                            icon="✓"
                            title="Custom Stitching"
                            description="Upload measurements for perfect fit"
                        />
                        <FeatureCard
                            icon="★"
                            title="Premium Quality"
                            description="Budget to luxury ranges"
                        />
                        <FeatureCard
                            icon="↻"
                            title="Easy Returns"
                            description="2-day return on damaged items"
                        />
                        <FeatureCard
                            icon="📍"
                            title="Partner Shops"
                            description="Tailoring agents across Telugu states"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-white py-16">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Need Custom Tailoring?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Upload your measurements and get perfectly fitted clothing delivered to your door
                    </p>
                    <Link href="/tailoring" className="btn btn-primary text-lg">
                        Book Tailoring Service
                    </Link>
                </div>
            </section>
        </>
    )
}

function CategoryCard({ title, description, image, href }: {
    title: string
    description: string
    image: string
    href: string
}) {
    return (
        <Link href={href} className="card card-hover group block relative h-[400px] overflow-hidden rounded-xl">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-3xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-200 text-lg opacity-90">{description}</p>
                <span className="inline-block mt-4 text-white font-semibold underline decoration-accent underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Explore Collection →
                </span>
            </div>
        </Link>
    )
}

function FeatureCard({ icon, title, description }: {
    icon: string
    title: string
    description: string
}) {
    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                {icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    )
}
