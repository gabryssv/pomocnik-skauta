"use client"

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <div className="bg-neutral-900 rounded-lg p-8 text-center">
              <div className="p-4 rounded-full bg-red-900/20 inline-flex mb-6">
                <AlertTriangle className="h-12 w-12 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Ups! Coś poszło nie tak</h2>
              <p className="text-neutral-400 mb-6">
                Wystąpił nieoczekiwany błąd. Nie martw się, możesz spróbować ponownie.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={this.handleRetry}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Spróbuj ponownie
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                >
                  Wróć do strony głównej
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-sm text-neutral-500 cursor-pointer hover:text-neutral-400">
                    Szczegóły błędu (dev mode)
                  </summary>
                  <pre className="mt-2 text-xs text-red-400 bg-neutral-950 p-3 rounded overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}