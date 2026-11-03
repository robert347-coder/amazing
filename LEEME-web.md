# Amazing Jesús – Mi Primera Comunión

App de repaso de catequesis para niños y familias. Es una aplicación web instalable (PWA): funciona en Android, iPhone y ordenador, también sin internet.

## Qué hay en esta carpeta

| Archivo | Para qué sirve | ¿Lo tocarás? |
| --- | --- | --- |
| `config.js` | Papa, obispo, parroquia, párroco y reglas del juego (80%, preguntas por partida, Rosario y Vía Crucis obligatorios) | Sí, a menudo |
| `contenido.js` | Todo el temario: lecciones, preguntas, oraciones, misterios y estaciones | Sí, para revisar o añadir preguntas |
| `app.js` | La lógica de la app | Normalmente no |
| `styles.css` | Colores y diseño | Normalmente no |
| `index.html` | La página principal | No |
| `manifest.webmanifest` | Nombre e icono al instalarla en el móvil | No |
| `sw.js` | Permite usarla sin internet | Solo para subir el número de versión |
| `icons/` | Iconos de la app | No |

## Cómo probarla en tu ordenador

Abre una terminal en esta carpeta y escribe:

```
python3 -m http.server 8000
```

Después abre `http://localhost:8000` en el navegador. (Si abres `index.html` con doble clic también funciona, pero sin el modo "sin internet").

## Cómo publicarla gratis en GitHub Pages

1. Entra en github.com con tu cuenta (robert347-coder).
2. Pulsa **New repository**. Nombre: `amazing-jesus`. Márcalo como **Public**. Crear.
3. Pulsa **uploading an existing file** y arrastra TODOS los archivos de esta carpeta (incluida la carpeta `icons`). Pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En "Branch" elige `main` y la carpeta `/ (root)`. Guarda.
5. En 1-2 minutos la app estará en: `https://robert347-coder.github.io/amazing-jesus/`

Para instalarla en el móvil:
- **Android (Chrome):** abre el enlace → menú ⋮ → "Instalar aplicación".
- **iPhone (Safari):** abre el enlace → botón Compartir → "Añadir a pantalla de inicio".

## Cómo cambiar el contenido

1. Edita `contenido.js` o `config.js` (en GitHub puedes pulsar el lápiz ✏️ sobre el archivo).
2. **Importante:** en `sw.js` cambia `const VERSION = "aj-v1";` por `"aj-v2"` (y así sucesivamente). Si no lo haces, los móviles seguirán mostrando la versión antigua.

## Privacidad (RGPD / LOPDGDD)

La app no pide datos personales (solo un apodo), no tiene publicidad ni analíticas y no envía nada a internet. El progreso se guarda únicamente en el propio dispositivo (localStorage). Antes de publicarla en Google Play habrá que redactar una política de privacidad breve que diga exactamente esto.

Esta versión no carga fuentes de Google Fonts (eso enviaría la IP del usuario a Google): usa las letras del propio dispositivo. Si se quieren las fuentes del diseño (Baloo 2 y Nunito), hay que guardar sus archivos dentro de la app, nunca enlazarlas desde Google.

## Pendiente

- Revisión doctrinal del contenido por el catequista y el párroco.
- Escribir el nombre del párroco en `config.js`.
- Política de privacidad y publicación en Google Play.
