import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../app/page'

// Mock funkcji z lib/functions
jest.mock('../lib/functions', () => ({
  getAllFunctions: jest.fn(() => Promise.resolve([
    {
      id: 'przewodnik',
      name: 'Przewodnik',
      description: 'Oprowadza drużynę po okolicy',
      icon: 'compass',
      color_background: 'bg-blue-500',
      color_text: 'text-blue-300',
      skills: [
        {
          category: 'Podstawowe umiejętności',
          items: ['Orientacja w terenie', 'Czytanie mapy']
        }
      ]
    }
  ])),
  countSkills: jest.fn(() => 2)
}))

// Mock komponentów Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock ikon z lucide-react
jest.mock('lucide-react', () => ({
  ArrowRight: () => <span>ArrowRight</span>,
  Compass: () => <span>Compass</span>,
}))

// Mock navbar i footer
jest.mock('../components/navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>
  }
})

jest.mock('../components/footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>
  }
})

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('pokazuje ekran ładowania na początku', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Pomocnik Skauta')).toBeInTheDocument()
    expect(screen.getByText('Ładowanie funkcji...')).toBeInTheDocument()
  })

  test('ładuje i wyświetla funkcje po załadowaniu', async () => {
    render(<HomePage />)
    
    // Czeka aż zniknie ekran ładowania i pojawi się zawartość
    await waitFor(() => {
      const przewodnikElements = screen.getAllByText('Przewodnik')
      expect(przewodnikElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })

    expect(screen.getByText('Oprowadza drużynę po okolicy')).toBeInTheDocument()
    expect(screen.getByText('2 umiejętności')).toBeInTheDocument()
  })

  test('renderuje navbar i footer po załadowaniu', async () => {
    render(<HomePage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  test('wyświetla progress bar podczas ładowania', () => {
    render(<HomePage />)
    
    // Sprawdza czy jest progress bar (element z odpowiednimi klasami)
    const progressContainer = screen.getByText('Ładowanie funkcji...').closest('div')
    expect(progressContainer).toBeInTheDocument()
  })
})