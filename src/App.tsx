import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { StoresScreen } from "./components/StoresScreen";
import { StoreDetailScreen } from "./components/StoreDetailScreen";
import { CartScreen } from "./components/CartScreen";
import { ConfirmationScreen } from "./components/ConfirmationScreen";
import { TrackingScreen } from "./components/TrackingScreen";
import { OrderHistoryScreen } from "./components/OrderHistoryScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/registro" element={<RegisterScreen />} />
          <Route path="/tiendas" element={<StoresScreen />} />
          <Route path="/tiendas/:id" element={<StoreDetailScreen />} />
          <Route path="/carrito" element={<CartScreen />} />
          <Route path="/pedido/confirmacion" element={<ConfirmationScreen />} />
          <Route path="/seguimiento/:id" element={<TrackingScreen />} />
          <Route path="/historial" element={<OrderHistoryScreen />} />
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;