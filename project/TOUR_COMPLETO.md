# YEGA - Guía de Recorrido Completo de la Aplicación

## 📱 Información General
**YEGA** es una aplicación móvil de delivery que permite a los usuarios solicitar productos de diferentes tiendas con entrega rápida. La aplicación simula una experiencia completa de compra desde el registro hasta la confirmación del pedido.

## 🚀 Recorrido Paso a Paso

### 1. PANTALLA DE INICIO DE SESIÓN
**Ubicación:** Pantalla inicial de la aplicación
- **Logo:** Se adapta automáticamente al tema (negro en modo oscuro)
- **Campos:** Email y contraseña
- **Validación:** Formulario reactivo con validación en tiempo real
- **Acciones:**
  - `Iniciar Sesión`: Navega al dashboard
  - `¿No tienes cuenta? Regístrate`: Navega a registro

### 2. PANTALLA DE REGISTRO
**Navegación:** Desde login → "Regístrate"
- **Campos obligatorios:**
  - Nombre completo (validación en tiempo real)
  - Email (validación de formato)
  - Contraseña (indicador de fortaleza)
  - Confirmar contraseña (validación de coincidencia)
  - Aceptar términos y condiciones (checkbox obligatorio)
- **Validaciones dinámicas:**
  - Indicador visual de fortaleza de contraseña
  - Validación de email en tiempo real
  - Verificación de coincidencia de contraseñas
- **Estados del botón:**
  - Deshabilitado hasta que todos los campos sean válidos
  - Habilitado cuando la validación sea exitosa
- **Flujo:** Registro → Pantalla de carga → Dashboard

### 3. PANTALLA DE CARGA (REGISTRO)
**Función:** Simula la creación de cuenta
- **Duración:** 3 segundos
- **Mensaje:** "Creando tu cuenta..."
- **Animación:** Spinner de carga
- **Destino:** Dashboard automáticamente

### 4. DASHBOARD PRINCIPAL
**Función:** Hub central de la aplicación
- **Barra de búsqueda:** Funcional con filtros en tiempo real
- **Secciones principales:**
  - Tiendas populares
  - Promociones destacadas
  - Categorías de productos
- **Tiendas disponibles (simuladas):**
  - **Supermercado Central**: Supermercado completo
  - **Farmacia Plus**: Productos de salud y belleza
  - **Tienda Gourmet**: Productos premium y especiales
- **Navegación inferior:** Inicio (activo), Pedidos, Perfil
- **Búsqueda:** Campo funcional que filtra tiendas en tiempo real
- **Acciones:** Clic en cualquier tienda lleva al detalle

### 5. DETALLE DE TIENDA
**Navegación:** Dashboard → Clic en tienda
- **Información de la tienda:**
  - Tiempo de entrega estimado
  - Rating y reseñas
  - Distancia aproximada
  - Costo de envío
- **Catálogo de productos:** Categorizado por tipo
- **Productos simulados por tienda:**
  - **Supermercado**: Lácteos, panadería, frutas, limpieza
  - **Farmacia**: Medicamentos, cuidado personal, vitaminas
  - **Gourmet**: Vinos, quesos, productos importados
- **Funcionalidad:**
  - Agregar productos al carrito
  - Especificar cantidades
  - Ver precios actualizados
- **Carrito flotante:** Muestra total y cantidad de productos

### 6. CARRITO DE COMPRAS
**Navegación:** Desde cualquier tienda → Botón "Ver carrito"
- **Funcionalidades completas:**
  - **Modificar cantidades:** Botones + / - para cada producto
  - **Eliminar productos:** Botón de eliminar individual
  - **Cálculos automáticos:**
    - Subtotal de productos
    - Costo de envío
    - Total final
- **Información de entrega:**
  - Dirección de entrega (editable)
  - Tiempo estimado de entrega
  - Método de pago seleccionado
- **Validaciones:**
  - Mínimo de compra por tienda
  - Disponibilidad de productos
- **Botón de pago:** Procede al proceso de pago

### 7. PANTALLA DE CARGA (PAGO)
**Función:** Simula procesamiento de pago
- **Duración:** 4 segundos
- **Mensaje:** "Procesando pago..."
- **Animación:** Indicador de progreso
- **Destino:** Pantalla de confirmación

### 8. CONFIRMACIÓN DE PEDIDO
**Función:** Confirmación exitosa del pedido
- **Información mostrada:**
  - Número de pedido generado
  - Tiempo estimado de entrega
  - Tienda seleccionada
  - Total pagado
  - Estado del pedido
- **Acciones disponibles:**
  - Seguir mi pedido (simulado)
  - Volver al inicio
  - Ver historial de pedidos

### 9. HISTORIAL DE PEDIDOS
**Navegación:** Menú inferior → "Pedidos"
- **Lista completa de pedidos anteriores:**
  - Pedidos entregados con calificación
  - Pedidos cancelados
  - Información detallada de cada pedido
- **Información por pedido:**
  - ID del pedido
  - Fecha y hora
  - Tienda origen
  - Productos ordenados
  - Total pagado
  - Estado de entrega
  - Tiempo de entrega real
  - Calificación dada
- **Acciones disponibles:**
  - Volver a pedir (para pedidos entregados)
  - Ver factura detallada
  - Calificar experiencia

### 10. PERFIL DE USUARIO
**Navegación:** Menú inferior → "Perfil"
- **Información personal:**
  - Avatar del usuario
  - Nombre y email
  - Tiempo como miembro
  - Estadísticas de usuario (pedidos, rating, ahorros)
- **Gestión de direcciones:**
  - Direcciones guardadas (Casa, Trabajo)
  - Agregar nuevas direcciones
  - Editar direcciones existentes
  - Marcar dirección predeterminada
- **Métodos de pago:**
  - Tarjetas guardadas
  - Agregar nuevos métodos
  - Gestionar métodos existentes
  - Método predeterminado
- **Configuración:**
  - Notificaciones (toggle funcional)
  - Privacidad y seguridad
  - Información personal
- **Cerrar sesión:** Regresa al login

## 🎨 Características del Diseño

### Sistema de Temas
- **Modo oscuro por defecto**
- **Logo adaptable:** Cambia automáticamente según el contexto
- **Colores semánticos:** Uso consistente del sistema de tokens
- **Tipografía:** Jerarquía clara y legible

### Experiencia de Usuario
- **Navegación intuitiva:** Menú inferior persistente
- **Feedback visual:** Estados de botones, validaciones, cargas
- **Animaciones sutiles:** Transiciones suaves entre estados
- **Responsive:** Optimizado para dispositivos móviles

### Funcionalidades Interactivas
- **Búsqueda en tiempo real**
- **Validaciones dinámicas**
- **Carrito persistente**
- **Cálculos automáticos**
- **Estados de carga realistas**

## 🔄 Flujos de Navegación Principales

### Flujo de Nuevo Usuario
```
Login → Registro → Validación → Carga → Dashboard
```

### Flujo de Compra Completa
```
Dashboard → Búsqueda → Tienda → Productos → Carrito → Pago → Carga → Confirmación
```

### Flujo de Usuario Existente
```
Dashboard ↔ Pedidos ↔ Perfil (navegación libre)
```

## 📝 Notas Técnicas

### Tecnologías Utilizadas
- **React + TypeScript**
- **Tailwind CSS con sistema de tokens**
- **Shadcn/ui para componentes**
- **React Router para navegación**
- **Lucide React para iconografía**

### Datos Simulados
- Todos los datos son simulados para demostración
- No hay integración con APIs reales
- Perfecto para prototipado y presentaciones

### Personalización
- Sistema de diseño completamente personalizable
- Componentes modulares y reutilizables
- Fácil adaptación a marca específica

---

**¡La aplicación YEGA está lista para una demostración completa y presenta una experiencia de usuario fluida y profesional!**