import { ArrowLeft, User, MapPin, CreditCard, Bell, Shield, LogOut, Edit, Plus, Moon, Sun } from 'lucide-react';
import { MobileLayout } from './MobileLayout';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ProfileScreen = ({ onNavigate, isDarkMode, onToggleTheme }: ProfileScreenProps) => {
  const user = {
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    phone: '+57 310 123 4567',
    avatar: null,
    memberSince: '2023'
  };

  const addresses = [
    {
      id: 1,
      label: 'Casa',
      address: 'Cra 15 #123-45, Apartamento 301',
      city: 'Bogotá',
      isDefault: true
    },
    {
      id: 2,
      label: 'Trabajo',
      address: 'Av. El Dorado #68-15, Piso 10',
      city: 'Bogotá',
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      lastFour: '4532',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      lastFour: '8901',
      brand: 'Mastercard',
      isDefault: false
    }
  ];

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
            <h1 className="text-lg font-semibold text-foreground">Mi Perfil</h1>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6">
          {/* User Info */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">Miembro desde {user.memberSince}</p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center bg-card border-border">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Pedidos</p>
            </Card>
            <Card className="p-4 text-center bg-card border-border">
              <p className="text-2xl font-bold text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </Card>
            <Card className="p-4 text-center bg-card border-border">
              <p className="text-2xl font-bold text-foreground">$150K</p>
              <p className="text-sm text-muted-foreground">Ahorrado</p>
            </Card>
          </div>

          {/* Addresses */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Direcciones</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>
            {addresses.map((address) => (
              <Card key={address.id} className="p-4 bg-card border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{address.label}</span>
                      {address.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          Predeterminada
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-6">
                      {address.address}, {address.city}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Métodos de pago</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {method.brand} •••• {method.lastFour}
                      </p>
                      {method.isDefault && (
                        <span className="text-xs text-primary">Predeterminada</span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Settings */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Configuración</h3>
            
            {/* Theme Toggle */}
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Sun className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">Tema</p>
                    <p className="text-sm text-muted-foreground">
                      {isDarkMode ? 'Modo oscuro' : 'Modo claro'}
                    </p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
              </div>
            </Card>
            
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Notificaciones</p>
                    <p className="text-sm text-muted-foreground">Pedidos y promociones</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>

            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Privacidad y seguridad</p>
                  <p className="text-sm text-muted-foreground">Gestionar datos personales</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Información personal</p>
                  <p className="text-sm text-muted-foreground">Editar perfil</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Logout */}
          <Card className="p-4 bg-card border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => onNavigate('login')}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar sesión
            </Button>
          </Card>
        </div>
      </div>
  );
};