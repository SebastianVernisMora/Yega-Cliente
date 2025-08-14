import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { MobileLayout } from "./MobileLayout";

export const StoreDetailScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const products = {
    tacos: [
      { id: 1, name: "Taco de Pastor", price: 18, description: "Con piña y cebolla" },
      { id: 2, name: "Taco de Carnitas", price: 20, description: "Carne suave y jugosa" },
      { id: 3, name: "Taco de Pollo", price: 16, description: "Pollo marinado con especias" }
    ],
    bebidas: [
      { id: 4, name: "Coca Cola 600ml", price: 25, description: "Refresco frío" },
      { id: 5, name: "Agua Natural", price: 15, description: "Botella 500ml" },
      { id: 6, name: "Horchata", price: 30, description: "Bebida tradicional" }
    ],
    postres: [
      { id: 7, name: "Flan Napolitano", price: 35, description: "Postre cremoso" },
      { id: 8, name: "Churros", price: 40, description: "Con azúcar y canela" }
    ]
  };

  return (
    <div className="flex flex-col min-h-full pb-20 bg-gradient-hero">
        {/* Header with Store Image */}
        <div className="relative h-48 bg-gradient-to-b from-muted to-background">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('dashboard')}
            className="absolute top-4 left-4 z-10 text-foreground hover:bg-background/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-center text-6xl mb-2">🌮</div>
          </div>
        </div>

        {/* Store Info */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Tacos El Güero</h1>
          <p className="text-muted-foreground mb-4">Comida Mexicana</p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-medium">4.8</span>
              <span className="text-muted-foreground">(234 reseñas)</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Envío</p>
              <p className="font-medium text-green-500">Gratis</p>
            </div>
          </div>

          {/* Menu Tabs */}
          <Tabs defaultValue="tacos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="tacos" className="data-[state=active]:bg-background">Tacos</TabsTrigger>
              <TabsTrigger value="bebidas" className="data-[state=active]:bg-background">Bebidas</TabsTrigger>
              <TabsTrigger value="postres" className="data-[state=active]:bg-background">Postres</TabsTrigger>
            </TabsList>

            <TabsContent value="tacos" className="mt-6 space-y-4">
              {products.tacos.map((product) => (
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
                      onClick={() => onNavigate('cart')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="bebidas" className="mt-6 space-y-4">
              {products.bebidas.map((product) => (
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
                      onClick={() => onNavigate('cart')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="postres" className="mt-6 space-y-4">
              {products.postres.map((product) => (
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
                      onClick={() => onNavigate('cart')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};