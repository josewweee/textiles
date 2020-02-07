    var pagina_actual = 1;
    var registros_por_pagina = 12;
    var total_registros = 0;
  	var imagenes = '';
    var paginas = '<a href="#" onclick="paginaAnterior()">&lsaquo;</a>';
  	var rows = 1;
  	var foto_Url = [" ", " "];
  	var nombre = [" ", " "];
    var precio = [" ", " "];
    var descripcion = [" ", " "];
    var keyProducto = [" ", " "];
    var busqueda = false;









// ------------------------------- GUARDAMOS LOS PRODUCTOS DE LA BUSQUEDA / TOMAMOS TODOS LOS PRODUCTOS DE LA BASE DE DATOS ------------------------------------
  	var refProductos = firebase.database().ref("PRODUCTOS");
  	var EstamosBuscando = JSON.parse(localStorage.getItem("NOMBRE_BS"));
    //var EstamosBuscando = "";
    if(EstamosBuscando!= null && EstamosBuscando.length > 2 && EstamosBuscando[3] != " "){
      foto_Url = JSON.parse(localStorage.getItem("FOTO_URL_BS"));
      nombre = JSON.parse(localStorage.getItem("NOMBRE_BS"));
      precio = JSON.parse(localStorage.getItem("PRECIO_BS"));
      descripcion = JSON.parse(localStorage.getItem("DESCRIPCION_BS"));
      keyProducto = JSON.parse(localStorage.getItem("KEYPRODUCTO_BS"));
      total_registros = nombre.length - 2;
      busqueda = true;
      //limpiamos el buscador
      localStorage.setItem("NOMBRE_BS", JSON.stringify(""));
      console.log("ESTAMOS ACTUALIZANDO EL BUSCADOR");
      ActualizarBuscador();
    }else{
      for(var r = 0; r < rows; r++)
    	{
    		refProductos.orderByChild("id").on("child_added", function(snapshot){
          if(snapshot.val().nombre != "FINAL"){
            if(snapshot.val().disponibles >= 1){
        			foto_Url.push(snapshot.val().foto);
        			nombre.push(snapshot.val().nombre);
              precio.push(snapshot.val().precio);
              descripcion.push(snapshot.val().descripcion);
              keyProducto.push(snapshot.key);
              total_registros++;
            }
          }else{
            
            setTimeout(function() {
              ActualizarBuscador();
            }, 100);
            
          }
    		});
    	}
  }







// ---------------------------------- CAMBIAR HTML DE IMAGENES EN EL BUSCADOR--------------------------------------------
      function ActualizarBuscador(){
  	  var j = 2;
      var no_imagenes = 12;
      if (busqueda){if(total_registros < 12){no_imagenes = total_registros + 2}}
        console.log(nombre[3]);
  		while(j < no_imagenes){
        imagenes += '<div class="col-md-3 col-lg-3 mb-60 mb-xs-40">';
    		imagenes += '<div class="post-prev-img">';
    		imagenes +=	'<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" alt=""/>';
        imagenes += '</div>';
    		imagenes +=	'<div class="post-prev-title font-alt align-center">';
    		imagenes +=	'<h5>'+ nombre[j] +'</h5>'; //CAMBIAR EL ESTILO DE LETRA Y AGREGAR EL IR_PRODUCTO
    		imagenes += '</div>';
        //imagenes +=	'<p>'+ descripcion[j] +'</p>';
        imagenes += '<div class="post-prev-text align-center">';
        imagenes += '<strong>$ '+ precio[j] + '</strong>';
        imagenes += '</div>';
        imagenes += '<div class="post-prev-more align-center">';
        imagenes += ' <a class="btn btn-mod btn-gray btn-round" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')"> <i class="fa fa-shopping-cart"></i> Añadir al carro </a>';
    		imagenes +=	'</div>';
    		imagenes +=	'</div>';
  			j++;
  		}
  		document.getElementById("blockView").innerHTML = imagenes;





// ---------------------------------- CAMBIAR HTML DE PAGINAS --------------------------------------------
      var k = 1;
      while(k <= total_registros/registros_por_pagina){
        paginas += '<a href="#" onclick="cambiar_pagina(' + k + ')">' + k + '</a>';
        k++;
      }
      paginas += '<a class="no-active">...</a>';
      paginas += '<a href="#" onclick="paginaSiguiente()">&rsaquo;</a>';
      document.getElementById("paginas").innerHTML = paginas;
      }

    //}, 4000);





// ---------------------------------- FUNCIONES PARA LA PAGINACION (LA PAGINACION NO DEBE ESTAR CLIENT-SIDE) --------------------------------------------
function paginaAnterior(){
  if (pagina_actual > 1) {
        pagina_actual--;
        cambiar_pagina(pagina_actual);
    }
}

function paginaSiguiente(){
   if (pagina_actual < numPags()) {
        pagina_actual++;
        cambiar_pagina(pagina_actual);
    }
}

function numPags()
{
    return Math.ceil(total_registros / registros_por_pagina);
}

function cambiar_pagina(pagina_actual){
      imagenes = '<ul class="thumbnails">';
      var j = (pagina_actual-1) * registros_por_pagina + 2;
      while(j < pagina_actual * registros_por_pagina){

       imagenes += '<div class="col-md-3 col-lg-3 mb-60 mb-xs-40">';
        imagenes += '<div class="post-prev-img">';
        imagenes += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" alt=""/>';
        imagenes += '</div>';
        imagenes += '<div class="post-prev-title font-alt align-center">';
        imagenes += '<h5>'+ nombre[j] +'</h5>'; //CAMBIAR EL ESTILO DE LETRA Y AGREGAR EL IR_PRODUCTO
        imagenes += '</div>';
        //imagenes += '<p>'+ descripcion[j] +'</p>';
        imagenes += '<div class="post-prev-text align-center">';
        imagenes += '<strong>$ '+ precio[j] + '</strong>';
        imagenes += '</div>';
        imagenes += '<div class="post-prev-more align-center">';
        imagenes += ' <a class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> Añadir al carro</a>'
        imagenes += '</div>';
        imagenes += '</div>';

        j++;
      }
      document.getElementById("blockView").innerHTML = imagenes;

}




// ---------------------------------- BOTON VOLVER --------------------------------------------
function Recargar(){
  //window.location.href="buscar-4columnas.html";
  window.location.href="index.html";
}
