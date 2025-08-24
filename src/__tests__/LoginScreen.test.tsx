import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LoginScreen } from '@/components/LoginScreen';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {ui}
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('LoginScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('should allow a user to log in successfully', async () => {
    renderWithProviders(<LoginScreen />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@yega.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password' },
    });

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Assertions
    await waitFor(() => {
      expect(screen.getByText(/¡Bienvenido!/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/tiendas');
    });
  });

  test('should show an error message on failed login', async () => {
    renderWithProviders(<LoginScreen />);

    // Fill out the form with wrong credentials
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'wrong@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpassword' },
    });

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Assertions
    await waitFor(() => {
      expect(screen.getByText(/error de inicio de sesión/i)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
