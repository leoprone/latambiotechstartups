/*Éste sirve para medir qué artículos son abiertos desde tu buscador.

Modificación en tu generador de resultados

 Donde construís el enlace:

Antes:

HTML
articles/polymera.html

Después:

HTML
articles/polymera.html?source=search

o dinámicamente:

JavaScript */
startup.url + "?source=search"



/* 
Este archivo va solamente en el HTML de la página del buscador.*/


<script src="/js/analytics-search-result-click.js"></script>



//JS

document.addEventListener("click", (event) => {
 
const enlace = event.target.closest("a");
 
if (!enlace) return;
 
if (!enlace.href.includes("?source=search")) return;
 
console.log("[GA4] search_result_click:", enlace.href);
 
gtag("event", "search_result_click", {
article_url: enlace.href
});
 
});




