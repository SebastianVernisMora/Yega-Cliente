import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type LoginPayload = { email: string; password: string };
type RegisterPayload = { email: string; password: string; name?: string };

export function useAuth() {
  const { toast } = useToast();

  const login = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/auth/login", payload);
      return res.data;
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? "No se pudo iniciar sesión";
      toast({ title: "Error de autenticación", description: msg, variant: "destructive" });
    },
  });

  const register = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await api.post("/auth/register", payload);
      return res.data;
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? "No se pudo registrar";
      toast({ title: "Error de registro", description: msg, variant: "destructive" });
    },
  });

  return { login, register };
}

