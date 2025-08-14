import { Navigate } from "react-router-dom";

const Index = () => {
  // TODO: Add logic to check for authentication
  // If authenticated, redirect to "/tiendas"
  // Otherwise, redirect to "/login"
  return <Navigate to="/login" replace />;
};

export default Index;