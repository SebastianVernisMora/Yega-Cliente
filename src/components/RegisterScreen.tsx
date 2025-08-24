import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export const RegisterScreen = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthContext();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = hasMinLength && hasUppercase && hasNumber && isValidEmail && firstName && lastName && termsAccepted && !isLoading;

  const handleRegister = async () => {
    if (!canSubmit) return;

    try {
      await register({
        name: `${firstName} ${lastName}`,
        email,
        password,
      });
      toast.success("¡Cuenta creada!", {
        description: "Serás redirigido para iniciar sesión.",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Error en el registro", {
        description:
          "No se pudo crear la cuenta. Por favor, intenta de nuevo.",
      });
      console.error("Registration failed in component", error);
    }
  };

  return (
    <div className="flex flex-col min-h-full p-6 bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center mb-8 pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/login')}
          className="text-foreground hover:bg-accent"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold ml-4">Crear cuenta</h1>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-yega-silver font-medium">
              Nombre(s)
            </Label>
            <Input
              id="firstName"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-subtle transition-smooth focus:shadow-button focus:scale-[1.02]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-yega-silver font-medium">
              Apellidos
            </Label>
            <Input
              id="lastName"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-subtle transition-smooth focus:shadow-button focus:scale-[1.02]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-yega-silver font-medium">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-input border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-subtle transition-smooth focus:shadow-button focus:scale-[1.02] ${
              email && !isValidEmail ? 'border-red-500' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-yega-silver font-medium">
            Crear contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-subtle transition-smooth focus:shadow-button focus:scale-[1.02]"
          />
          <div className="pt-2 text-xs space-y-1.5">
            <div className={`flex items-center transition-colors ${hasMinLength ? 'text-green-500' : 'text-muted-foreground'}`}>
              <Check className={`h-3 w-3 mr-2 ${hasMinLength ? 'opacity-100' : 'opacity-50'}`} />
              Mínimo 8 caracteres
            </div>
            <div className={`flex items-center transition-colors ${hasUppercase ? 'text-green-500' : 'text-muted-foreground'}`}>
              <Check className={`h-3 w-3 mr-2 ${hasUppercase ? 'opacity-100' : 'opacity-50'}`} />
              Al menos 1 mayúscula
            </div>
            <div className={`flex items-center transition-colors ${hasNumber ? 'text-green-500' : 'text-muted-foreground'}`}>
              <Check className={`h-3 w-3 mr-2 ${hasNumber ? 'opacity-100' : 'opacity-50'}`} />
              Al menos 1 número
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            className="border-muted-foreground mt-0.5"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            Acepto los{" "}
            <span className="text-yega-silver font-medium hover:text-foreground cursor-pointer">
              Términos y Condiciones
            </span>
          </label>
        </div>

        <Button
          className="w-full h-14 bg-gradient-button text-primary-foreground hover:shadow-floating hover:scale-[1.02] rounded-xl font-semibold text-lg transition-bounce shadow-button"
          onClick={handleRegister}
          disabled={!canSubmit || isLoading}
        >
          {isLoading ? "Creando cuenta..." : "Crear mi cuenta"}
        </Button>

        <div className="text-center pt-4">
          <div className="text-muted-foreground">
            <span className="text-sm">¿Ya tienes cuenta? </span>
            <button
              className="text-yega-silver hover:text-foreground transition-smooth font-semibold"
              onClick={() => navigate('/login')}
            >
              Inicia sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
