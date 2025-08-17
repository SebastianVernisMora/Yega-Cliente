# 📌 Yega-Cliente – Issues Sprint 1

## Issues

- [ ] **Implementar Login (`LoginScreen`)**  
  Conectar formulario a API mock (`/auth/login`). Guardar token falso en contexto/localStorage.

- [ ] **Implementar Registro (`RegisterScreen`)**  
  Crear pantalla según maqueta. Validar contraseña (mín. 8 caracteres, 1 mayúscula, 1 número).

- [ ] **Dashboard con Tiendas (`DashboardScreen`)**  
  Consumir `GET /tiendas`. Mostrar categorías y tiendas destacadas.

- [ ] **Detalle de Tienda (`StoreDetailScreen`)**  
  Consumir `GET /productos/:idTienda`. Mostrar productos con botón `[+]` para agregar al carrito.

- [ ] **Carrito y Checkout (`CartScreen`)**  
  Mostrar resumen de pedido. Simular “Confirmar” → llamada a `/pedidos`.

- [ ] **Confirmación de Pedido (`OrderSuccessScreen`)**  
  Pantalla de feedback con opción de “Rastrear Pedido” o “Volver al inicio”.
