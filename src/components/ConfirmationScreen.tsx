import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { MobileLayout } from "./MobileLayout";

export const ConfirmationScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-full p-6 bg-gradient-hero">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            ¡Tu pedido ha sido confirmado!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            La tienda ya está preparando tu orden.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="bg-card border-border p-6 w-full mb-8">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Número de pedido</h3>
            <p className="text-2xl font-bold text-primary">#YG-2024-001</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tiempo estimado:</span>
              <span className="font-medium">25-30 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dirección:</span>
              <span className="font-medium">Av. Principal #123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total pagado:</span>
              <span className="font-bold text-lg">$113.00</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <Button 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button transition-smooth"
            onClick={() => onNavigate('tracking')}
          >
            Rastrear mi pedido
          </Button>
          
          <Button 
            variant="outline"
            className="w-full h-12 border-border text-foreground hover:bg-accent"
            onClick={() => onNavigate('dashboard')}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
  );
};