'use client';

// =====================================================
// VALIDATION HOOK
// =====================================================
// React hook for form validation with real-time feedback
// =====================================================

import { useState, useCallback, useMemo } from 'react';
import { 
  validateForm, 
  validateField, 
  FieldValidation, 
  ValidationResult,
  validators,
  sanitize
} from '@/lib/utils/validation';

// =====================================================
// HOOK TYPES
// =====================================================

export interface UseValidationOptions<T> {
  validationConfig: Partial<Record<keyof T, (value: any) => any>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  sanitizeOnChange?: boolean;
  debounceMs?: number;
}

export interface ValidationState {
  errors: Record<string, string>;
  warnings: Record<string, string>;
  isValid: boolean;
  isValidating: boolean;
  touchedFields: Set<string>;
}

export interface FieldValidationState {
  error?: string;
  warning?: string;
  isValid: boolean;
  isTouched: boolean;
}

// =====================================================
// MAIN VALIDATION HOOK
// =====================================================

export function useValidation<T extends Record<string, any>>(
  initialData: T,
  options: UseValidationOptions<T>
) {
  const {
    validationConfig,
    validateOnChange = true,
    validateOnBlur = true,
    sanitizeOnChange = true,
    debounceMs = 300
  } = options;

  // State
  const [data, setData] = useState<T>(initialData);
  const [validationState, setValidationState] = useState<ValidationState>({
    errors: {},
    warnings: {},
    isValid: true,
    isValidating: false,
    touchedFields: new Set()
  });

  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // =====================================================
  // VALIDATION LOGIC
  // =====================================================

  const validateSingleField = useCallback((fieldName: keyof T, value: any): FieldValidationState => {
    const validator = validationConfig[fieldName];
    if (!validator) {
      return { isValid: true, isTouched: validationState.touchedFields.has(fieldName as string) };
    }

    try {
      const rules = validator(value);
      const fieldValidation: FieldValidation = {
        field: fieldName as string,
        value,
        rules,
        required: true // Can be made configurable
      };

      const result = validateField(fieldValidation);
      
      return {
        error: result.error,
        warning: result.warning,
        isValid: result.isValid,
        isTouched: validationState.touchedFields.has(fieldName as string)
      };
    } catch (error) {
      return {
        error: 'Validation error',
        isValid: false,
        isTouched: validationState.touchedFields.has(fieldName as string)
      };
    }
  }, [validationConfig, validationState.touchedFields]);

  const validateAllFields = useCallback((): ValidationResult => {
    const validations: FieldValidation[] = [];

    for (const [fieldName, validator] of Object.entries(validationConfig)) {
      if (validator && data[fieldName] !== undefined) {
        const rules = validator(data[fieldName]);
        validations.push({
          field: fieldName,
          value: data[fieldName],
          rules,
          required: true
        });
      }
    }

    return validateForm(validations);
  }, [data, validationConfig]);

  // =====================================================
  // UPDATE HANDLERS
  // =====================================================

  const updateField = useCallback((fieldName: keyof T, value: any) => {
    let processedValue = value;

    // Sanitize value if enabled
    if (sanitizeOnChange) {
      if (typeof value === 'string') {
        processedValue = sanitize.string(value);
      } else if (typeof value === 'number') {
        processedValue = sanitize.number(value);
      }
    }

    // Update data
    setData(prev => ({ ...prev, [fieldName]: processedValue }));

    // Mark field as touched
    setValidationState(prev => ({
      ...prev,
      touchedFields: new Set(Array.from(prev.touchedFields).concat([fieldName as string]))
    }));

    // Validate if enabled
    if (validateOnChange) {
      if (debounceMs > 0) {
        // Clear existing timer
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        // Set new timer
        const timer = setTimeout(() => {
          const fieldResult = validateSingleField(fieldName, processedValue);
          setValidationState(prev => ({
            ...prev,
            errors: {
              ...prev.errors,
              [fieldName]: fieldResult.error || ''
            },
            warnings: {
              ...prev.warnings,
              [fieldName]: fieldResult.warning || ''
            }
          }));
        }, debounceMs);

        setDebounceTimer(timer);
      } else {
        // Immediate validation
        const fieldResult = validateSingleField(fieldName, processedValue);
        setValidationState(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            [fieldName]: fieldResult.error || ''
          },
          warnings: {
            ...prev.warnings,
            [fieldName]: fieldResult.warning || ''
          }
        }));
      }
    }
  }, [validateOnChange, sanitizeOnChange, debounceMs, debounceTimer, validateSingleField]);

  const handleFieldBlur = useCallback((fieldName: keyof T) => {
    if (validateOnBlur) {
      const fieldResult = validateSingleField(fieldName, data[fieldName]);
      setValidationState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldName]: fieldResult.error || ''
        },
        warnings: {
          ...prev.warnings,
          [fieldName]: fieldResult.warning || ''
        },
        touchedFields: new Set(Array.from(prev.touchedFields).concat([fieldName as string]))
      }));
    }
  }, [validateOnBlur, validateSingleField, data]);

  // =====================================================
  // VALIDATION TRIGGERS
  // =====================================================

  const validateAll = useCallback((): boolean => {
    setValidationState(prev => ({ ...prev, isValidating: true }));
    
    const result = validateAllFields();
    
    setValidationState(prev => ({
      ...prev,
      errors: result.errors,
      warnings: result.warnings,
      isValid: result.isValid,
      isValidating: false
    }));

    return result.isValid;
  }, [validateAllFields]);

  const clearValidation = useCallback((fieldName?: keyof T) => {
    if (fieldName) {
      setValidationState(prev => ({
        ...prev,
        errors: { ...prev.errors, [fieldName]: '' },
        warnings: { ...prev.warnings, [fieldName]: '' }
      }));
    } else {
      setValidationState(prev => ({
        ...prev,
        errors: {},
        warnings: {},
        isValid: true,
        touchedFields: new Set()
      }));
    }
  }, []);

  const reset = useCallback((newData?: T) => {
    setData(newData || initialData);
    setValidationState({
      errors: {},
      warnings: {},
      isValid: true,
      isValidating: false,
      touchedFields: new Set()
    });
  }, [initialData]);

  // =====================================================
  // FIELD HELPERS
  // =====================================================

  const getFieldProps = useCallback((fieldName: keyof T) => {
    const fieldState = validateSingleField(fieldName, data[fieldName]);
    
    return {
      value: data[fieldName] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        updateField(fieldName, e.target.value);
      },
      onBlur: () => handleFieldBlur(fieldName),
      error: validationState.errors[fieldName as string],
      warning: validationState.warnings[fieldName as string],
      isValid: !validationState.errors[fieldName as string],
      isTouched: validationState.touchedFields.has(fieldName as string)
    };
  }, [data, validationState, updateField, handleFieldBlur, validateSingleField]);

  const getFieldError = useCallback((fieldName: keyof T): string | undefined => {
    return validationState.errors[fieldName as string];
  }, [validationState.errors]);

  const getFieldWarning = useCallback((fieldName: keyof T): string | undefined => {
    return validationState.warnings[fieldName as string];
  }, [validationState.warnings]);

  const isFieldValid = useCallback((fieldName: keyof T): boolean => {
    return !validationState.errors[fieldName as string];
  }, [validationState.errors]);

  // =====================================================
  // COMPUTED VALUES
  // =====================================================

  const hasErrors = useMemo(() => {
    return Object.values(validationState.errors).some(error => error);
  }, [validationState.errors]);

  const hasWarnings = useMemo(() => {
    return Object.values(validationState.warnings).some(warning => warning);
  }, [validationState.warnings]);

  const isFormValid = useMemo(() => {
    return !hasErrors && Object.keys(data).length > 0;
  }, [hasErrors, data]);

  // =====================================================
  // CLEANUP
  // =====================================================

  // Clear debounce timer on unmount
  const cleanup = useCallback(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  }, [debounceTimer]);

  // =====================================================
  // RETURN HOOK API
  // =====================================================

  return {
    // Data
    data,
    setData,
    
    // Validation state
    errors: validationState.errors,
    warnings: validationState.warnings,
    isValid: isFormValid,
    isValidating: validationState.isValidating,
    hasErrors,
    hasWarnings,
    touchedFields: validationState.touchedFields,
    
    // Field operations
    updateField,
    getFieldProps,
    getFieldError,
    getFieldWarning,
    isFieldValid,
    handleFieldBlur,
    
    // Form operations
    validateAll,
    clearValidation,
    reset,
    cleanup,
    
    // Manual validation
    validateField: validateSingleField,
    validateForm: validateAllFields
  };
}

// =====================================================
// SPECIALIZED VALIDATION HOOKS
// =====================================================

export function useUserProfileValidation(initialProfile: any) {
  return useValidation(initialProfile, {
    validationConfig: {
      full_name: validators.name,
      email: validators.email,
      phone: validators.phone,
      company_name: (value: string) => [
        {
          type: 'length' as const,
          validator: (v) => !v || (v.length >= 2 && v.length <= 200),
          message: 'Şirket adı 2-200 karakter arasında olmalı'
        }
      ]
    },
    validateOnChange: true,
    validateOnBlur: true,
    debounceMs: 500
  });
}

export function useROIValidation(initialROI: any) {
  return useValidation(initialROI, {
    validationConfig: {
      greenhouseSize: validators.greenhouseSize,
      initialInvestment: validators.investmentAmount,
      'expectedYield.annual': (value: number) => validators.positiveNumber(value, 'Yıllık üretim'),
      'expectedYield.pricePerKg': (value: number) => validators.positiveNumber(value, 'Kg başına fiyat'),
      'operationalCosts.monthly': (value: number) => validators.positiveNumber(value, 'Aylık maliyet')
    },
    validateOnChange: true,
    debounceMs: 300
  });
}

export function useLoginValidation() {
  return useValidation(
    { email: '', password: '' },
    {
      validationConfig: {
        email: validators.email,
        password: validators.password
      },
      validateOnBlur: true,
      debounceMs: 500
    }
  );
}

// =====================================================
// EXPORT ALL
// =====================================================

export default useValidation;
