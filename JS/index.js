/* ********** Menu ********** */

/*función anónima autoejecutable*/



((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
      $menu = d.querySelector(".menu");
  
  
    $btnMenu.addEventListener('click', (e) => {
      $btnMenu.firstElementChild.classList.toggle("none");
      $btnMenu.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("is-active");
    });
  /*esconder el menu cuando ya se seleccionó una sección
   (por delegación de eventos, asignando el click a un
    elem. de nivel superior, en este caso, el document)*/ 
  d.addEventListener("click", (e) => {
      if (!e.target.matches(".menu a")) return false;/*no pasa nada ahí*/
  
      $btnMenu.firstElementChild.classList.remove("none");
      $btnMenu.lastElementChild.classList.add("none");
      $menu.classList.remove("is-active");
    });
  })(document);
  


//--------------------------------------------------------------------------------------------

//             CLARO / OSCURO  

const toggleDarkMode = () => {
          document.body.classList.toggle('dark-mode');
          /* contenedorResultados.classList.toggle('dark-mode'); */
          const isDarkMode = document.body.classList.contains('dark-mode');
         /*  const isContenedorResultadosdorDarkMode = contenedorResultados.classList.contains('dark-mode'); */
          localStorage.setItem('dark-mode', isDarkMode);
         /*  localStorage.setItem('dark-mode', isContenedorResultadosdorDarkMode); */
        };
        
        // Aplicar el modo oscuro si estaba habilitado anteriormente
        if (localStorage.getItem('dark-mode') === 'true') {
          document.body.classList.add('dark-mode');
          /* contenedorResultados.classList.add('dark-mode'); */
        }
        
      
       /*  const buttonMode = document.getElementById('dark-mode-button'); */
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        darkModeToggle.addEventListener('click', toggleDarkMode);
      
      
      
      
      
      
      