# Estrategia de Rendimiento - Cliente

Este documento define el presupuesto de rendimiento y las estrategias de optimización para la aplicación del cliente, con el objetivo de garantizar una experiencia de usuario rápida y fluida.

## 1. Presupuesto de Rendimiento (Performance Budget)

Para asegurar tiempos de carga iniciales rápidos, se establece el siguiente presupuesto para el bundle principal de la aplicación:

- **JavaScript (JS):** Máximo 250 KB (gzipped) para el bundle inicial.
- **CSS:** Máximo 50 KB (gzipped).
- **Tiempo de Interacción (Time to Interactive - TTI):** Menos de 5 segundos en una conexión 3G lenta.
- **First Contentful Paint (FCP):** Menos de 2 segundos.

Este presupuesto se monitoreará continuamente utilizando herramientas como Lighthouse y `bundle-analyzer` para evitar regresiones.

## 2. Optimización de Imágenes

Las imágenes son a menudo el mayor cuello de botella en el rendimiento web. Se implementará la siguiente estrategia:

- **Formatos Modernos:** Se servirán imágenes en formatos de próxima generación como **WebP** y **AVIF**, que ofrecen una compresión superior al de JPEG/PNG. Se utilizará el tag `<picture>` para proporcionar fallbacks para navegadores no compatibles.
  ```html
  <picture>
    <source srcset="imagen.avif" type="image/avif">
    <source srcset="imagen.webp" type="image/webp">
    <img src="imagen.jpg" alt="Descripción de la imagen">
  </picture>
  ```
- **Compresión:** Todas las imágenes se comprimirán sin pérdida perceptible de calidad durante el proceso de build.
- **Dimensionamiento Correcto:** Se servirán imágenes con las dimensiones adecuadas para el contenedor en el que se mostrarán, evitando cargar imágenes de 2000px de ancho para un avatar de 100px.

## 3. Carga Diferida (Lazy-Loading)

Para minimizar el peso de la carga inicial, se aplicará la carga diferida (lazy-loading) de forma extensiva.

- **Componentes y Rutas:** El código de las rutas se dividirá utilizando `React.lazy()` y `Suspense`. Esto significa que el código de una página (e.g., `/perfil`) no se cargará hasta que el usuario navegue a ella.
- **Imágenes y Iframes:** Las imágenes que se encuentren "below the fold" (fuera de la vista inicial) utilizarán el atributo `loading="lazy"`. Esto delega la carga al navegador, que la iniciará solo cuando el usuario se desplace cerca de la imagen.
  ```html
  <img src="imagen.jpg" loading="lazy" alt="Descripción">
  ```
- **Librerías Pesadas:** Librerías que no sean críticas para el renderizado inicial (e.g., para exportar a PDF o librerías de gráficos) se cargarán de forma dinámica solo cuando el usuario active la funcionalidad que las requiere.
