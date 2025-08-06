// API Configuration and Service Endpoints
export const API_CONFIG = {
  // Weather and Climate APIs
  OPENWEATHER: {
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    oneCallUrl: 'https://api.openweathermap.org/data/3.0/onecall',
    apiKey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '',
  },

  // Alias for weather service
  WEATHER: {
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    oneCallUrl: 'https://api.openweathermap.org/data/3.0/onecall',
    apiKey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '',
  },
  
  // Copernicus Climate Data
  COPERNICUS: {
    baseUrl: 'https://climate.copernicus.eu/api',
    cdsUrl: 'https://cds.climate.copernicus.eu/api/v2',
    apiKey: process.env.COPERNICUS_API_KEY || '',
  },

  // Turkish Statistical Institute
  TUIK: {
    baseUrl: 'https://biruni.tuik.gov.tr/medas/kn/api',
    apiKey: process.env.TUIK_API_KEY || '',
  },

  // Market Price APIs
  HAL_FIYATLARI: {
    baseUrl: 'https://halmerkezibankasi.com.tr/api',
    apiKey: process.env.HAL_FIYATLARI_API_KEY || '',
  },

  TMO: {
    baseUrl: 'https://www.tmo.gov.tr/api',
    apiKey: process.env.TMO_API_KEY || '',
  },

  // International Agriculture Data
  FAO: {
    baseUrl: 'https://www.fao.org/faostat/api/v1',
    apiKey: process.env.FAO_API_KEY || '',
  },

  // AI Services
  OPENAI: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
  },

  CAD_AI: {
    baseUrl: 'https://api.cadai.tools/v1',
    apiKey: process.env.CAD_AI_API_KEY || '',
  },

  // Location Services
  GOOGLE_MAPS: {
    baseUrl: 'https://maps.googleapis.com/maps/api',
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  },

  // Communication Services
  SENDGRID: {
    baseUrl: 'https://api.sendgrid.com/v3',
    apiKey: process.env.SENDGRID_API_KEY || '',
  },

  // Payment Services
  STRIPE: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },

  // File Storage
  CLOUDINARY: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
};

// Rate limiting and retry configuration
export const API_LIMITS = {
  REQUESTS_PER_MINUTE: 60,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // ms
};

// Helper function to check if API is configured
export const isApiConfigured = (apiName: keyof typeof API_CONFIG): boolean => {
  const config = API_CONFIG[apiName];
  
  if (typeof config === 'object' && 'apiKey' in config) {
    return !!config.apiKey && config.apiKey !== '';
  }
  
  return false;
};

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  rateLimitRemaining?: number;
  nextResetTime?: number;
}

// Error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public apiName?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
