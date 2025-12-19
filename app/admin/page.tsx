'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useProducts } from '@/lib/productContext';
import { Product } from '@/lib/data';
import { adminAuth, AdminUser } from '@/lib/adminAuth';

export default function AdminPage() {
    const { products, addProduct, updateProduct } = useProducts();
    const [activeTab, setActiveTab] = useState('products');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Auth State
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });

    // User Management State
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [newUserForm, setNewUserForm] = useState({ username: '', password: '' });
    const [changePassForm, setChangePassForm] = useState('');

    // Fetch users on load (if super admin)
    useEffect(() => {
        if (currentUser?.role === 'SUPER_ADMIN') {
            setUsers(adminAuth.getUsers());
        }
    }, [currentUser, activeTab]);

    // Product Form State
    const initialFormState: Partial<Product> = {
        name: '',
        sku: '',
        brand: '',
        category: 'men',
        subcategory: '',
        price: 0,
        image: '',
        inStock: true
    };
    const [formData, setFormData] = useState<Partial<Product>>(initialFormState);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = adminAuth.login(loginForm.username, loginForm.password);
        if (user) {
            setCurrentUser(user);
        } else {
            alert('Invalid Username or Password');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setLoginForm({ username: '', password: '' });
    };

    // ... [Product Handlers remain same: handleGenerateId, handleGenerateSKU, handleImageUpload, handleSubmit] ...
    const handleGenerateId = () => Math.random().toString(36).substr(2, 9);
    const handleGenerateSKU = () => {
        const prefix = formData.category === 'men' ? 'MN' : 'WM';
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${random}`;
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { alert('File size > 2MB'); e.target.value = ''; return; }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { alert('Invalid format'); e.target.value = ''; return; }
        const reader = new FileReader();
        reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Update Existing
            updateProduct(editingId, {
                name: formData.name,
                sku: formData.sku,
                brand: formData.brand,
                category: formData.category as 'men' | 'women',
                subcategory: formData.subcategory,
                price: Number(formData.price),
                image: formData.image,
                inStock: formData.inStock
            });
            alert('Product updated successfully!');
            handleCancelEdit();
        } else {
            // Create New
            const newProduct: Product = {
                id: handleGenerateId(),
                name: formData.name || 'Untitled',
                sku: formData.sku || handleGenerateSKU(),
                brand: formData.brand || '',
                category: (formData.category as 'men' | 'women') || 'men',
                subcategory: formData.subcategory || 'General',
                price: Number(formData.price) || 0,
                image: formData.image || 'https://placehold.co/400x600?text=No+Image',
                inStock: formData.inStock ?? true,
                stockQuantity: Number(formData.stockQuantity) || 10,
                onlineSales: 0,
                offlineSales: 0
            };
            addProduct(newProduct);
            alert('Product added successfully!');
            handleCancelEdit(); // Resets form
        }
    };

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            sku: product.sku,
            brand: product.brand || '',
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            image: product.image,
            inStock: product.inStock,
            stockQuantity: product.stockQuantity,
            onlineSales: product.onlineSales,
            offlineSales: product.offlineSales
        });
        setEditingId(product.id);
        setIsAdding(true);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData(initialFormState);
    };
    // Helper: Generate Smart SKU
    const generateSKU = (category: string, subcategory: string, name: string) => {
        const catCode = category.substring(0, 1).toUpperCase(); // M or W
        const subCode = subcategory.substring(0, 3).toUpperCase(); // SHI, PAN, etc.
        const nameCode = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${catCode}-${subCode}-${nameCode}-${random}`; // e.g., M-SHI-PRE-123
    };

    const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            // Simple parsing: split by lines, then commas. 
            // Header: name,brand,price,category,subcategory,sku,image
            const lines = text.split('\n');
            // Skip header (index 0)
            let count = 0;
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                // Basic CSV split (Note: doesn't handle commas in quotes)
                const [pName, pBrand, pPrice, pCat, pSub, pSku] = line.split(',');

                if (pName && pPrice) {
                    const cleanName = pName.trim();
                    const cleanCat = (pCat?.trim().toLowerCase() === 'women' ? 'women' : 'men') as 'women' | 'men';
                    const cleanSub = pSub?.trim() || 'General';
                    const cleanSku = pSku?.trim() || generateSKU(cleanCat, cleanSub, cleanName);

                    addProduct({
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                        name: cleanName,
                        brand: pBrand?.trim() || '',
                        price: Number(pPrice),
                        category: cleanCat,
                        subcategory: cleanSub,
                        sku: cleanSku,
                        image: '/images/placeholder.png', // Default image
                        inStock: true,
                        stockQuantity: 10,
                        onlineSales: 0,
                        offlineSales: 0
                    } as Product);
                    count++;
                }
            }
            alert(`Imported ${count} products!`);
            e.target.value = ''; // Reset input
        };
        reader.readAsText(file);
    };

    const handleOfflineSale = (product: Product) => {
        if (!confirm(`Record 1 offline sale for "${product.name}"?`)) return;

        const currentOffline = product.offlineSales || 0;
        updateProduct(product.id, { offlineSales: currentOffline + 1 });
    };

    // User Management Handlers
    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        try {
            adminAuth.createUser(currentUser, {
                username: newUserForm.username,
                password: newUserForm.password,
                role: 'INVENTORY_MANAGER'
            });
            alert('User created!');
            setNewUserForm({ username: '', password: '' });
            setUsers(adminAuth.getUsers()); // Refresh list
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDeleteUser = (id: string) => {
        if (!currentUser || !confirm('Are you sure?')) return;
        try {
            adminAuth.deleteUser(currentUser, id);
            setUsers(adminAuth.getUsers());
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        adminAuth.changePassword(currentUser.id, changePassForm);
        alert('Password updated! Please login again with new password.');
        handleLogout();
    };

    // Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const displayedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">DG Admin Portal</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Username</label>
                        <input
                            className="input w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={loginForm.username}
                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                            placeholder="username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
                        <input
                            type="password"
                            className="input w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            placeholder="password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full py-3 rounded-lg font-bold">
                        Login
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">Default: admin / admin123</p>
                </form>
            </div>
        );
    }

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>DG Admin</div>
                <div className="px-4 py-2 mt-4 mb-2">
                    <p className="text-xs text-gray-400 uppercase">Menu</p>
                </div>
                <nav className={styles.nav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Inventory/Products
                    </button>

                    {currentUser.role === 'SUPER_ADMIN' && (
                        <button
                            className={`${styles.navItem} ${activeTab === 'users' ? styles.active : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            User Management
                        </button>
                    )}

                    <button
                        className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        My Profile
                    </button>

                    <div className="h-px bg-gray-700 my-4 mx-4"></div>

                    <Link href="/" className={styles.navItem}>Back to Shop</Link>
                    <button onClick={handleLogout} className={`${styles.navItem} text-red-400 hover:text-red-300`}>
                        Logout
                    </button>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className="capitalize">{activeTab.replace('-', ' ')}</h1>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <span className="block font-bold text-sm">{currentUser.username}</span>
                            <span className="block text-xs text-gray-500">{currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Manager'}</span>
                        </div>
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {currentUser.username.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className={styles.content}>
                    {activeTab === 'products' && (
                        <div className={styles.card}>
                            {/* Product Management UI */}
                            <div className={styles.cardHeader}>
                                <h2>Product Inventory</h2>
                                <div className="flex gap-2">
                                    <label className="btn btn-outline cursor-pointer border-gray-300 text-sm">
                                        Import CSV
                                        <input type="file" accept=".csv" className="hidden" onChange={handleCSVImport} />
                                    </label>
                                    <button className="btn btn-primary" onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData(initialFormState); }}>
                                        {isAdding ? 'Cancel' : 'Add New Product'}
                                    </button>
                                </div>
                            </div>

                            {isAdding && (
                                <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-lg mb-6 grid gap-4 border border-blue-100">
                                    <h3 className="font-bold text-lg mb-2 text-blue-800 border-b pb-2">
                                        {editingId ? 'Edit Product' : 'New Product Details'}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Product Name</label>
                                            <input className="input w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">SKU</label>
                                            <input className="input w-full p-2 border rounded" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} placeholder="Auto-gen if empty" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Brand</label>
                                            <input className="input w-full p-2 border rounded" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} placeholder="Brand Name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Category</label>
                                            <select className="input w-full p-2 border rounded" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })}>
                                                <option value="men">Men</option>
                                                <option value="women">Women</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Subcategory</label>
                                            <input
                                                list="subcategories"
                                                className="input w-full p-2 border rounded"
                                                value={formData.subcategory}
                                                onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                                                placeholder="Select or Type..."
                                            />
                                            <datalist id="subcategories">
                                                <option value="Shirts" />
                                                <option value="Pants" />
                                                <option value="T-Shirts" />
                                                <option value="Wedding" />
                                                <option value="Ethnic" />
                                                <option value="Sarees" />
                                                <option value="Dresses" />
                                                <option value="Kurtas" />
                                            </datalist>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Price</label>
                                            <input type="number" className="input w-full p-2 border rounded" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Total Stock</label>
                                            <input type="number" className="input w-full p-2 border rounded" value={formData.stockQuantity} onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1">Status</label>
                                            <select className="input w-full p-2 border rounded" value={formData.inStock ? 'true' : 'false'} onChange={e => setFormData({ ...formData, inStock: e.target.value === 'true' })}>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-bold mb-1">Image</label>
                                            <input type="file" accept="image/*" className="input w-full p-2 border rounded bg-white" onChange={handleImageUpload} />
                                            <p className="text-xs text-gray-500 mt-1">Recommended: JPG/WEBP, 800x1200px (3:4 aspect ratio) for best display.</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-full mt-4">{editingId ? 'Update Product' : 'Save New Product'}</button>
                                </form>
                            )}

                            <div className="overflow-x-auto">
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Brand</th>
                                            <th>SKU</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock (Avail/Tot)</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedProducts.map(p => {
                                            const total = p.stockQuantity || 0;
                                            const sold = (p.onlineSales || 0) + (p.offlineSales || 0);
                                            const available = Math.max(0, total - sold);

                                            return (
                                                <tr key={p.id}>
                                                    <td className="flex items-center gap-2">
                                                        <img src={p.image} className="w-8 h-8 rounded border object-cover" onError={(e: any) => { e.target.src = 'https://placehold.co/50' }} />
                                                        <span className="text-sm font-medium">{p.name}</span>
                                                    </td>
                                                    <td className="text-sm text-gray-600">{p.brand || '-'}</td>
                                                    <td className="text-xs font-mono text-gray-500">{p.sku}</td>
                                                    <td className="text-sm">{p.category}/{p.subcategory}</td>
                                                    <td className="text-sm font-bold">₹{p.price}</td>
                                                    <td>
                                                        <div className="flex flex-col">
                                                            <span className={`font-bold ${available < 3 ? 'text-red-600' : 'text-green-600'}`}>
                                                                {available} / {total}
                                                            </span>
                                                            <span className="text-[10px] text-gray-500">
                                                                (On:{p.onlineSales || 0} | Off:{p.offlineSales || 0})
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleOfflineSale(p)}
                                                                disabled={available <= 0}
                                                                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 border border-orange-200 disabled:opacity-50"
                                                                title="Record Offline Sale"
                                                            >
                                                                -1 Sold
                                                            </button>
                                                            <button
                                                                onClick={() => handleEdit(p)}
                                                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 border border-blue-200"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination controls simplified */}
                            <div className="flex justify-center gap-4 mt-4">
                                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm underline">Prev</button>
                                <span className="text-sm">Page {page} of {totalPages}</span>
                                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="text-sm underline">Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && currentUser.role === 'SUPER_ADMIN' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h2>Active Users</h2>
                                </div>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-3">Username</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id} className="border-b text-sm">
                                                <td className="p-3">{u.username} {u.id === currentUser.id && '(You)'}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {u.role === 'SUPER_ADMIN' ? 'Admin' : 'Manager'}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    {u.role !== 'SUPER_ADMIN' && (
                                                        <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:underline">
                                                            Remove
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h2>Create New User</h2>
                                </div>
                                <form onSubmit={handleCreateUser} className="p-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">New Username</label>
                                        <input
                                            className="input w-full p-2 border rounded"
                                            value={newUserForm.username}
                                            onChange={e => setNewUserForm({ ...newUserForm, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">New Password</label>
                                        <input
                                            type="password"
                                            className="input w-full p-2 border rounded"
                                            value={newUserForm.password}
                                            onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-700 mb-4">
                                        New users will have <strong>Inventory Manager</strong> permissions. They can upload products but cannot manage validation or other users.
                                    </div>
                                    <button className="btn btn-primary w-full">Create User</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2>My Profile</h2>
                            </div>
                            <div className="p-6 max-w-md">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold">Account Details</h3>
                                    <p className="text-gray-600 mt-2">Username: <span className="font-mono text-black">{currentUser.username}</span></p>
                                    <p className="text-gray-600">Role: <span className="font-mono text-black">{currentUser.role}</span></p>
                                </div>

                                <hr className="my-6" />

                                <h3 className="text-lg font-bold mb-4">Change Password</h3>
                                <form onSubmit={handleChangePassword}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">New Password</label>
                                        <input
                                            type="password"
                                            className="input w-full p-3 border rounded bg-gray-50"
                                            value={changePassForm}
                                            onChange={e => setChangePassForm(e.target.value)}
                                            placeholder="Enter new password"
                                            required
                                            minLength={4}
                                        />
                                    </div>
                                    <button className="btn btn-outline w-full border-gray-400">Update Password</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

