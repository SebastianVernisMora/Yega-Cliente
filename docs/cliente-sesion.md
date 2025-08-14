# Documentación de Sesión de Cliente

Este documento describe el manejo de la sesión de usuario en la aplicación del cliente, incluyendo el uso de tokens, su ciclo de vida y el almacenamiento seguro.

## 1. Modelo de Tokens

Se utilizará un esquema de **Access Token** y **Refresh Token** para gestionar la autenticación y autorización del usuario.

- **Access Token**: Un token JWT de corta duración (e.g., 15 minutos) que se envía en el encabezado `Authorization` de cada solicitud a los endpoints protegidos. Su contenido (payload) puede incluir información básica del usuario como el `userId` y sus roles.
- **Refresh Token**: Un token de larga duración (e.g., 7 días) que se utiliza exclusivamente para solicitar un nuevo Access Token cuando el actual ha expirado. Este token se almacena de forma segura y solo se envía al endpoint de refresco de token.

## 2. Flujo de Expiración y Renovación

1. El cliente realiza una petición a un endpoint protegido con el Access Token.
2. Si el Access Token es válido, el servidor responde con los datos solicitados.
3. Si el Access Token ha expirado, el servidor responde con un `401 Unauthorized`.
4. El cliente, al recibir un 401, utiliza el Refresh Token para solicitar un nuevo Access Token al endpoint `/auth/refresh`.
5. Si el Refresh Token es válido, el servidor emite un nuevo Access Token.
6. El cliente reintenta automáticamente la petición original que falló, esta vez con el nuevo Access Token.
7. Si el Refresh Token también ha expirado, el cliente debe eliminar toda la información de sesión y redirigir al usuario a la pantalla de `/login`.

## 3. Lógica de Reintento (Retry)

Se implementará un interceptor en el cliente HTTP (e.g., Axios o Fetch) que automatice el flujo de renovación de token. Este interceptor será responsable de:
- Capturar las respuestas `401 Unauthorized`.
- Pausar todas las peticiones subsiguientes.
- Realizar la solicitud de refresco de token.
- Una vez obtenido el nuevo token, reanudar las peticiones pausadas, incluyendo la que falló originalmente.
- Si el refresco falla, limpiar la sesión y redirigir a `/login`.

## 4. Almacenamiento de Tokens

Para mitigar riesgos de seguridad como ataques XSS, los tokens se almacenarán de la siguiente manera:

- **Access Token**: Se almacenará en memoria, en una variable de estado de la aplicación (e.g., en un contexto de React o un store de Zustand/Redux). Esto evita que sea accesible por scripts maliciosos. Se pierde al recargar la página, lo cual es aceptable dado su corta vida.
- **Refresh Token**: Se almacenará en una cookie `HttpOnly` y `Secure`. Esto impide el acceso al token desde JavaScript en el navegador, protegiéndolo de ataques XSS. El servidor será responsable de establecer y leer esta cookie. La cookie debe tener el flag `SameSite=Strict` para proteger contra ataques CSRF.
