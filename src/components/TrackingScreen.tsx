import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, CheckCircle, Package, Truck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useParams } from 'react-router-dom';

export const TrackingScreen = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [deliveryStep, setDeliveryStep] = useState(0);
  const [driverPosition, setDriverPosition] = useState({ x: 20, y: 80 });
  const [estimatedTime, setEstimatedTime] = useState(25);

  const deliverySteps = [
    { status: 'Pedido confirmado', time: '14:30', completed: true },
    { status: 'Preparando tu pedido', time: '14:35', completed: true },
    { status: 'En camino hacia ti', time: '14:45', completed: deliveryStep >= 2 },
    { status: 'Entregado', time: '15:10', completed: deliveryStep >= 3 }
  ];

  const driver = {
    name: 'Carlos Rodríguez',
    phone: '+57 310 456 7890',
    rating: 4.9,
    vehicle: 'Moto Honda CB 125',
    photo: null
  };

  // Simular movimiento del repartidor
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition(prev => {
        const newX = Math.min(prev.x + 2, 80);
        const newY = Math.max(prev.y - 1.5, 20);
        return { x: newX, y: newY };
      });

      setEstimatedTime(prev => Math.max(prev - 1, 2));

      // Avanzar estados de entrega
      if (driverPosition.x > 40 && deliveryStep < 2) {
        setDeliveryStep(2);
      }
      if (driverPosition.x > 75 && deliveryStep < 3) {
        setDeliveryStep(3);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [driverPosition.x, deliveryStep]);

  return (
    <div className="flex flex-col min-h-full bg-gradient-hero">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Rastrear Pedido</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-4">
          {/* Order Info */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-foreground">Pedido #{orderId}</CardTitle>
                <span className="text-sm text-green-500 font-medium">
                  {deliveryStep >= 3 ? 'Entregado' : 'En camino'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Tiempo estimado: {estimatedTime} min
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Mapa simulado */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="relative h-64 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 overflow-hidden rounded-lg">
                {/* Calles simuladas */}
                <div className="absolute inset-0">
                  <div className="absolute top-16 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-32 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-48 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-0 bottom-0 left-16 w-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-0 bottom-0 left-32 w-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-0 bottom-0 left-48 w-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-0 bottom-0 left-64 w-1 bg-gray-300 dark:bg-gray-600"></div>
                </div>

                {/* Ruta del repartidor */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 20,80 Q 40,60 60,40 Q 70,30 80,20"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="2,1"
                    className="opacity-60"
                  />
                </svg>

                {/* Ubicación del restaurante */}
                <div className="absolute" style={{ left: '20%', top: '80%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Package className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                    Restaurante
                  </div>
                </div>

                {/* Ubicación del cliente */}
                <div className="absolute" style={{ left: '80%', top: '20%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                    Tu ubicación
                  </div>
                </div>

                {/* Repartidor (animado) */}
                <div 
                  className="absolute transition-all duration-3000 ease-linear"
                  style={{ 
                    left: `${driverPosition.x}%`, 
                    top: `${driverPosition.y}%`, 
                    transform: 'translate(-50%, -50%)' 
                  }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Truck className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-foreground font-medium whitespace-nowrap">
                    {driver.name.split(' ')[0]}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Tu Repartidor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={driver.photo || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{driver.name}</p>
                    <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-muted-foreground">{driver.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="w-10 h-10">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-10 h-10">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Estado del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliverySteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <div className="w-2 h-2 bg-current rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3 pb-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/historial')}
            >
              Ver Historial de Pedidos
            </Button>
            <Button 
              variant="default"
              className="w-full"
              onClick={() => navigate('/tiendas')}
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
  );
};
