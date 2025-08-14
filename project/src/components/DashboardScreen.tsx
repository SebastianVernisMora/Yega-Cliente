import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Star, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { MobileLayout } from "./MobileLayout";
import { useState } from "react";

export const DashboardScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    { icon: "🍔", name: "Restaurantes", color: "bg-gradient-to-br from-slate-200 to-slate-300", count: "120+ lugares" },
    { icon: "🛒", name: "Super", color: "bg-gradient-to-br from-slate-100 to-slate-200", count: "45+ tiendas" },
    { icon: "💊", name: "Farmacia", color: "bg-gradient-to-br from-slate-300 to-slate-400", count: "28+ farmacias" }
  ];

  const allStores = [
    {
      id: 1,
      name: "Tacos El Güero",
      type: "Mexicana",
      time: "25-30 min",
      rating: 4.8,
      delivery: "Gratis",
      image: "🌮",
      distance: "1.2 km",
      category: "restaurante"
    },
    {
      id: 2,
      name: "Pizza Corner",
      type: "Italiana",
      time: "30-40 min",
      rating: 4.6,
      delivery: "$25",
      image: "🍕",
      distance: "0.8 km",
      category: "restaurante"
    },
    {
      id: 3,
      name: "Sushi Zen",
      type: "Japonesa",
      time: "40-50 min",
      rating: 4.9,
      delivery: "$30",
      image: "🍣",
      distance: "2.1 km",
      category: "restaurante"
    },
    {
      id: 4,
      name: "SuperMart 24/7",
      type: "Supermercado",
      time: "15-25 min",
      rating: 4.5,
      delivery: "$15",
      image: "🛒",
      distance: "0.5 km",
      category: "super"
    },
    {
      id: 5,
      name: "Farmacia Salud+",
      type: "Farmacia",
      time: "10-20 min",
      rating: 4.7,
      delivery: "Gratis",
      image: "💊",
      distance: "0.3 km",
      category: "farmacia"
    }
  ];

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
            {categories.map((category, index) => (
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
            ))}
            </div>
          </div>
        </div>

        {/* Featured Stores */}
        <div className="px-6">
          <h2 className="text-xl font-semibold mb-6 tracking-tight animate-fade-in-up">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Tiendas destacadas"}
          </h2>
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {filteredStores.map((store) => (
              <Card 
                key={store.id} 
                className="bg-gradient-card border-border p-5 hover:shadow-floating hover:scale-[1.02] transition-bounce cursor-pointer rounded-2xl shadow-card"
                onClick={() => onNavigate('store')}
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
            {filteredStores.length === 0 && searchQuery && (
              <div className="text-center py-12 animate-fade-in-scale">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">No se encontraron resultados para "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};