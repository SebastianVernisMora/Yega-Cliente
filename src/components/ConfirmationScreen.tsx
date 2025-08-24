import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Order } from "@/types";
import { useEffect } from "react";

export const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order as Order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

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
            <p className="text-2xl font-bold text-primary">{order.id}</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tiempo estimado:</span>
              <span className="font-medium">{order.estimatedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dirección:</span>
              <span className="font-medium">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total pagado:</span>
              <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <Button 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button transition-smooth"
            onClick={() => navigate(`/seguimiento/${order.id}`)}
          >
            Rastrear mi pedido
          </Button>
          
          <Button 
            variant="outline"
            className="w-full h-12 border-border text-foreground hover:bg-accent"
            onClick={() => navigate('/tiendas')}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
  );
};
