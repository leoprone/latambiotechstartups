/* Sólo para artículos.

JavaScript */
const startTime = Date.now();
 
window.addEventListener("beforeunload", () => {
 
const slug = window.location.pathname
.split("/")
.pop()
.replace(".html", "");
 
const seconds = Math.round(
(Date.now() - startTime) / 1000
);
 
console.log("[GA4] engagement:", slug, seconds);
 
gtag("event", "article_engagement", {
article_slug: slug,
engagement_seconds: seconds
});
 
});




//En el HTML de cada artículo:
<script src="/js/analytics-engagement.js"></script>
