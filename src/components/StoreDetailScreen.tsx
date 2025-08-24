import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star, Plus, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreDetails } from "@/lib/mocks";
import { useCartContext } from "@/context/CartContext";

export const StoreDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCartContext();

  const { data: store, isLoading, isError } = useQuery({
    queryKey: ["store", id],
    queryFn: () => fetchStoreDetails(id),
    enabled: !!id, // Solo ejecuta la query si el id existe
  });

  const productCategories = store?.products ? Object.keys(store.products) : [];

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full pb-20 bg-gradient-hero">
        <div className="relative h-48 bg-gradient-to-b from-muted to-background">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2 mb-4" />
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="grid w-full grid-cols-3 gap-2 bg-muted p-1 rounded-lg mb-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-red-500 bg-gradient-hero">
        <AlertCircle className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold">Error al cargar la tienda</h1>
        <p>No pudimos encontrar los detalles. Inténtalo de nuevo.</p>
        <Button onClick={() => navigate('/tiendas')} className="mt-6">Volver a tiendas</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-20 bg-gradient-hero">
        {/* Header with Store Image */}
        <div className="relative h-48 bg-gradient-to-b from-muted to-background">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/tiendas')}
            className="absolute top-4 left-4 z-10 text-white bg-black/20 hover:bg-black/50 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <img
            src={`https://placehold.co/600x400/EEE/31343C?text=${store.image}`}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-3xl font-bold text-white text-center">{store.name}</h1>
          </div>
        </div>

        {/* Store Info */}
        <div className="p-4 transform -translate-y-8 bg-gradient-hero rounded-t-2xl">
          <p className="text-muted-foreground mb-4 text-center">{store.type}</p>
          
          <div className="flex items-center justify-around mb-6 text-center">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-medium">{store.rating}</span>
              <span className="text-muted-foreground">(234 reseñas)</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Envío</p>
              <p className="font-medium text-green-500">{store.delivery}</p>
            </div>
          </div>

          {/* Menu Tabs */}
          <Tabs defaultValue={productCategories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              {productCategories.map(category => (
                <TabsTrigger key={category} value={category} className="data-[state=active]:bg-background">{category}</TabsTrigger>
              ))}
            </TabsList>

            {productCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-6 space-y-4">
                {store.products[category].map((product) => (
                  <Card key={product.id} className="bg-card border-border p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        <p className="font-bold text-lg">${product.price}</p>
                      </div>
                      <Button 
                        size="icon" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 ml-4"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
  );
};
