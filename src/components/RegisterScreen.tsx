import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterScreen = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = hasMinLength && hasUppercase && hasNumber && isValidEmail && firstName && lastName && termsAccepted;
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
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-yega-silver">
              Nombre(s)
            </Label>
            <Input
              id="firstName"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-yega-silver">
              Apellidos
            </Label>
            <Input
              id="lastName"
              placeholder="Pérez García"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-yega-silver">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-input border-border text-foreground placeholder:text-muted-foreground h-12 ${
                email && !isValidEmail ? 'border-red-500' : email && isValidEmail ? 'border-green-500' : ''
              }`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-yega-silver">
              Crear contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
            />
            <div className="text-xs space-y-1">
              <div className={`flex items-center space-x-2 ${hasMinLength ? 'text-green-500' : 'text-muted-foreground'}`}>
                {hasMinLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>Mínimo 8 caracteres</span>
              </div>
              <div className={`flex items-center space-x-2 ${hasUppercase ? 'text-green-500' : 'text-muted-foreground'}`}>
                {hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>Al menos 1 mayúscula</span>
              </div>
              <div className={`flex items-center space-x-2 ${hasNumber ? 'text-green-500' : 'text-muted-foreground'}`}>
                {hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>Al menos 1 número</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="border-border data-[state=checked]:bg-primary" 
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Acepto los{" "}
              <span className="text-yega-silver hover:text-foreground cursor-pointer">
                Términos y Condiciones
              </span>
            </label>
          </div>

          <Button 
            className={`w-full h-12 shadow-button transition-smooth ${
              canSubmit 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            onClick={() => canSubmit && navigate('/tiendas')}
            disabled={!canSubmit}
          >
            Registrarme
          </Button>
        </div>
      </div>
  );
};
