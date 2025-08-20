# Yega-Cliente

**YEGA** es una aplicación móvil de delivery que permite a los usuarios solicitar productos de diferentes tiendas con entrega rápida. La aplicación simula una experiencia completa de compra desde el registro hasta la confirmación del pedido.

Este repositorio contiene el código fuente del front-end de la aplicación, construido con tecnologías modernas para ofrecer una experiencia de usuario fluida, personalizable y lista para demostraciones.

## ✨ Características Principales

- **Flujo de Autenticación Completo**: Registro con validación de contraseña y login seguro.
- **Dashboard Interactivo**: Búsqueda de tiendas en tiempo real, categorías y promociones.
- **Catálogo de Productos Detallado**: Cada tienda tiene su propio menú con productos, precios y descripciones.
- **Carrito de Compras Funcional**: Modifica cantidades, elimina productos y ve el resumen del costo total (subtotal, envío y total).
- **Simulación de Proceso de Pago**: Flujo completo desde el pago hasta la pantalla de confirmación del pedido.
- **Historial de Pedidos**: Revisa pedidos anteriores, su estado y detalles.
- **Perfil de Usuario**: Gestiona información personal, direcciones, métodos de pago y configuraciones de la app.
- **Diseño Adaptable (Responsive)**: Optimizado para una experiencia móvil nativa.
- **Tema Oscuro y Claro**: Soporte para ambos temas, con adaptación automática de componentes y logos.

## 🛠️ Tecnologías Utilizadas

- **Framework**: React + Vite
- **Lenguaje**: TypeScript
- **UI**: shadcn-ui
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Gestión de Estado**: React Context y Hooks
- **Formularios**: React Hook Form
- **Navegación**: React Router

## 🚀 Cómo ejecutar el proyecto

El único requisito es tener Node.js y npm instalados. Se recomienda usar [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para gestionar las versiones de Node.

Sigue estos pasos para levantar el entorno de desarrollo:

```sh
# 1. Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Navega al directorio del proyecto
cd Yega-Cliente

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```
El servidor se iniciará en `http://localhost:5173` con recarga automática.

## 🤖 Automatización de Sprint 1

Este proyecto utiliza automatizaciones para gestionar el flujo de trabajo del sprint a través de GitHub Actions y Projects.

- **Tablero del Sprint**: Project v2 de usuario “Sprint 1 - Yega-Cliente”.
- **Issues del Sprint**: Consulta el backlog completo en [`docs/archivo/sprint-1/ISSUES-Sprint-1.md`](./docs/archivo/sprint-1/ISSUES-Sprint-1.md).
- **Flujo de Estado Automático**: El estado de los issues se actualiza automáticamente. Más detalles en [`docs/archivo/sprint-1/PROJECTS-AUTOMATION.md`](./docs/archivo/sprint-1/PROJECTS-AUTOMATION.md).
