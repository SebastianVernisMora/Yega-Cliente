# Jules — PR y Documentación (Yega-Cliente)

- Rama: `feat/auth-integration`
- Base: `dev`
- Objetivo: Integración base de autenticación (hooks, axios, `.env`).

## Cambios principales
- `src/lib/api.ts`: cliente axios con `baseURL` desde `VITE_API_BASE_URL` y `withCredentials`.
- `src/hooks/useAuth.ts`: `react-query` (login/register) + toasts de error.
- `src/components/LoginScreen.tsx`: conecta al hook, maneja estado de carga y navegación.
- `.env.example`: agrega `VITE_API_BASE_URL`.

## Acciones para Jules
- Crear PR: "Auth Integration (base): hooks + axios + env" → base `dev`.
- Incluir en el cuerpo del PR:
  - Resumen de cambios (lista anterior).
  - Configuración: `cp .env.example .env` y definir `VITE_API_BASE_URL`.
  - Pruebas: `npm ci && npm run build`; probar login y navegación a `/tiendas`.
  - Checklist: env configurado, build sin errores, navegación OK, sin warnings ESLint/TS.
- Riesgos: dependencia de `/auth/login` y CORS del API.

## Compare para PR
- https://github.com/SebastianVernisMora/Yega-Cliente/compare/dev...feat/auth-integration?expand=1

## Footer sugerido
AI-Usage: gemini=0, codex=1, jules=1, blackbox=0

