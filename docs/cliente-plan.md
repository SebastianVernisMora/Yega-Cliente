# Plan de UX - Aplicación de Cliente

Este documento detalla el plan de experiencia de usuario (UX) para la aplicación del cliente, cubriendo las rutas de la aplicación, los estados de la interfaz y el manejo de funcionalidades clave como la geolocalización.

## 1. Rutas de la Aplicación

La aplicación contará con las siguientes rutas principales:

- **/login**: Página de inicio de sesión para usuarios existentes.
- **/registro**: Página de registro para nuevos usuarios.
- **/tiendas**: Vista principal que lista las tiendas disponibles.
- **/tiendas/:id**: Vista de detalle para una tienda específica, mostrando su catálogo de productos.
- **/carrito**: Resumen del pedido del usuario con los productos seleccionados.
- **/pedido/confirmacion**: Página mostrada tras realizar un pedido, con el resumen y estado del mismo.

## 2. Manejo de Estados de la Interfaz

La aplicación manejará de forma clara los diferentes estados para proporcionar una experiencia de usuario fluida e informativa.

### Estados Vacíos
- **Lista de tiendas**: Si no hay tiendas disponibles o no se encuentran resultados para una búsqueda, se mostrará un mensaje "No se encontraron tiendas".
- **Carrito**: Si el carrito está vacío, se mostrará "Tu carrito está vacío" con un botón para volver a la lista de tiendas.
- **Historial de pedidos**: Si el usuario no tiene pedidos anteriores, se mostrará un mensaje indicándolo.

### Notificaciones (Toasts)
Se utilizarán notificaciones no intrusivas (toasts) para comunicar el resultado de las operaciones:
- **Éxito**: "Pedido realizado con éxito", "Sesión iniciada correctamente".
- **Error**: "Error al iniciar sesión, verifica tus credenciales".
- **Información**: "Producto añadido al carrito".

### Errores de API (HTTP Status Codes)
- **401 No Autorizado / 403 Prohibido**: Si el usuario intenta acceder a una ruta protegida sin una sesión válida, será redirigido automáticamente a la página de `/login`. Se mostrará un toast informativo: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo."
- **5xx Errores del Servidor**: Ante un error 500 o similar, se mostrará una pantalla de error genérica con el mensaje: "Ocurrió un error inesperado. Nuestro equipo ha sido notificado. Por favor, intenta de nuevo más tarde."

## 3. Geolocalización

La funcionalidad de geolocalización se usará para mostrar las tiendas más cercanas al usuario.

### Solicitud de Permiso
- Al ingresar a la vista de `/tiendas` por primera vez, la aplicación solicitará permiso al usuario para acceder a su ubicación a través del API del navegador.
- Se mostrará un diálogo claro explicando por qué se necesita la ubicación (e.g., "Para mostrarte las tiendas más cercanas").

### Fallback (Plan B)
- **Si el usuario deniega el permiso** o el navegador no soporta la geolocalización, la aplicación ofrecerá un campo de texto para que el usuario ingrese su dirección o código postal manualmente.
- Se guardará esta preferencia para futuras visitas.
