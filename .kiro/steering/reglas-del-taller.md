---
inclusion: always
---

# Reglas del taller «Mi primer portafolio con Kiro»

## Quién usa este proyecto

Estudiantes de bachillerato que están haciendo su primera página web. La mayoría nunca ha programado. Trátalos como principiantes con curiosidad: sin regaños y sin palabras técnicas que no expliques.

## Cómo responder

- Responde siempre en español de México, con frases cortas.
- Después de cada cambio, di en una o dos líneas qué archivo tocaste y qué hace el cambio.
- Termina recordando: «Guarda y recarga la página en el navegador para verlo».
- Si la petición es ambigua, haz una sola pregunta corta antes de cambiar nada.
- Si algo no se puede hacer con estas reglas, dilo y propone la alternativa más sencilla.

## Cómo está armado

| Archivo | Para qué sirve |
|---|---|
| `datos.js` | Todos los datos personales y los dos colores. Es lo primero que se edita. |
| `index.html` | La estructura de la página y sus secciones. |
| `estilos.css` | El diseño: tamaños, espacios, formas. |
| `app.js` | Lee `datos.js` y dibuja la página. Comparte ayudantes en `window.Portafolio` (`crear`, `lista`, `almacen`, `confeti`). |
| `juego.js` | El juego de memoria de la sección «Juega conmigo». |
| `misiones.js` | El panel 🎯 que revisa `datos.js` y palomea lo que ya se personalizó. |

`datos.js` tiene una lista opcional `proyectos` (nombre, descripcion, tecnologias y enlace que empieza con `https://`); la sección «Mis proyectos» solo aparece si la lista tiene al menos uno. Al agregar un proyecto, escríbelo como objeto real dentro de los corchetes, no como comentario.

Las misiones comparan `datos.js` contra los textos de ejemplo. Hay 14 misiones base y 6 avanzadas; dos de las avanzadas se cumplen al agregar una `<section>` nueva dentro de `<main>` y al agregar un archivo `.js` propio. Si cambias el nombre de un campo de `datos.js`, actualiza también su misión en `misiones.js`. Para ocultar el panel se usa `misiones: false` en `datos.js`; no borres el archivo.

Los retos nuevos (juegos, secciones, botones) van en un archivo `.js` propio que se agrega al final de `index.html`, en lugar de hacer crecer `app.js`.

Se abre con doble clic en `index.html`. No hay servidor, ni instalación, ni paso de compilación.

## Reglas técnicas

- Solo HTML, CSS y JavaScript puros. No agregues frameworks, librerías, npm, ni archivos de configuración.
- No uses recursos de internet (fuentes, imágenes, scripts o CDN): la página debe funcionar sin conexión.
- Cambios de nombre, textos, intereses, metas o colores van **solo** en `datos.js`.
- Los dos colores principales se cambian en `colorPrincipal` y `colorSecundario` de `datos.js`, no en `estilos.css`.
- Una sección nueva necesita tres cosas: sus datos en `datos.js`, su bloque en `index.html` y su código en `app.js`, siguiendo el mismo patrón que las secciones que ya existen.
- En `app.js`, escribe el texto con `textContent`. No uses `innerHTML` con datos del estudiante.
- Mantén los nombres de variables, clases y comentarios en español.
- Haz el cambio más pequeño que cumpla la petición. No reescribas archivos completos ni borres secciones que nadie pidió quitar.
- La página debe seguir viéndose bien en celular y el texto debe leerse bien sobre su fondo.

## Privacidad

Quienes usan esto son menores de edad. Si piden agregar teléfono, dirección, nombre completo con apellidos, datos de su familia o una foto suya, sugiéreles con amabilidad usar su nombre de pila o un apodo, un emoji como avatar y, como mucho, el usuario de una red social.

## Si algo se rompe

Si la página queda en blanco o aparece el aviso rojo, casi siempre falta una comilla, una coma o una llave en `datos.js`. Revísalo primero, corrige solo eso y explica cuál era el error.
