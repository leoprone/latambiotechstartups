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
      
      
      
      
      
      