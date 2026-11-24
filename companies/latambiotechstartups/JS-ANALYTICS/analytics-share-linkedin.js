/* IMPORTANTE
Sí. Para GA4 necesitas crear una propiedad en Google Analytics y obtener tu Measurement ID, que tiene formato:

Plain Text
G-XXXXXXXXXX

Pasos:

Ve a https://analytics.google.com
Inicia sesión con tu cuenta de Google.
Haz clic en Administrar (icono de engranaje).
En la columna Cuenta, crea una cuenta si aún no tienes una.
En la columna Propiedad, haz clic en Crear propiedad.
Pon un nombre, por ejemplo:
Plain Text
LatAm BioGateway MVP
Completa zona horaria y moneda.
Selecciona Web como plataforma.
Introduce la URL de tu sitio (GitHub Pages o Netlify) y un nombre para el flujo de datos.
Al finalizar verás algo parecido a:
Plain Text
ID de medición:
G-ABC123DEF4

Ese valor es el que debes colocar en tu <head>:





En el HTML:

en <head> poner:

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-..........."></script>
 
<script>
window.dataLayer = window.dataLayer || [];
 
function gtag() {
dataLayer.push(arguments);
}
 
gtag("js", new Date());
gtag("config", "G-ABC123DEF4");
</script>


------------------------


al botón de compartir poné: */
/* 
<button id="shareLinkedinBtn">
  Compartir en LinkedIn
</button> 
*/

//<script src="/js/analytics-share-linkedin.js"></script>

//--------------------------------------------





document.addEventListener("DOMContentLoaded", () => {
 
const button = document.getElementById("shareLinkedinBtn");
 
if (!button) return;
 
button.addEventListener("click", () => {
 
const slug = window.location.pathname
.split("/")
.pop()
.replace(".html", "");
 
console.log("[GA4] share_linkedin:", slug);
 
gtag("event", "share_linkedin", {
article_slug: slug
});
 
});
 
});




