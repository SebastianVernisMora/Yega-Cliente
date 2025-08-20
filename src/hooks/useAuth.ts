import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthContext } from "@/context/AuthContext";
import { AxiosError } from "axios";

// Tipos para las credenciales de login y datos de registro
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password?: string; // Hacer opcional si el backend lo maneja
}

// Tipo esperado de la respuesta de la API de login
interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// --- Funciones de API ---

const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  return data;
};

const registerUser = async (userData: RegisterData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};


// --- Hook useAuth ---

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  // Mutación para el login
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Usar el contexto para actualizar el estado de autenticación global
      setAuth(data);

      toast.success("¡Bienvenido de vuelta!", {
        description: "Has iniciado sesión correctamente.",
      });
      navigate("/tiendas");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Error al iniciar sesión";
      toast.error("Error de autenticación", {
        description: errorMessage,
      });
    },
  });

  // Mutación para el registro
  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("¡Registro exitoso!", {
        description: "Ahora puedes iniciar sesión con tu nueva cuenta.",
      });
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Error en el registro";
      toast.error("Error en el registro", {
        description: errorMessage,
      });
    },
  });

  return {
    login,
    isLoggingIn,
    register,
    isRegistering,
  };
};
