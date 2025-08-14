import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { MobileLayout } from "./MobileLayout";
import { useState } from "react";

export const CartScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const [tip, setTip] = useState(10);
  const [customTip, setCustomTip] = useState("");
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Taco de Pastor", price: 18, quantity: 2 },
    { id: 2, name: "Taco de Carnitas", price: 20, quantity: 1 },
    { id: 3, name: "Coca Cola 600ml", price: 25, quantity: 1 }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 25;
  const tipAmount = customTip ? parseFloat(customTip) || 0 : (subtotal * tip / 100);
  const total = subtotal + shipping + tipAmount;

  return (
    <div className="flex flex-col min-h-full bg-gradient-hero">
        {/* Header */}
        <div className="flex items-center p-6 pt-12 bg-gradient-hero">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('store')}
            className="text-foreground hover:bg-accent/50 rounded-xl transition-bounce"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold ml-4 tracking-tight">Tu carrito</h1>
        </div>

        <div className="flex-1 px-6 animate-fade-in-up">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
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
                      onClick={() => {
                        if (item.quantity === 1) {
                          removeItem(item.id);
                        } else {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
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
                  variant={tip === percentage ? "default" : "outline"}
                  className={`h-12 rounded-xl font-semibold transition-bounce ${
                    tip === percentage ? 'shadow-button scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => {
                    setTip(percentage);
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
                setTip(0);
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
                <span className="font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Envío</span>
                <span className="font-semibold">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Propina</span>
                <span className="font-semibold">${tipAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Checkout Button */}
        <div className="p-6 bg-gradient-hero">
          <Button 
            className="w-full h-16 bg-gradient-button text-primary-foreground hover:shadow-floating hover:scale-[1.02] rounded-2xl font-semibold text-lg transition-bounce shadow-button"
            onClick={() => onNavigate('loading-payment')}
            disabled={cartItems.length === 0}
          >
            Confirmar y pagar
          </Button>
        </div>
      </div>
  );
};