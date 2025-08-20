# Registro de Actividades - Agente IA (Gemini)

**Fecha:** 19 de agosto de 2025
**Proyecto:** Yega-Cliente
**Sprint:** 1

## Objetivo Cumplido

Implementación completa de las funcionalidades clave del front-end definidas en el backlog del Sprint 1, transformando el prototipo estático en una aplicación interactiva basada en estado y datos simulados.

## Resumen de Tareas y Decisiones Técnicas

### 1. Gestión de Estado Global

Para manejar el estado de forma centralizada y escalable, se implementaron dos Contextos de React:

-   **`AuthContext`**:
    -   **Propósito**: Gestionar el estado de autenticación del usuario (token, `isAuthenticated`).
    -   **Funcionalidades**: Expone métodos `login`, `register` y `logout`.
    -   **Persistencia**: Utiliza `localStorage` para mantener la sesión del usuario entre visitas.
    -   **Implementación**: Se creó `src/context/AuthContext.tsx` y se integró en `main.tsx` para proveer el contexto a toda la aplicación.

-   **`CartContext`**:
    -   **Propósito**: Manejar el estado del carrito de compras.
    -   **Funcionalidades**: Expone métodos para `addToCart`, `removeFromCart`, `updateQuantity` y `clearCart`.
    -   **Cálculos Derivados**: Provee valores calculados como `subtotal`, `shippingCost`, `total` y `itemCount` usando `useMemo` para optimizar el rendimiento.
    -   **Implementación**: Se creó `src/context/CartContext.tsx` y se anidó dentro del `AuthProvider` en `main.tsx`.

### 2. Carga de Datos Asíncrona

Para simular un entorno real donde los datos provienen de un backend, se adoptó la siguiente estrategia:

-   **Biblioteca**: Se utilizó `@tanstack/react-query` para gestionar la obtención, cache y estado de los datos asíncronos.
-   **Simulación de API**: Se centralizaron los datos de prueba y las funciones de `fetch` simuladas en `src/lib/mocks.ts`. Estas funciones devuelven promesas con un retardo artificial para simular la latencia de red.
-   **Componentes Refactorizados**:
    -   `StoresScreen.tsx`: Consume `fetchStores` a través del hook `useQuery`. Muestra componentes `Skeleton` durante el estado de carga (`isLoading`) y un mensaje de error en caso de fallo (`isError`).
    -   `StoreDetailScreen.tsx`: Utiliza `useParams` para obtener el ID de la tienda desde la URL y consume `fetchStoreDetails(id)` con `useQuery`. También implementa estados de carga y error.

### 3. Flujo de Autenticación y Compra

-   **Login (`LoginScreen.tsx`)**: Se refactorizó para usar `useAuthContext`. La lógica de la mutación fue reemplazada por la llamada al método `login` del contexto.
-   **Registro (`RegisterScreen.tsx`)**: Se conectó al método `register` del `AuthContext`, implementando notificaciones (`toasts`) para dar feedback al usuario sobre el resultado de la operación.
-   **Añadir a Carrito (`StoreDetailScreen.tsx`)**: El botón `[+]` ahora invoca la función `addToCart` del `CartContext`, añadiendo el producto seleccionado al estado global del carrito.
-   **Carrito y Checkout (`CartScreen.tsx`)**:
    -   Se refactorizó completamente para leer y modificar el estado del `CartContext`.
    -   Se implementó una vista para el estado de "carrito vacío".
    -   El botón "Confirmar y pagar" ahora ejecuta una función `handleCheckout` que simula una llamada a la API, gestiona un estado de carga local (`isCheckingOut`), limpia el carrito con `clearCart()` y redirige a la pantalla de confirmación.

## Conclusión

El front-end de `Yega-Cliente` es ahora una aplicación funcional y reactiva, con un manejo de estado robusto y preparada para la futura integración con una API real. Todas las tareas del Sprint 1 han sido completadas satisfactoriamente.
