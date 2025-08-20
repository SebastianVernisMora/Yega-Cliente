import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthContext();
  const [email, setEmail] = useState("test@yega.com");
  const [password, setPassword] = useState("password");

  const handleLogin = async () => {
    try {
      await login({ email, password });
      toast.success("¡Bienvenido!", { description: "Serás redirigido a las tiendas." });
      navigate('/tiendas');
    } catch (error) {
      toast.error("Error de inicio de sesión", {
        description: "Credenciales incorrectas. Por favor, intenta de nuevo."
      });
      console.error("Login failed in component", error);
    }
    login({ email, password });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-full p-6 bg-gradient-hero">
      {/* Logo */}
      <div className="mb-12 animate-fade-in-scale">
        <h1 className="yega-logo-text animate-float animate-pulse-glow text-center">
          YEGA
        </h1>
      </div>

      {/* Form */}
      <div className="w-full space-y-6 animate-fade-in-up">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-yega-silver font-medium">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-subtle transition-smooth focus:shadow-button focus:scale-[1.02]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-yega-silver font-medium">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-subtle transition-smooth focus:shadow-button focus:scale-[1.02]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          className="w-full h-14 bg-gradient-button text-primary-foreground hover:shadow-floating hover:scale-[1.02] rounded-xl font-semibold text-lg transition-bounce shadow-button"
          disabled={isLoggingIn}
          onClick={handleLogin}
        >
          {isLoggingIn ? "Ingresando..." : "Iniciar sesión"}
        </Button>

        <div className="text-center space-y-4 pt-4">
          <button className="text-yega-silver text-sm hover:text-foreground transition-smooth font-medium">
            ¿Olvidaste tu contraseña?
          </button>
          <div className="text-muted-foreground">
            <span className="text-sm">¿No tienes cuenta? </span>
            <button
              className="text-yega-silver hover:text-foreground transition-smooth font-semibold"
              onClick={() => navigate('/registro')}
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
