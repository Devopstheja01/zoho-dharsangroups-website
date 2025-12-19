'use client';

import { useCart } from '@/lib/CartContext';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, addToCart } = useCart();

    const handleMoveToCart = (item: any) => {
        addToCart(item);
        removeFromWishlist(item.id);
        alert('Moved to Cart!');
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="text-6xl mb-4">💝</div>
                        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">Save items you love for later!</p>
                        <Link href="/shop/men" className="btn btn-primary px-8 py-3 rounded-full">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                            <div className="relative aspect-[3/4]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://placehold.co/400x600?text=${item.name.charAt(0)}`;
                                    }}
                                />
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-semibold mb-1 truncate">{item.name}</h3>
                                <p className="text-lg font-bold mb-4">₹{item.price.toLocaleString('en-IN')}</p>

                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="mt-auto w-full btn btn-primary py-2 rounded"
                                >
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

