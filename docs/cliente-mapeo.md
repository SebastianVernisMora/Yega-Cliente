# Mapeo de Vistas a API

Este documento mapea las vistas y acciones de la aplicación del cliente a los `operationId` y `path` correspondientes del API (OpenAPI v0.1).

| Vista / Componente           | Acción del Usuario                | `operationId`    | Método y Path              | Descripción                                      |
|------------------------------|-----------------------------------|------------------|----------------------------|--------------------------------------------------|
| `/login` (`LoginScreen.tsx`) | Enviar formulario de login        | `authLogin`      | `POST /auth/login`         | Autentica a un usuario y retorna un token.       |
| `/registro` (`RegisterScreen.tsx`) | Enviar formulario de registro   | `authRegister`   | `POST /auth/register`      | Registra un nuevo usuario.                       |
| `/tiendas` (`DashboardScreen.tsx`) | Cargar lista de tiendas         | `catalogList`    | `GET /catalogs`            | Obtiene la lista de tiendas/catálogos disp.      |
| `/tiendas/:id` (`StoreDetailScreen.tsx`)| Ver detalle de tienda/catálogo | `catalogList`    | `GET /catalogs/{id}`       | Obtiene el catálogo de una tienda específica.    |
| `/carrito` (`CartScreen.tsx`)| Realizar pedido                   | `ordersCreate`   | `POST /orders`             | Crea un nuevo pedido con los items del carrito.  |
| `/pedido/confirmacion` (`ConfirmationScreen.tsx`)| Ver confirmación de pedido      | `ordersGetById`  | `GET /orders/{id}`         | Obtiene los detalles de un pedido ya creado.     |
| `/historial` (`OrderHistoryScreen.tsx`)| Ver historial de pedidos        | `ordersGetById`  | `GET /orders`              | Obtiene la lista de pedidos del usuario.         |
