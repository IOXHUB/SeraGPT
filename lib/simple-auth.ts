// Simple localStorage-based authentication
// No external dependencies, no complex setup needed

export interface SimpleUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin?: boolean;
}

const STORAGE_KEY = 'seragpt_simple_auth';
const USERS_KEY = 'seragpt_users_db';

// Get current user
export function getCurrentUser(): SimpleUser | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem(STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.warn('Failed to get current user:', error);
    return null;
  }
}

// Set current user
export function setCurrentUser(user: SimpleUser): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to set current user:', error);
  }
}

// Clear current user (logout)
export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEY);
}

// Get users database
function getUsersDB(): SimpleUser[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    return [];
  }
}

// Save users database
function saveUsersDB(users: SimpleUser[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users DB:', error);
  }
}

// Simple signup
export function simpleSignUp(email: string, password: string): { success: boolean; message: string; user?: SimpleUser } {
  if (!email || !password) {
    return { success: false, message: 'E-posta ve şifre gereklidir' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Şifre en az 6 karakter olmalıdır' };
  }

  const users = getUsersDB();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Bu e-posta adresi zaten kayıtlı' };
  }

  // Create new user
  const newUser: SimpleUser = {
    id: Date.now().toString(),
    email,
    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    createdAt: new Date().toISOString(),
    isAdmin: email.includes('admin')
  };

  // Save to users DB
  users.push(newUser);
  saveUsersDB(users);

  // Auto-login
  setCurrentUser(newUser);

  return { 
    success: true, 
    message: 'Hesap başarıyla oluşturuldu!', 
    user: newUser 
  };
}

// Simple login
export function simpleSignIn(email: string, password: string): { success: boolean; message: string; user?: SimpleUser } {
  if (!email || !password) {
    return { success: false, message: 'E-posta ve şifre gereklidir' };
  }

  const users = getUsersDB();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, message: 'E-posta veya şifre hatalı' };
  }

  // In a real app, you'd check password hash
  // For demo purposes, any password works for existing users
  setCurrentUser(user);

  return { 
    success: true, 
    message: 'Giriş başarılı!', 
    user 
  };
}

// Check if user is admin
export function isUserAdmin(): boolean {
  const user = getCurrentUser();
  return user?.isAdmin || false;
}

// Demo users for testing
export function createDemoUsers(): void {
  const users = getUsersDB();
  
  if (users.length === 0) {
    const demoUsers: SimpleUser[] = [
      {
        id: 'admin-1',
        email: 'admin@seragpt.com',
        name: 'Admin Kullanıcı',
        createdAt: new Date().toISOString(),
        isAdmin: true
      },
      {
        id: 'demo-1',
        email: 'demo@seragpt.com', 
        name: 'Demo Kullanıcı',
        createdAt: new Date().toISOString(),
        isAdmin: false
      }
    ];
    
    saveUsersDB(demoUsers);
  }
}
