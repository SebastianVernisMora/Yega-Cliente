import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the AuthContext to provide a default value for isAuthenticated
vi.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({
    isAuthenticated: false,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    user: null,
  }),
}));

describe('App Routing and Rendering', () => {
  it('renders the login page when navigating to /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for text that is unique to the LoginScreen
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('shows the 404 page for a non-existent route', () => {
    render(
      <MemoryRouter initialEntries={['/some/non-existent/route']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for text from the NotFound component
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
  });

  it('redirects from / to /login when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // After the redirect from Index, the Login screen should be visible.
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
  });
});