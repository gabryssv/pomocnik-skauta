import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Progress } from '../components/ui/progress-loading'

describe('Progress Component', () => {
  test('renderuje progress bar z domyślnymi wartościami', () => {
    render(<Progress />)
    
    // Sprawdza czy progress bar ma poprawną klasę
    const progressBar = document.querySelector('.w-full.space-y-2')
    expect(progressBar).toHaveClass('w-full', 'space-y-2')
  })

  test('wyświetla label z wartością gdy showValueLabel=true', () => {
    render(<Progress value={50} showValueLabel={true} />)
    
    expect(screen.getByText('Ładowanie...')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  test('nie wyświetla label gdy showValueLabel=false', () => {
    render(<Progress value={50} showValueLabel={false} />)
    
    expect(screen.queryByText('Ładowanie...')).not.toBeInTheDocument()
    expect(screen.queryByText('50%')).not.toBeInTheDocument()
  })

  test('ustawia poprawną szerokość progress bara', () => {
    render(<Progress value={75} />)
    
    const progressFill = document.querySelector('.h-full.transition-all')
    expect(progressFill).toHaveStyle('width: 75%')
  })

  test('ogranicza wartość do maksimum 100%', () => {
    render(<Progress value={150} showValueLabel={true} />)
    
    expect(screen.getByText('100%')).toBeInTheDocument()
    
    const progressFill = document.querySelector('.h-full.transition-all')
    expect(progressFill).toHaveStyle('width: 100%')
  })

  test('ogranicza wartość do minimum 0%', () => {
    render(<Progress value={-10} />)
    
    const progressFill = document.querySelector('.h-full.transition-all')
    expect(progressFill).toHaveStyle('width: 0%')
  })

  test('renderuje różne rozmiary', () => {
    const { rerender } = render(<Progress size="sm" />)
    let progressContainer = document.querySelector('.bg-neutral-800')
    expect(progressContainer).toHaveClass('h-2')

    rerender(<Progress size="md" />)
    progressContainer = document.querySelector('.bg-neutral-800')
    expect(progressContainer).toHaveClass('h-3')

    rerender(<Progress size="lg" />)
    progressContainer = document.querySelector('.bg-neutral-800')
    expect(progressContainer).toHaveClass('h-4')
  })

  test('renderuje różne kolory', () => {
    const { rerender } = render(<Progress color="success" />)
    let progressFill = document.querySelector('.h-full.transition-all')
    expect(progressFill).toHaveClass('bg-green-500')

    rerender(<Progress color="warning" />)
    progressFill = document.querySelector('.h-full.transition-all')
    expect(progressFill).toHaveClass('bg-yellow-500')

    rerender(<Progress color="danger" />)
    progressFill = document.querySelector('.h-full.transition-all')
    expect(progressFill).toHaveClass('bg-red-500')
  })
})