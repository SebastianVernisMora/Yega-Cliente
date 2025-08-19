import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, MapPin, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchStores } from "@/lib/mocks";

export const StoresScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  const categories = data?.categories || [];
  const allStores = data?.stores || [];

  const filteredStores = allStores.filter(store => 
    searchQuery === "" || 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full pb-20 bg-gradient-hero">
        {/* Header */}
        <div className="p-6 pt-12 bg-gradient-hero">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Hola, Juan 👋
          </h1>
            <p className="text-muted-foreground mb-8 text-lg">
            ¿Qué se te antoja hoy?
          </p>
          </div>

          {/* Search */}
          <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Buscar tiendas o productos…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-card border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl shadow-card transition-smooth focus:shadow-floating focus:scale-[1.02]"
            />
          </div>

          {/* Categories */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-6 tracking-tight">Categorías</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="bg-gradient-card border-border p-5 text-center rounded-2xl shadow-card">
                  <Skeleton className="w-14 h-14 rounded-2xl mx-auto mb-3" />
                  <Skeleton className="h-4 w-20 mx-auto mb-2" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </Card>
              ))
            ) : (
              categories.map((category, index) => (
                <Card 
                  key={index} 
                  className="bg-gradient-card border-border p-5 text-center hover:shadow-floating hover:scale-105 transition-bounce cursor-pointer rounded-2xl shadow-card"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-subtle`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <p className="text-sm font-semibold mb-1">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count}</p>
                </Card>
              ))
            )}
            </div>
          </div>
        </div>

        {/* Featured Stores */}
        <div className="px-6">
          <h2 className="text-xl font-semibold mb-6 tracking-tight animate-fade-in-up">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Tiendas destacadas"}
          </h2>
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="bg-gradient-card border-border p-5 rounded-2xl shadow-card">
                  <div className="flex space-x-5">
                    <Skeleton className="w-18 h-18 rounded-2xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                </Card>
              ))
            ) : isError ? (
              <div className="text-center py-12 text-red-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">Error al cargar las tiendas.</p>
                <p className="text-sm">Inténtalo de nuevo más tarde.</p>
              </div>
            ) : (
              <>
                {filteredStores.map((store) => (
                  <Card 
                    key={store.id} 
                    className="bg-gradient-card border-border p-5 hover:shadow-floating hover:scale-[1.02] transition-bounce cursor-pointer rounded-2xl shadow-card"
                    onClick={() => navigate(`/tiendas/${store.id}`)}
                  >
                    <div className="flex space-x-5">
                      <div className="w-18 h-18 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center shadow-subtle">
                        <span className="text-4xl">{store.image}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{store.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">{store.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 font-medium">{store.type}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{store.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{store.distance}</span>
                          </div>
                          <span className="font-semibold text-green-500">{store.delivery}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {filteredStores.length === 0 && (
                  <div className="text-center py-12 animate-fade-in-scale">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {searchQuery ? `No se encontraron resultados para "${searchQuery}"` : "No hay tiendas disponibles."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
  );
};
