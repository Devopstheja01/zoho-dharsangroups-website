'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminContextType {
    isAdminLoggedIn: boolean;
    adminLogin: (mobile: string) => void;
    adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedAdmin = localStorage.getItem('adminSession');
        if (savedAdmin === 'true') {
            setIsAdminLoggedIn(true);
        }
    }, []);

    const adminLogin = (mobile: string) => {
        setIsAdminLoggedIn(true);
        localStorage.setItem('adminSession', 'true');
        router.push('/admin/dashboard');
    };

    const adminLogout = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('adminSession');
        router.push('/admin/login');
    };

    return (
        <AdminContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
