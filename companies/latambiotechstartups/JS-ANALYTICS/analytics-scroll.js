/* Sólo para artículos.

JavaScript */

let tracked50 = false;
let tracked90 = false;
 
window.addEventListener("scroll", () => {
 
const slug = window.location.pathname
.split("/")
.pop()
.replace(".html", "");
 
const scrollPercentage =
(window.scrollY + window.innerHeight) /
document.documentElement.scrollHeight * 100;
 
if (scrollPercentage >= 50 && !tracked50) {
 
tracked50 = true;
 
console.log("[GA4] scroll 50%:", slug);
 
gtag("event", "article_scroll", {
article_slug: slug,
depth: 50
});
}
 
if (scrollPercentage >= 90 && !tracked90) {
 
tracked90 = true;
 
console.log("[GA4] scroll 90%:", slug);
 
gtag("event", "article_scroll", {
article_slug: slug,
depth: 90
});
}
 
});
 



//En el HTML de cada artículo:

<script src="/js/analytics-scroll.js"></script>