import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ErrorBoundary } from '../components/error-boundary'

// Komponent testowy który rzuca błąd
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Wycisz console.error dla testów
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renderuje children gdy nie ma błędu', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  test('wyświetla ekran błędu gdy child rzuca błąd', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Ups! Coś poszło nie tak')).toBeInTheDocument()
    expect(screen.getByText(/Wystąpił nieoczekiwany błąd/)).toBeInTheDocument()
  })

  test('pokazuje przycisk "Spróbuj ponownie"', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const retryButton = screen.getByText('Spróbuj ponownie')
    expect(retryButton).toBeInTheDocument()
  })

  test('pokazuje przycisk "Wróć do strony głównej"', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const homeButton = screen.getByText('Wróć do strony głównej')
    expect(homeButton).toBeInTheDocument()
  })

  test('wyświetla custom fallback gdy jest podany', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Ups! Coś poszło nie tak')).not.toBeInTheDocument()
  })
})