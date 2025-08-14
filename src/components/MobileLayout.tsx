import { ReactNode } from 'react';
import { Logo } from './ui/logo';
import { ShoppingBag, User } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  onNavigate?: (screen: string) => void;
  currentScreen?: string;
}

export const MobileLayout = ({ children, showBottomNav = false, onNavigate, currentScreen }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      <div className="max-w-sm mx-auto min-h-screen relative bg-gradient-card shadow-floating">
        {children}
        {showBottomNav && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-floating">
            <div className="flex justify-around py-4 px-2">
              <button 
                className="flex flex-col items-center space-y-2 p-2 rounded-xl transition-bounce hover:bg-accent/50"
                onClick={() => onNavigate?.('dashboard')}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-smooth ${
                  currentScreen === 'dashboard' ? 'bg-primary text-primary-foreground shadow-button' : 'bg-transparent'
                }`}>
                  <Logo variant="miniature" size="sm" className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium transition-smooth ${
                  currentScreen === 'dashboard' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  Inicio
                </span>
              </button>
              <button 
                className="flex flex-col items-center space-y-2 p-2 rounded-xl transition-bounce hover:bg-accent/50"
                onClick={() => onNavigate?.('orders')}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-smooth ${
                  currentScreen === 'orders' ? 'bg-primary text-primary-foreground shadow-button' : 'bg-transparent'
                }`}>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium transition-smooth ${
                  currentScreen === 'orders' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  Pedidos
                </span>
              </button>
              <button 
                className="flex flex-col items-center space-y-2 p-2 rounded-xl transition-bounce hover:bg-accent/50"
                onClick={() => onNavigate?.('profile')}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-smooth ${
                  currentScreen === 'profile' ? 'bg-primary text-primary-foreground shadow-button' : 'bg-transparent'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium transition-smooth ${
                  currentScreen === 'profile' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  Perfil
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};