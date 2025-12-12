export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="bg-primary text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-5xl font-bold mb-6 font-serif">About Dharsan Groups</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Premium tailoring and fashion excellence serving Tirupati and Telugu states since decades
                    </p>
                </div>
            </div>

            {/* Story */}
            <div className="py-20 bg-surface">
                <div className="container-custom max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 mb-4">
                            Dharsan Groups began as a small tailoring shop in Tirupati with a vision to provide premium quality clothing and custom stitching services to the community. Over the years, we have grown into a trusted name in fashion, serving thousands of satisfied customers.
                        </p>
                        <p className="text-gray-700 mb-4">
                            We specialize in both traditional and modern clothing, offering everything from elegant silk sarees to contemporary western wear. Our custom tailoring services ensure that every garment fits perfectly and reflects your personal style.
                        </p>
                        <p className="text-gray-700">
                            Today, we proudly serve customers across Telugu states, partnering with skilled tailors to bring premium fashion and tailoring services closer to you.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="py-20">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⭐</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality First</h3>
                            <p className="text-gray-600">Premium fabrics and expert craftsmanship in every piece</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customer Trust</h3>
                            <p className="text-gray-600">Building lasting relationships through reliable service</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Innovation</h3>
                            <p className="text-gray-600">Blending traditional craftsmanship with modern designs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
