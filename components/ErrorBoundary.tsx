'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log errors that aren't HMR related in development
    if (process.env.NODE_ENV === 'development') {
      const isHMRError = error.message.includes('Failed to fetch') || 
                        error.message.includes('HMR') || 
                        error.message.includes('webpack');
      
      if (!isHMRError) {
        console.error('Error caught by boundary:', error, errorInfo);
      }
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Development mode: show minimal error for HMR issues
      if (process.env.NODE_ENV === 'development') {
        const isHMRError = this.state.error?.message.includes('Failed to fetch') || 
                          this.state.error?.message.includes('HMR') || 
                          this.state.error?.message.includes('webpack');
        
        if (isHMRError) {
          // Auto-recover from HMR errors after a short delay
          setTimeout(() => {
            this.setState({ hasError: false, error: undefined });
          }, 1000);
          
          return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Updating...</p>
              </div>
            </div>
          );
        }
      }

      // Fallback UI for real errors
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center max-w-md mx-auto p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-4">
                {process.env.NODE_ENV === 'development' 
                  ? this.state.error?.message 
                  : 'Please refresh the page or try again later.'}
              </p>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
