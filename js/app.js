/* ============================================================
   LA MESA ROJA — app.js
   Demo estática de menú + AR con <model-viewer>.
   Sin backend, sin build, lista para GitHub Pages.
   ============================================================ */

(function () {
  "use strict";

  // ------------------------------------------------------------
  // CONFIGURACIÓN — edita estas rutas/valores cuando agregues
  // tus propios archivos, sin tocar el resto del código.
  // ------------------------------------------------------------
  var CONFIG = {
    // Ruta del modelo 3D del platillo. Colócalo en esta ubicación.
    MODEL_PATH: "models/platillo.glb",

    // Escala del modelo. Déjala en "1 1 1" si tu GLB ya viene
    // modelado en metros a tamaño real (recomendado).
    // Ejemplo: si tu platillo mide ~31 cm de diámetro y el GLB
    // no está en escala real, ajusta este valor manualmente.
    MODEL_SCALE: "1 1 1",

    // Foto del platillo para la tarjeta del menú.
    DISH_IMAGE_PATH: "images/platillo.jpg",

    // Imagen de fondo de la pantalla de inicio.
    BG_IMAGE_PATH: "ImageBg/ImageBg.jpg"
  };

  // ------------------------------------------------------------
  // Navegación entre pantallas
  // ------------------------------------------------------------
  var screens = {
    home: document.getElementById("screen-home"),
    menu: document.getElementById("screen-menu"),
    viewer: document.getElementById("screen-viewer")
  };

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.toggle("screen--active", key === name);
    });
  }

  // ------------------------------------------------------------
  // Carga opcional de imágenes (fondo del inicio y foto del platillo)
  // Si el archivo no existe todavía, la página no se rompe:
  // simplemente se conserva el placeholder / fondo negro.
  // ------------------------------------------------------------
  function tryLoadImage(path, onSuccess) {
    var probe = new Image();
    probe.onload = function () { onSuccess(path); };
    probe.onerror = function () { /* archivo aún no existe: no hacer nada */ };
    probe.src = path;
  }

  tryLoadImage(CONFIG.BG_IMAGE_PATH, function (path) {
    document.getElementById("home-bg").style.backgroundImage = "url('" + path + "')";
  });

  tryLoadImage(CONFIG.DISH_IMAGE_PATH, function (path) {
    var img = document.getElementById("dish-image");
    var placeholder = document.getElementById("dish-placeholder");
    img.src = path;
    img.setAttribute("data-loaded", "true");
    placeholder.style.display = "none";
  });

  // ------------------------------------------------------------
  // Carga diferida (lazy) del modelo 3D: el GLB solo se asigna
  // al <model-viewer> la primera vez que el usuario entra a AR.
  // ------------------------------------------------------------
  var modelViewer = document.getElementById("model-viewer");
  var viewerEmpty = document.getElementById("viewer-empty");
  var modelSrcAssigned = false;

  function ensureModelLoaded() {
    if (modelSrcAssigned) return;
    modelSrcAssigned = true;

    modelViewer.setAttribute("scale", CONFIG.MODEL_SCALE);
    modelViewer.setAttribute("src", CONFIG.MODEL_PATH);

    modelViewer.addEventListener("error", function () {
      // El GLB todavía no existe o no cargó: se muestra el aviso
      // discreto en lugar de romper la página.
      viewerEmpty.style.display = "flex";
    });

    modelViewer.addEventListener("load", function () {
      viewerEmpty.style.display = "none";
    });
  }

  // ------------------------------------------------------------
  // Botones
  // ------------------------------------------------------------
  document.getElementById("btn-go-menu").addEventListener("click", function () {
    showScreen("menu");
  });

  document.getElementById("btn-menu-back").addEventListener("click", function () {
    showScreen("home");
  });

  document.getElementById("btn-view-ar").addEventListener("click", function () {
    ensureModelLoaded();
    showScreen("viewer");

    // La cámara solo se solicita aquí, en respuesta directa al gesto
    // del usuario (nunca al cargar la página).
    // Si el dispositivo/navegador no soporta AR, activateAR() no hace
    // nada visible: el <model-viewer> ya está mostrando el modelo en
    // pantalla completa como visor 3D de respaldo (rotable con el dedo).
    if (typeof modelViewer.activateAR === "function") {
      modelViewer.activateAR().catch(function () {
        // Silencioso a propósito: no se muestran mensajes de
        // incompatibilidad. El visor 3D en pantalla ya sirve de fallback.
      });
    }
  });

  document.getElementById("btn-close-ar").addEventListener("click", function () {
    showScreen("menu");
  });

})();
