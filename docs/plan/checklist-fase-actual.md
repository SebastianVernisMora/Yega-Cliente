# ✅ CHECKLIST FASE 1: Integración con Backend Real

**Sprint:** 2
**Fase:** 1 de 4
**Objetivo:** Migrar de mocks a una API real, optimizar la gestión de datos y asegurar la autenticación.
**Documento de Status:** [STATUS.md](../submodules/STATUS.md)

---

## 1.1 Migración de Mocks a API Real

- [ ] **Refactorizar Servicios de API**
  - [ ] Eliminar `src/lib/mocks.ts` y sus referencias.
  - [ ] Implementar un cliente HTTP (axios/fetch) para interactuar con `Yega-API`.
  - [ ] Configurar interceptores para añadir tokens de autenticación a las peticiones.
- [ ] **Gestión de Estados de Carga y Errores**
  - [ ] Implementar indicadores de carga (`loading states`) en todas las vistas que consuman datos.
  - [ ] Añadir manejo de errores robusto, incluyendo mensajes claros para el usuario.
  - [ ] Implementar una lógica de reintento (`retry logic`) para peticiones fallidas.
  - [ ] Detectar y manejar la falta de conexión a internet (`offline detection`).
- [ ] **Autenticación Real**
  - [ ] Integrar el flujo de login con los endpoints JWT de `Yega-API`.
  - [ ] Implementar la lógica de `refresh token` para mantener la sesión activa.
  - [ ] Almacenar los tokens de forma segura en el cliente.

## 1.2 Optimización de React Query

- [ ] **Configuración Avanzada de Cache**
  - [ ] Definir `staleTime` y `cacheTime` óptimos para los diferentes tipos de datos.
  - [ ] Configurar `background refetching` para mantener los datos actualizados.
  - [ ] Implementar `optimistic updates` en acciones críticas (ej. añadir al carrito) para mejorar la UX.
- [ ] **Manejo de Errores y Fallbacks**
  - [ ] Implementar `Error Boundaries` a nivel de componente para aislar fallos.
  - [ ] Crear componentes de `fallback` que se muestren cuando los datos no se puedan cargar.
  - [ ] Configurar reintentos automáticos en `React Query` para peticiones fallidas.

## 1.3 Testing de Integración

- [ ] **Configurar Entorno de Testing**
  - [ ] Instalar y configurar `Mock Service Worker` (MSW) para simular la API en tests.
- [ ] **Escribir Tests de Integración**
  - [ ] Crear tests para el flujo de autenticación (login/logout).
  - [ ] Escribir tests para la obtención y muestra de datos (ej. lista de tiendas).
  - [ ] Probar el manejo de estados de carga y error en los componentes.
- [ ] **Tests End-to-End (E2E)**
  - [ ] Configurar un framework de E2E (ej. Playwright).
  - [ ] Escribir un test E2E para el flujo crítico: "login -> ver tiendas -> ver detalle de tienda".

---

##  criteriOS de Aceptación para la Fase 1

- [ ] La aplicación no utiliza ningún dato mock; toda la información proviene de la API.
- [ ] El usuario puede iniciar y cerrar sesión utilizando el backend real.
- [ ] Todas las pantallas que cargan datos muestran un estado de carga.
- [ ] Los errores de red se comunican claramente al usuario.
- [ ] La cobertura de tests de integración para los nuevos servicios es superior al 60%.
