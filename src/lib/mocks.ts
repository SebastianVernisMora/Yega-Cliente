
export const categoriesMock = [
  { icon: "🍔", name: "Restaurantes", color: "bg-gradient-to-br from-slate-200 to-slate-300", count: "120+ lugares" },
  { icon: "🛒", name: "Super", color: "bg-gradient-to-br from-slate-100 to-slate-200", count: "45+ tiendas" },
  { icon: "💊", name: "Farmacia", color: "bg-gradient-to-br from-slate-300 to-slate-400", count: "28+ farmacias" }
];

export const storesMock = [
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

const productsMock = {
  1: { // Tacos El Güero
    Tacos: [
      { id: 1, name: "Taco de Pastor", price: 18, description: "Con piña y cebolla" },
      { id: 2, name: "Taco de Carnitas", price: 20, description: "Carne suave y jugosa" },
      { id: 3, name: "Taco de Pollo", price: 16, description: "Pollo marinado con especias" }
    ],
    Bebidas: [
      { id: 4, name: "Coca Cola 600ml", price: 25, description: "Refresco frío" },
      { id: 5, name: "Agua Natural", price: 15, description: "Botella 500ml" },
      { id: 6, name: "Horchata", price: 30, description: "Bebida tradicional" }
    ],
    Postres: [
      { id: 7, name: "Flan Napolitano", price: 35, description: "Postre cremoso" },
      { id: 8, name: "Churros", price: 40, description: "Con azúcar y canela" }
    ]
  },
  // Añadir más productos para otras tiendas si es necesario
};

// Simulación de la función de fetch para todas las tiendas
export const fetchStores = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ categories: categoriesMock, stores: storesMock });
    }, 1000);
  });
};

// Simulación de la función de fetch para el detalle de una tienda
export const fetchStoreDetails = (storeId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const store = storesMock.find(s => s.id === parseInt(storeId));
      if (store) {
        resolve({ ...store, products: productsMock[store.id] || {} });
      } else {
        reject(new Error("Store not found"));
      }
    }, 800);
  });
};
