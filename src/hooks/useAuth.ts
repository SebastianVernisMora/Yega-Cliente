import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { z } from "zod";

// Zod Schemas for validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

// Types derived from schemas
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// API functions
const login = async (credentials: LoginCredentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

const register = async (userData: RegisterData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// The main hook
export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: login,
  });

  const registerMutation = useMutation({
    mutationFn: register,
  });

  return {
    // Login
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
  };
};
