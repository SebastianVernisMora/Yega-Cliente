import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

export const CartScreen = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, subtotal, shippingCost, total, clearCart } = useCartContext();
  const { toast } = useToast();

  const [tipPercentage, setTipPercentage] = useState(10);
  const [customTip, setCustomTip] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const tipAmount = customTip ? parseFloat(customTip) || 0 : (subtotal * tipPercentage / 100);
  const finalTotal = total + tipAmount;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Simulación de llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "¡Pedido realizado!",
        description: "Tu pedido ha sido confirmado y está en camino.",
      });
      
      clearCart();
      navigate('/pedido/exito');

    } catch (error) {
      toast({
        title: "Error en el pedido",
        description: "No se pudo procesar tu pedido. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-center p-6 bg-gradient-hero">
        <div className="flex items-center p-6 pt-12 w-full">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-foreground hover:bg-accent/50 rounded-xl">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <ShoppingCart className="w-24 h-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-2">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">Añade productos para verlos aquí.</p>
          <Button onClick={() => navigate('/tiendas')} className="h-12 px-8 rounded-xl text-lg">
            Ver tiendas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gradient-hero">
        {/* Header */}
        <div className="flex items-center p-6 pt-12 bg-gradient-hero">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="text-foreground hover:bg-accent/50 rounded-xl transition-bounce"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold ml-4 tracking-tight">Tu carrito</h1>
        </div>

        <div className="flex-1 px-6 animate-fade-in-up">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <Card key={item.id} className="bg-gradient-card border-border p-5 shadow-card rounded-2xl hover:shadow-floating transition-smooth">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-lg">{item.name}</h3>
                    <p className="font-bold text-lg text-primary">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl transition-bounce hover:scale-110"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-semibold text-lg">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl transition-bounce hover:scale-110"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Tip Selection */}
          <Card className="bg-gradient-card border-border p-6 mb-8 shadow-card rounded-2xl">
            <h3 className="font-semibold mb-6 text-lg">Propina para el repartidor</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[10, 15, 20].map((percentage) => (
                <Button
                  key={percentage}
                  variant={tipPercentage === percentage ? "default" : "outline"}
                  className={`h-12 rounded-xl font-semibold transition-bounce ${
                    tipPercentage === percentage ? 'shadow-button scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => {
                    setTipPercentage(percentage);
                    setCustomTip("");
                  }}
                >
                  {percentage}%
                </Button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Otro monto"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value);
                setTipPercentage(0);
              }}
              className="w-full h-12 px-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground transition-smooth focus:shadow-button focus:scale-[1.02]"
            />
          </Card>

          {/* Order Summary */}
          <Card className="bg-gradient-card border-border p-6 mb-8 shadow-card rounded-2xl">
            <h3 className="font-semibold mb-6 text-lg">Resumen del pedido</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Envío</span>
                <span className="font-semibold">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Propina</span>
                <span className="font-semibold">${tipAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Checkout Button */}
        <div className="p-6 bg-gradient-hero">
          <Button 
            className="w-full h-16 bg-gradient-button text-primary-foreground hover:shadow-floating hover:scale-[1.02] rounded-2xl font-semibold text-lg transition-bounce shadow-button"
            onClick={handleCheckout}
            disabled={cart.length === 0 || isCheckingOut}
          >
            {isCheckingOut ? "Procesando..." : "Confirmar y pagar"}
          </Button>
        </div>
      </div>
  );
};
