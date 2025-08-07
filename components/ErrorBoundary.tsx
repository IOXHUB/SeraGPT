'use client';

// =====================================================
// ERROR BOUNDARY COMPONENT
// =====================================================

import React, { Component, ReactNode } from 'react';
import { errorHandler, classifyError, getErrorDisplayMessage } from '@/lib/utils/error-handler';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error using our error handler
    const appError = classifyError(error, {
      component: errorInfo.componentStack?.split('\n')[1]?.trim()
    });
    errorHandler.logError(appError);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      hasError: true,
      error,
      errorInfo
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      // Default error UI
      const errorDisplay = getErrorDisplayMessage(this.state.error);
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <svg 
                className="mx-auto h-16 w-16 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {errorDisplay.title}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {errorDisplay.message}
            </p>
            
            <div className="space-y-2">
              <button
                onClick={this.resetError}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Tekrar Dene
              </button>
              
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={() => {
                    console.log('Error Details:', this.state.error);
                    console.log('Error Info:', this.state.errorInfo);
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  Hata Detaylarını Göster
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// =====================================================
// HOOK-BASED ERROR BOUNDARY
// =====================================================

export function useErrorHandler() {
  const handleError = React.useCallback((error: any, context?: any) => {
    const appError = classifyError(error, context);
    errorHandler.logError(appError);
    return appError;
  }, []);

  const handleAsyncError = React.useCallback(async (
    asyncFn: () => Promise<any>,
    context?: any
  ) => {
    try {
      return await asyncFn();
    } catch (error) {
      const appError = handleError(error, context);
      throw appError;
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError
  };
}

// =====================================================
// SPECIALIZED ERROR BOUNDARIES
// =====================================================

export function AuthErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error) => {
        // Special handling for auth errors
        if (error.message.includes('auth') || error.message.includes('token')) {
          // Redirect to login or refresh token
          console.log('Authentication error detected');
        }
      }}
      fallback={(error, resetError) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Kimlik Doğrulama Hatası
            </h3>
            <p className="text-gray-600 mb-4">
              Giriş yaparken bir sorun oluştu. Lütfen tekrar giriş yapın.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Giriş Sayfasına Git
              </button>
              <button
                onClick={resetError}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export function DashboardErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={(error, resetError) => (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-2xl mx-auto pt-20 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <svg className="mx-auto h-20 w-20 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Hatası
              </h2>
              <p className="text-gray-600 mb-6">
                Dashboard yüklenirken bir hata oluştu. Bu durum geçici olabilir.
              </p>
              <div className="space-y-3">
                <button
                  onClick={resetError}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Dashboard'u Yenile
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Ana Sayfaya Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary;
