'use client';

/**
 * Development Mock System
 * Provides comprehensive mock data for development without backend dependencies
 */

export interface MockUser {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'premium';
  name: string;
  avatar?: string;
}

export interface MockAnalysis {
  id: string;
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  title: string;
  status: 'completed' | 'in_progress' | 'draft';
  createdAt: string;
  updatedAt: string;
  results?: any;
}

export interface MockTokens {
  total: number;
  used: number;
  remaining: number;
  freeUsed: number;
  purchased: number;
}

// Predefined mock users for different scenarios
export const MOCK_USERS: Record<string, MockUser> = {
  admin: {
    id: 'admin-001',
    email: 'admin@seragpt.com',
    role: 'admin',
    name: 'Admin User',
    avatar: 'https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fadmin-avatar'
  },
  user: {
    id: 'user-001', 
    email: 'user@example.com',
    role: 'user',
    name: 'Test User',
    avatar: 'https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fuser-avatar'
  },
  premium: {
    id: 'premium-001',
    email: 'premium@example.com', 
    role: 'premium',
    name: 'Premium User',
    avatar: 'https://cdn.builder.io/api/v1/image/assets%2F2c7ec7c93776440b923d3518963fc941%2Fpremium-avatar'
  }
};

// Mock analyses data
export const MOCK_ANALYSES: MockAnalysis[] = [
  {
    id: 'analysis-001',
    type: 'roi',
    title: 'Antalya Domates Serası ROI Analizi',
    status: 'completed',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    results: {
      roiPercentage: 24.5,
      paybackPeriod: 2.8,
      netPresentValue: 450000,
      breakEvenYear: 3
    }
  },
  {
    id: 'analysis-002', 
    type: 'climate',
    title: 'İzmir İklim Uygunluk Analizi',
    status: 'completed',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
    results: {
      climateScore: 85,
      riskLevel: 'low',
      seasonalRisks: ['spring_frost', 'summer_heat']
    }
  },
  {
    id: 'analysis-003',
    type: 'equipment',
    title: 'Hidroponik Sistem Ekipman Listesi',
    status: 'in_progress',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T15:00:00Z'
  },
  {
    id: 'analysis-004',
    type: 'market',
    title: 'Salatalık Pazar Fiyat Analizi',
    status: 'draft',
    createdAt: '2024-01-17T08:45:00Z',
    updatedAt: '2024-01-17T08:45:00Z'
  }
];

// Mock token data by user type
export const MOCK_TOKENS: Record<string, MockTokens> = {
  admin: {
    total: 999,
    used: 15,
    remaining: 984,
    freeUsed: 0,
    purchased: 999
  },
  user: {
    total: 5,
    used: 2,
    remaining: 3,
    freeUsed: 2,
    purchased: 0
  },
  premium: {
    total: 100,
    used: 25,
    remaining: 75,
    freeUsed: 5,
    purchased: 95
  }
};

// Check if we're in a development environment
function isDevEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  
  return process.env.NODE_ENV === 'development' || 
         window.location.hostname.includes('fly.dev') ||
         window.location.hostname.includes('builder.my') ||
         window.location.hostname.includes('localhost');
}

/**
 * Development Mock System Manager
 */
export class DevMockSystem {
  private static currentUser: MockUser | null = null;
  
  // Initialize mock system
  static init() {
    if (!isDevEnvironment()) {
      return;
    }

    console.log('🚀 Initializing DevMockSystem...');

    // Check if user is already set in localStorage
    const savedUser = localStorage.getItem('seragpt_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        console.log('🚀 Development Mock User restored:', this.currentUser);
      } catch (e) {
        console.warn('Failed to parse saved user, using default');
        this.setUser('user');
      }
    } else {
      // Default to regular user
      this.setUser('user');
    }
  }

  // Set current mock user
  static setUser(userType: keyof typeof MOCK_USERS) {
    if (!isDevEnvironment()) {
      return;
    }

    this.currentUser = MOCK_USERS[userType];
    localStorage.setItem('seragpt_user', JSON.stringify(this.currentUser));
    console.log('🚀 Development Mock User set:', this.currentUser);
    
    // Trigger a custom event to notify components
    window.dispatchEvent(new CustomEvent('dev-user-changed', { 
      detail: this.currentUser 
    }));
  }

  // Get current user
  static getCurrentUser(): MockUser | null {
    if (!isDevEnvironment()) {
      return null;
    }
    return this.currentUser;
  }

  // Get user analyses
  static getUserAnalyses(userId: string): MockAnalysis[] {
    if (!isDevEnvironment()) {
      return [];
    }
    
    // Return different analyses based on user type
    if (this.currentUser?.role === 'admin') {
      return MOCK_ANALYSES; // Admin sees all
    }
    return MOCK_ANALYSES.filter(analysis => 
      analysis.status === 'completed' || analysis.status === 'in_progress'
    );
  }

  // Get user tokens
  static getUserTokens(userType: string): MockTokens {
    if (!isDevEnvironment()) {
      return MOCK_TOKENS.user;
    }
    return MOCK_TOKENS[userType] || MOCK_TOKENS.user;
  }

  // Clear mock user (logout)
  static clearUser() {
    if (!isDevEnvironment()) {
      return;
    }

    this.currentUser = null;
    localStorage.removeItem('seragpt_user');
    console.log('🚀 Development Mock User cleared');
    
    window.dispatchEvent(new CustomEvent('dev-user-changed', { 
      detail: null 
    }));
  }

  // Get analysis by ID
  static getAnalysis(id: string): MockAnalysis | null {
    if (!isDevEnvironment()) {
      return null;
    }
    return MOCK_ANALYSES.find(analysis => analysis.id === id) || null;
  }

  // Mock API responses
  static async mockApiCall<T>(data: T, delay: number = 500): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  }

  // Generate random analysis data
  static generateMockAnalysisResult(type: MockAnalysis['type']): any {
    switch (type) {
      case 'roi':
        return {
          roiPercentage: Math.round((Math.random() * 30 + 10) * 100) / 100,
          paybackPeriod: Math.round((Math.random() * 3 + 1) * 10) / 10,
          netPresentValue: Math.round(Math.random() * 500000 + 100000),
          breakEvenYear: Math.round(Math.random() * 3 + 2)
        };
      case 'climate':
        return {
          climateScore: Math.round(Math.random() * 40 + 60),
          riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          seasonalRisks: ['spring_frost', 'summer_heat', 'winter_cold'].slice(0, Math.floor(Math.random() * 3) + 1)
        };
      case 'equipment':
        return {
          totalCost: Math.round(Math.random() * 200000 + 50000),
          equipmentCount: Math.round(Math.random() * 20 + 10),
          categories: ['heating', 'cooling', 'irrigation', 'monitoring']
        };
      case 'market':
        return {
          averagePrice: Math.round((Math.random() * 10 + 5) * 100) / 100,
          priceVolatility: Math.round(Math.random() * 30 + 10),
          demandScore: Math.round(Math.random() * 40 + 60)
        };
      case 'layout':
        return {
          totalArea: Math.round(Math.random() * 5000 + 1000),
          efficiency: Math.round(Math.random() * 20 + 80),
          layoutType: ['traditional', 'modern', 'hybrid'][Math.floor(Math.random() * 3)]
        };
      default:
        return {};
    }
  }
}

// Auto-initialize on import
if (typeof window !== 'undefined' && isDevEnvironment()) {
  DevMockSystem.init();
}

// Dev tools for browser console
if (typeof window !== 'undefined' && isDevEnvironment()) {
  (window as any).SeraGPTDev = {
    setUser: (type: keyof typeof MOCK_USERS) => DevMockSystem.setUser(type),
    clearUser: () => DevMockSystem.clearUser(),
    getCurrentUser: () => DevMockSystem.getCurrentUser(),
    getAnalyses: (userId: string) => DevMockSystem.getUserAnalyses(userId),
    mockUsers: MOCK_USERS,
    help: () => {
      console.log(`
🚀 SeraGPT Development Tools:

SeraGPTDev.setUser('admin')    - Set admin user
SeraGPTDev.setUser('user')     - Set regular user  
SeraGPTDev.setUser('premium')  - Set premium user
SeraGPTDev.clearUser()         - Logout
SeraGPTDev.getCurrentUser()    - Get current user
SeraGPTDev.getAnalyses()       - Get user analyses
SeraGPTDev.mockUsers           - See all mock users
      `);
    }
  };

  console.log('�� SeraGPT Development Tools loaded! Type "SeraGPTDev.help()" for commands');
}
