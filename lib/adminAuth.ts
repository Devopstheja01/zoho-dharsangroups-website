'use client';

export type AdminRole = 'SUPER_ADMIN' | 'INVENTORY_MANAGER';

export interface AdminUser {
    id: string;
    username: string;
    password: string; // Stored in plain text for this mock implementation
    role: AdminRole;
    createdAt: number;
}

const STORAGE_KEY = 'dg_admin_users';

// Seed default admin if not exists
const seedUsers = (): AdminUser[] => {
    if (typeof window === 'undefined') return [];

    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
        return JSON.parse(existing);
    }

    const defaultAdmin: AdminUser = {
        id: 'admin-seed-001',
        username: 'admin',
        password: 'admin123',
        role: 'SUPER_ADMIN',
        createdAt: Date.now()
    };

    const users = [defaultAdmin];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return users;
};

export const adminAuth = {
    getUsers: (): AdminUser[] => {
        return seedUsers();
    },

    login: (username: string, password: string): AdminUser | null => {
        const users = seedUsers();
        const user = users.find(u => u.username === username && u.password === password);
        return user || null;
    },

    createUser: (currUser: AdminUser, newUser: Omit<AdminUser, 'id' | 'createdAt'>): boolean => {
        if (currUser.role !== 'SUPER_ADMIN') return false;

        const users = seedUsers();
        if (users.some(u => u.username === newUser.username)) {
            throw new Error('Username already exists');
        }

        const userToAdd: AdminUser = {
            ...newUser,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: Date.now()
        };

        users.push(userToAdd);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        return true;
    },

    deleteUser: (currUser: AdminUser, userIdToDelete: string): boolean => {
        if (currUser.role !== 'SUPER_ADMIN') return false;
        if (currUser.id === userIdToDelete) throw new Error('Cannot delete yourself');

        const users = seedUsers();
        const filtered = users.filter(u => u.id !== userIdToDelete);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    },

    changePassword: (userId: string, newPass: string): boolean => {
        const users = seedUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index === -1) return false;

        users[index].password = newPass;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        return true;
    },

    checkSession: (): AdminUser | null => {
        if (typeof window !== 'undefined') {
            const sessionStr = localStorage.getItem('admin_session');
            if (sessionStr) {
                try {
                    const session = JSON.parse(sessionStr);
                    // 5 min timeout
                    if (Date.now() - session.timestamp < 300000) {
                        return { username: session.username, role: session.role, id: session.id, createdAt: 0, password: '' };
                    }
                    localStorage.removeItem('admin_session');
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return null;
    }
};
