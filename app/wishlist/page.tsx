export default function WishlistPage() {
    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

                <div className="text-center py-20">
                    <div className="text-6xl mb-4">💝</div>
                    <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">Save items you love for later!</p>
                    <a href="/shop/men" className="btn btn-primary">
                        Start Shopping
                    </a>
                </div>
            </div>
        </div>
    )
}
