# La Mesa Roja — Demo de Menú AR

Demo estática (HTML + CSS + JS) de un menú de restaurante con un solo
platillo y experiencia de realidad aumentada, lista para GitHub Pages.

## Estructura

```
index.html
css/style.css
js/app.js
models/    ← coloca aquí tu platillo.glb
images/    ← coloca aquí tu platillo.jpg
ImageBg/   ← coloca aquí tu ImageBg.jpg
```

## Antes de publicar

1. Copia tu modelo 3D a `models/platillo.glb`.
2. Copia la foto del platillo a `images/platillo.jpg`.
3. (Opcional) Copia el fondo de la pantalla de inicio a `ImageBg/ImageBg.jpg`.

Si alguno de estos archivos no existe, el sitio sigue funcionando
normalmente (usa placeholders / fondo negro).

Para cambiar cualquiera de estos nombres de archivo, edita las
constantes al inicio de `js/app.js` (`CONFIG.MODEL_PATH`,
`CONFIG.DISH_IMAGE_PATH`, `CONFIG.BG_IMAGE_PATH`).

## Desplegar en GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de esta
   carpeta (`index.html`, `css/`, `js/`, `models/`, `images/`,
   `ImageBg/`) a la raíz del repo.
2. En GitHub, ve a **Settings → Pages**.
3. En **Source**, selecciona la rama (por ejemplo `main`) y la
   carpeta `/ (root)`.
4. Guarda. GitHub te dará una URL del tipo:
   `https://tu-usuario.github.io/tu-repo/`
5. Abre esa URL desde un celular para probar la experiencia AR
   (Chrome/Samsung Internet en Android, Safari en iPhone/iPad).

No se requiere build, backend, ni configuración adicional: todas las
rutas son relativas.

## Cómo funciona el AR

Se usa el componente web [`<model-viewer>`](https://modelviewer.dev/)
(cargado desde CDN, sin instalación). Este componente delega la
experiencia de AR a la tecnología nativa del dispositivo:

- **Android** → Scene Viewer (ARCore)
- **iPhone/iPad** → AR Quick Look
- **Otros navegadores compatibles** → WebXR

Esto le da la mayor compatibilidad posible sin escribir código de
detección de superficies a mano: la detección de plano, la colocación
fija del modelo, la posibilidad de caminar alrededor y la escala real
del objeto ya son parte del comportamiento nativo de estas tres
tecnologías. El atributo `ar-scale="fixed"` evita que el modelo pueda
reescalarse con pellizco (pinch), y `ar-placement="floor"` lo ancla a
la superficie detectada.

La cámara solo se solicita cuando el usuario presiona **"Ver en AR"**
(nunca al cargar la página).

## Fallback (visor 3D)

El mismo `<model-viewer>` que se usa para AR se muestra en pantalla
completa apenas se abre la pantalla de visor. Si el dispositivo no
soporta AR, simplemente no ocurre nada al intentar activarla y el
usuario ya está viendo el modelo en 3D en pantalla, con rotación
táctil manual (`camera-controls`) — sin ningún mensaje de error ni
pantalla de incompatibilidad.
