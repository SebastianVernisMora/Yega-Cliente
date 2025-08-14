interface LogoProps {
  variant?: 'default' | 'miniature' | 'white' | 'black';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo = ({ 
  variant = 'default', 
  size = 'md', 
  className = '' 
}: LogoProps) => {
  const sizeClasses = {
    sm: 'w-16 h-auto',
    md: 'w-32 h-auto', 
    lg: 'w-48 h-auto',
    xl: 'w-64 h-auto'
  };

  const getLogoSrc = () => {
    switch (variant) {
      case 'miniature':
        return '/public/YEGA-DARK-1.svg'; // Logo blanco sobre fondo negro
      case 'white':
        return '/public/YEGA-LIGHT.svg'; // Letras negras sin fondo 
      case 'black':
        return '/public/YEGA-DARK.svg'; // Logo negro transparente
      case 'default':
      default:
        // En modo claro usar logo negro, en modo oscuro usar logo blanco
        return '/public/YEGA-LIGHT-1.png'; // Logo negro para modo claro
    }
  };

  return (
    <img 
      src={getLogoSrc()}
      alt="YEGA" 
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};