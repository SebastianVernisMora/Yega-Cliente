import { Logo } from "@/components/ui/logo";
import { MobileLayout } from "./MobileLayout";
import { useEffect } from "react";

interface LoadingScreenProps {
  onNavigate: (screen: string) => void;
  nextScreen: string;
  message?: string;
}

export const LoadingScreen = ({ onNavigate, nextScreen, message = "Procesando..." }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate(nextScreen);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate, nextScreen]);

  return (
    <div className="flex flex-col justify-center items-center min-h-full p-6 bg-gradient-hero">
        {/* Logo with animation */}
        <div className="mb-8 animate-pulse">
          <h1 className="yega-logo-text animate-float animate-pulse-glow text-center">
            YEGA
          </h1>
        </div>

        {/* Loading message */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">{message}</h2>
          
          {/* Loading dots animation */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
  );
};