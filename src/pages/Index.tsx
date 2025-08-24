import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuthContext();
  
  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

export default Index;
