// =====================================================
// VALIDATION UTILITIES
// =====================================================
// Comprehensive validation utilities for forms, API inputs,
// and data validation across the application
// =====================================================

import { UserProfile, CreateUserProfileRequest, UpdateUserProfileRequest } from '@/types/auth';

// =====================================================
// VALIDATION RULES
// =====================================================

export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Geçerli bir e-posta adresi girin'
  },
  password: {
    minLength: 6,
    pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
    message: 'Şifre en az 6 karakter olmalı ve harf-rakam içermeli'
  },
  phone: {
    pattern: /^(\+90|0)?[5][0-9]{9}$/,
    message: 'Geçerli bir Türkiye telefon numarası girin (05XXXXXXXXX)'
  },
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
    message: 'Ad sadece harflerden oluşmalı ve 2-100 karakter arası olmalı'
  },
  number: {
    positive: (value: number) => value > 0,
    min: (min: number) => (value: number) => value >= min,
    max: (max: number) => (value: number) => value <= max
  }
};

// =====================================================
// VALIDATION RESULT TYPES
// =====================================================

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export interface FieldValidation {
  field: string;
  value: any;
  rules: ValidationRule[];
  required?: boolean;
}

export interface ValidationRule {
  type: 'pattern' | 'length' | 'range' | 'custom' | 'required';
  validator: (value: any) => boolean;
  message: string;
  severity?: 'error' | 'warning';
}

// =====================================================
// CORE VALIDATION FUNCTIONS
// =====================================================

export function validateField(validation: FieldValidation): { isValid: boolean; error?: string; warning?: string } {
  const { field, value, rules, required = false } = validation;

  // Check if field is required and empty
  if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return {
      isValid: false,
      error: `${field} alanı zorunludur`
    };
  }

  // Skip validation if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: true };
  }

  // Run validation rules
  for (const rule of rules) {
    if (!rule.validator(value)) {
      return {
        isValid: rule.severity !== 'error' ? true : false,
        error: rule.severity === 'error' ? rule.message : undefined,
        warning: rule.severity === 'warning' ? rule.message : undefined
      };
    }
  }

  return { isValid: true };
}

export function validateForm(validations: FieldValidation[]): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};
  let isValid = true;

  for (const validation of validations) {
    const result = validateField(validation);
    
    if (!result.isValid) {
      isValid = false;
    }
    
    if (result.error) {
      errors[validation.field] = result.error;
    }
    
    if (result.warning) {
      warnings[validation.field] = result.warning;
    }
  }

  return { isValid, errors, warnings };
}

// =====================================================
// SPECIFIC VALIDATORS
// =====================================================

export const validators = {
  email: (value: string): ValidationRule[] => [
    {
      type: 'pattern',
      validator: (v) => VALIDATION_RULES.email.pattern.test(v),
      message: VALIDATION_RULES.email.message
    }
  ],

  password: (value: string): ValidationRule[] => [
    {
      type: 'length',
      validator: (v) => v.length >= VALIDATION_RULES.password.minLength,
      message: `Şifre en az ${VALIDATION_RULES.password.minLength} karakter olmalı`
    },
    {
      type: 'pattern',
      validator: (v) => VALIDATION_RULES.password.pattern.test(v),
      message: VALIDATION_RULES.password.message,
      severity: 'warning'
    }
  ],

  phone: (value: string): ValidationRule[] => [
    {
      type: 'pattern',
      validator: (v) => VALIDATION_RULES.phone.pattern.test(v),
      message: VALIDATION_RULES.phone.message
    }
  ],

  name: (value: string): ValidationRule[] => [
    {
      type: 'length',
      validator: (v) => v.length >= VALIDATION_RULES.name.minLength && v.length <= VALIDATION_RULES.name.maxLength,
      message: VALIDATION_RULES.name.message
    },
    {
      type: 'pattern',
      validator: (v) => VALIDATION_RULES.name.pattern.test(v),
      message: 'Ad sadece harflerden oluşmalı'
    }
  ],

  positiveNumber: (value: number, fieldName: string = 'Değer'): ValidationRule[] => [
    {
      type: 'range',
      validator: (v) => v > 0,
      message: `${fieldName} pozitif bir sayı olmalı`
    }
  ],

  numberRange: (min: number, max: number, fieldName: string = 'Değer'): ValidationRule[] => [
    {
      type: 'range',
      validator: (v) => v >= min && v <= max,
      message: `${fieldName} ${min} ile ${max} arasında olmalı`
    }
  ],

  greenhouseSize: (value: number): ValidationRule[] => [
    {
      type: 'range',
      validator: (v) => v >= 50 && v <= 10000,
      message: 'Sera büyüklüğü 50m² ile 10.000m² arasında olmalı'
    }
  ],

  investmentAmount: (value: number): ValidationRule[] => [
    {
      type: 'range',
      validator: (v) => v >= 50000 && v <= 50000000,
      message: 'Yatırım tutarı 50.000 TL ile 50.000.000 TL arasında olmalı'
    }
  ]
};

// =====================================================
// PROFILE VALIDATION
// =====================================================

export function validateUserProfile(profile: CreateUserProfileRequest | UpdateUserProfileRequest): ValidationResult {
  const validations: FieldValidation[] = [];

  if (profile.full_name !== undefined) {
    validations.push({
      field: 'full_name',
      value: profile.full_name,
      rules: validators.name(profile.full_name || ''),
      required: true
    });
  }

  if (profile.phone !== undefined) {
    validations.push({
      field: 'phone',
      value: profile.phone,
      rules: validators.phone(profile.phone || '')
    });
  }

  if (profile.company_name !== undefined) {
    validations.push({
      field: 'company_name',
      value: profile.company_name,
      rules: [
        {
          type: 'length',
          validator: (v) => !v || (v.length >= 2 && v.length <= 200),
          message: 'Şirket adı 2-200 karakter arasında olmalı'
        }
      ]
    });
  }

  if (profile.location?.city !== undefined) {
    validations.push({
      field: 'city',
      value: profile.location.city,
      rules: [
        {
          type: 'length',
          validator: (v) => v && v.length >= 2,
          message: 'Şehir adı en az 2 karakter olmalı'
        }
      ]
    });
  }

  return validateForm(validations);
}

// =====================================================
// ROI ANALYSIS VALIDATION
// =====================================================

export function validateROIInputs(inputs: any): ValidationResult {
  const validations: FieldValidation[] = [
    {
      field: 'greenhouseSize',
      value: inputs.greenhouseSize,
      rules: validators.greenhouseSize(inputs.greenhouseSize),
      required: true
    },
    {
      field: 'initialInvestment',
      value: inputs.initialInvestment,
      rules: validators.investmentAmount(inputs.initialInvestment),
      required: true
    },
    {
      field: 'expectedYield.annual',
      value: inputs.expectedYield?.annual,
      rules: validators.positiveNumber(inputs.expectedYield?.annual || 0, 'Yıllık üretim'),
      required: true
    },
    {
      field: 'expectedYield.pricePerKg',
      value: inputs.expectedYield?.pricePerKg,
      rules: validators.positiveNumber(inputs.expectedYield?.pricePerKg || 0, 'Kg başına fiyat'),
      required: true
    },
    {
      field: 'operationalCosts.monthly',
      value: inputs.operationalCosts?.monthly,
      rules: validators.positiveNumber(inputs.operationalCosts?.monthly || 0, 'Aylık işletme maliyeti'),
      required: true
    }
  ];

  return validateForm(validations);
}

// =====================================================
// API RESPONSE VALIDATION
// =====================================================

export function validateApiResponse(response: any, expectedFields: string[]): ValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;

  if (!response) {
    return {
      isValid: false,
      errors: { response: 'API yanıtı boş' },
      warnings: {}
    };
  }

  for (const field of expectedFields) {
    if (response[field] === undefined || response[field] === null) {
      errors[field] = `Gerekli alan eksik: ${field}`;
      isValid = false;
    }
  }

  return { isValid, errors, warnings: {} };
}

// =====================================================
// TOKEN VALIDATION
// =====================================================

export function validateTokenUsage(tokensRequired: number, tokensAvailable: number): ValidationResult {
  const isValid = tokensAvailable >= tokensRequired;
  
  return {
    isValid,
    errors: isValid ? {} : { 
      tokens: `Yetersiz token. Gerekli: ${tokensRequired}, Mevcut: ${tokensAvailable}` 
    },
    warnings: {}
  };
}

// =====================================================
// FILE VALIDATION
// =====================================================

export function validateFile(file: File, options: {
  maxSize?: number; // bytes
  allowedTypes?: string[];
  maxNameLength?: number;
}): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // File size validation
  if (options.maxSize && file.size > options.maxSize) {
    errors.size = `Dosya boyutu ${(options.maxSize / 1024 / 1024).toFixed(1)}MB'dan küçük olmalı`;
  }

  // File type validation
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    errors.type = `Desteklenen dosya türleri: ${options.allowedTypes.join(', ')}`;
  }

  // File name validation
  if (options.maxNameLength && file.name.length > options.maxNameLength) {
    errors.name = `Dosya adı ${options.maxNameLength} karakterden kısa olmalı`;
  }

  // File name security check
  if (/[<>:"/\\|?*]/.test(file.name)) {
    warnings.name = 'Dosya adında özel karakterler var';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}

// =====================================================
// SANITIZATION UTILITIES
// =====================================================

export const sanitize = {
  html: (str: string): string => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  number: (value: any): number => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  },

  string: (value: any): string => {
    return String(value || '').trim();
  },

  email: (value: string): string => {
    return value.toLowerCase().trim();
  },

  phone: (value: string): string => {
    return value.replace(/\D/g, '');
  }
};

// =====================================================
// FORM VALIDATION HOOK HELPER
// =====================================================

export function createFormValidator<T>(validationConfig: Record<keyof T, (value: any) => ValidationRule[]>) {
  return (formData: T): ValidationResult => {
    const validations: FieldValidation[] = [];

    for (const [field, validator] of Object.entries(validationConfig)) {
      const value = formData[field as keyof T];
      validations.push({
        field: field as string,
        value,
        rules: validator(value)
      });
    }

    return validateForm(validations);
  };
}

// =====================================================
// EXPORT ALL
// =====================================================

export default {
  validateField,
  validateForm,
  validateUserProfile,
  validateROIInputs,
  validateApiResponse,
  validateTokenUsage,
  validateFile,
  validators,
  sanitize,
  createFormValidator,
  VALIDATION_RULES
};
