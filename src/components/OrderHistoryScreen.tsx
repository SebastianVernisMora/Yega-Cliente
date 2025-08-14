import { ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { MobileLayout } from './MobileLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface OrderHistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export const OrderHistoryScreen = ({ onNavigate }: OrderHistoryScreenProps) => {
  const orders = [
    {
      id: '#YEG001',
      date: '2024-01-15',
      store: 'Supermercado Central',
      address: 'Calle 123, Ciudad',
      total: 89250,
      status: 'entregado',
      items: ['2x Leche entera', '1x Pan integral', '3x Manzanas'],
      deliveryTime: '25 min',
      rating: 5
    },
    {
      id: '#YEG002', 
      date: '2024-01-12',
      store: 'Farmacia Plus',
      address: 'Av. Principal 456',
      total: 45800,
      status: 'entregado',
      items: ['1x Shampoo', '2x Cepillo dental', '1x Vitaminas'],
      deliveryTime: '18 min',
      rating: 4
    },
    {
      id: '#YEG003',
      date: '2024-01-10', 
      store: 'Tienda Gourmet',
      address: 'Plaza Centro, Local 12',
      total: 156300,
      status: 'cancelado',
      items: ['1x Vino tinto', '2x Queso importado', '1x Aceitunas'],
      deliveryTime: '40 min',
      rating: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelado': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'en_camino': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-full pb-20 bg-gradient-hero">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Mis Pedidos</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-4 bg-card border-border">
              <div className="space-y-3">
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === 'entregado' ? 'Entregado' : 
                     order.status === 'cancelado' ? 'Cancelado' : 'En camino'}
                  </Badge>
                </div>

                {/* Store Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{order.store}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{order.address}</p>
                </div>

                {/* Items */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground mb-2">Productos:</p>
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-muted-foreground">• {item}</p>
                  ))}
                </div>

                {/* Order Details */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{order.deliveryTime}</span>
                    </div>
                    {order.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">{order.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-foreground">{formatCurrency(order.total)}</p>
                </div>

                {/* Actions */}
                {order.status === 'entregado' && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onNavigate('tracking')}
                    >
                      Rastrear
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Volver a pedir
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Sin pedidos aún</h3>
              <p className="text-muted-foreground mb-6">¡Haz tu primer pedido y aparecerá aquí!</p>
              <Button onClick={() => onNavigate('dashboard')}>
                Explorar tiendas
              </Button>
            </div>
          )}
        </div>
      </div>
  );
};