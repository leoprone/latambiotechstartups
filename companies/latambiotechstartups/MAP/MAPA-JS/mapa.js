// Selector de AÑO de fundación

const select = document.getElementById("fundacion");
const inicio = 2015;
const actual = new Date().getFullYear();

  for (let año = actual; año >= inicio; año--) {
    const option = document.createElement("option");
    option.value = año;
    option.textContent = año;
    select.appendChild(option);
  }






let jsonData = [];


// fetch que se dispara sin requerir acción del usuario sobre un botón

fetch("mapa.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data;
  });







// Convierte un valor individual a texto y lo pasa a minúsculas.
// También permite comparar años guardados como número o como string.
function normalizar(valor) {
  return String(valor ?? "").trim().toLowerCase();
}

function obtenerStartupsFiltradas(data, filtros = {}) {
  return data.filter(startup => {

    if (
      filtros.nombre &&
      normalizar(startup.nombre) !== normalizar(filtros.nombre)
    ) {
      return false;
    }


    if (
      filtros.pais &&
      normalizar(startup.pais) !== normalizar(filtros.pais)
    ) {
      return false;
    }

    if (
      filtros.fundacion &&
      normalizar(startup.fundacion) !== normalizar(filtros.fundacion)
    ) {
      return false;
    }




        // Manejo de ARRAYS

    if (
      filtros.campo_aplicacion &&
      !(
        Array.isArray(startup.campo_aplicacion) &&
        startup.campo_aplicacion.some(
          producto =>
            normalizar(producto) === normalizar(filtros.campo_aplicacion)
        )
      )
      ) {
        return false;
      }





    if (
      filtros.tecnologias &&
      !(
        Array.isArray(startup.tecnologias) &&
        startup.tecnologias.some(
          tecnologia =>
            normalizar(tecnologia) === normalizar(filtros.tecnologias)
        )
      )
    ) {
      return false;
    }




    if (
      filtros.producto_servicio &&
      !(
        Array.isArray(startup.producto_servicio) &&
        startup.producto_servicio.some(
          producto =>
            normalizar(producto) === normalizar(filtros.producto_servicio)
        )
      )
    ) {
      return false;
    }

    return true;
  });
}





function mostrarStartups(startups) {
  const contenedor = document.getElementById("resultados");

  const cantidad =document.getElementById("cantidad"),
  textoResultados = document.getElementById("texto-resultados");

  cantidad.textContent= startups.length;

  if(startups.length === 1){
     textoResultados.textContent = "resultado";
  }else{
     textoResultados.textContent = "resultados";
  }
  
  // Borra los resultados anteriores.
  contenedor.replaceChildren();


  startups.forEach(startup => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("startup-container");

  



 Object.entries(startup)
  .filter(([, valor]) => valor !== "" && !(Array.isArray(valor) && valor.length === 0))
  .forEach(([clave, valor]) => {
    

             const fila = document.createElement("p");
        fila.classList.add("p-startups");
        const etiqueta = document.createElement("span");

        let corrector = "";
    
        if(clave === "nombre"){
          corrector = "Nombre";
        }else if(clave === "pais"){
          corrector = "País";
        }else if(clave === "fundacion"){
          corrector = "Año de fundación";
        }else if(clave === "campo_aplicacion"){
          corrector = "Campo de aplicación";
        }else if(clave === "tecnologias"){
          corrector = "Tecnologías";
        }else if(clave === "producto_servicio"){
          corrector = "Producto o Servicio";
        }else if(clave === "descripcion"){
          corrector = "Descripción";
        }else if(clave === "web"){
          corrector = "Website";
        }else if(clave === "linkedin"){
          corrector = "LinkedIn";
        }else if(clave === "articulo"){
          corrector = "Artículo";
        }

        etiqueta.textContent = `${corrector.replaceAll("_", " ")}: `;
        etiqueta.classList.add("span-startups");
        fila.append(etiqueta);

    

     if (["web", "articulo", "linkedin"].includes(clave)) {
        const textoURL = String(valor ?? "").trim();

        // Acepta URLs http/https y rutas relativas para artículos.
        let url = null;

        if (textoURL) {
          try {
            const candidata = new URL(textoURL, document.baseURI);

            if (
              candidata.protocol === "http:" ||
              candidata.protocol === "https:"
            ) {
              url = candidata;
            }
          } catch {
            // Si no es una URL válida, se muestra como texto.
          }
        }

        if (url) {
          const enlace = document.createElement("a");
          enlace.href = url.href;
          
         /*  enlace.textContent = textoURL; */
          enlace.textContent = "visitar";
          enlace.classList.add("enlace");
            // Abre el enlace en otra pestaña.
          enlace.target = "_blank";

          // Evita que la página abierta acceda a la ventana original.
          enlace.rel = "noopener";


          fila.append(enlace);
        } else {
          const texto = document.createElement("span");
          texto.textContent = textoURL || "Sin información";

          fila.append(texto);
        }
      } else {
        const contenido = document.createElement("span");

        contenido.textContent = Array.isArray(valor)
          ? valor.join(", ")
          : String(valor ?? "Sin información");

        fila.append(contenido);
      }

      tarjeta.append(fila);
    });



    contenedor.append(tarjeta);
  });
}


// HABILITAR o DESHABILITAR los select dependiendo de si se busca o no por nombre de startup

const nombre = document.getElementById("nombreStartup");


const selectPais =
document.getElementById("pais");

const selectFundacion =
  document.getElementById("fundacion");

const selectCampoAplicacion =
  document.getElementById("campoAplicacion");


const selectTecnologias =
  document.getElementById("tecnologias");

const selectProductoServicio =
  document.getElementById("productoServicio");

  // Se deshabilita el select apenas el usuario intenta escribir
  nombre.addEventListener("keydown", () => {
    selectPais.disabled = true;
    selectFundacion.disabled = true;
    selectCampoAplicacion.disabled = true;
    selectTecnologias.disabled = true;
    selectProductoServicio.disabled = true;
  });

  // Opcional: volver a habilitarlo si el input queda vacío
  nombre.addEventListener("input", () => {
    if (nombre.value === "") {
    selectPais.disabled = false;
    selectFundacion.disabled = false;
    selectCampoAplicacion.disabled = false;
    selectTecnologias.disabled = false;
    selectProductoServicio.disabled = false;
    }
  });





document
  .getElementById("btnFiltrar")
  .addEventListener("click", () => {

    const nombreStartup =
      document.getElementById("nombreStartup").value;


    if( nombreStartup === ""){
     
      const pais =
      document.getElementById("pais").value;

      const fundacion =
        document.getElementById("fundacion").value;

      const campoAplicacion =
        document.getElementById("campoAplicacion").value;
      
    
      const tecnologias =
        document.getElementById("tecnologias").value;
    
      const productoServicio =
        document.getElementById("productoServicio").value;


      
        const resultado = obtenerStartupsFiltradas(
          jsonData,
          {
            pais,
            fundacion,
            campo_aplicacion: campoAplicacion,
            tecnologias,
            producto_servicio: productoServicio
            
          }
        );

        
       mostrarStartups(resultado);
    }else{

            
            document.getElementById("pais").disabled = true;

            const fundacion =
              document.getElementById("fundacion").value;

            const campoAplicacion =
              document.getElementById("campoAplicacion").value;
            
          
            const tecnologias =
              document.getElementById("tecnologias").value;
          
            const productoServicio =
              document.getElementById("productoServicio").value;    


             const resultado = obtenerStartupsFiltradas(
                jsonData,
                {
                  nombre: nombreStartup,
                 
                }
              );

              
       mostrarStartups(resultado);
    }  


  });




  // Restablecer para seleccionar "todos" los valores

  document
  .getElementById("btnRestablecer")
  .addEventListener("click", () => {
   
   document.getElementById("nombreStartup").value= "";
   document.getElementById("pais").value= "";
   document.getElementById("fundacion").value= "";
   document.getElementById("campoAplicacion").value= "";
   document.getElementById("tecnologias").value= "";
   document.getElementById("productoServicio").value= "";

   // HABILITAR los select
   document.getElementById("nombreStartup").disabled= false;;
   document.getElementById("pais").disabled= false;;
   document.getElementById("fundacion").disabled= false;;
   document.getElementById("campoAplicacion").disabled= false;;
   document.getElementById("tecnologias").disabled= false;;
   document.getElementById("productoServicio").disabled= false;;
      
  });





