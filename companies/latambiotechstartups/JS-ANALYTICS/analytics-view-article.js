//Este archivo va cargado sólo en las páginas de artículos.

document.addEventListener("DOMContentLoaded", () => {

  const slug = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  console.log("[GA4] view_article:", slug);

  gtag("event", "view_article", {
    article_slug: slug
  });

});




//En el HTML de cada artículo:

<script src="/js/analytics-view-article.js"></script>