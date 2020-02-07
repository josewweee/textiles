var imagenes = '<ul class="thumbnails" id= "fotos_index">';
var rows = 1;
var foto_Url = [" ", " "];
var nombre = [" ", " "];
var precio = [" ", " "]
var keyProducto = [" ", " "];
var descripcion = [" ", " "];
var recomendado = [" ", " "];
var tipos = [" ", " "];






// -------------------- FUNCION PARA TOMAR LOS PRODUCTOS DE LA BASE DE DATOS --------------------
var firebaseDB = firebase.database().ref();
var refProductos = firebaseDB.child("PRODUCTOS");
var refTelefonos = firebaseDB.child("TELEFONOS");

refProductos.orderByChild("id").on("child_added", function(snapshot) {
  if(snapshot.val().nombre != "FINAL"){
    foto_Url.push(snapshot.val().foto);
    nombre.push(snapshot.val().nombre);
    precio.push(snapshot.val().precio);
    descripcion.push(snapshot.val().descripcion);
    recomendado.push(snapshot.val().recomendado);
    tipos.push(snapshot.val().tipo);
    keyProducto.push(snapshot.key);
  }else{
    Imegenes_Recomendadas();
  }
});






console.log("estamos con " +  nombre);

// ------------------------------- FUNCION MANDAR A LA BASE DE DATOS EL TELEFONO DEL USUARIO ------------------------------------
function ingresarTelefono(){
  var telefonoIngresado = document.getElementById("telefonoUsuario").value;
  refTelefonos.push({
    celular: telefonoIngresado
  });
  window.alert("Teléfono agregado");
  document.getElementById("telefonoUsuario").value = " ";
}






// ------------------------------- FUNCION ACTUALIZAR EL HTML CON LAS "IMAGENES RECOMENDADAS", LAS PRIMERAS DEL "INICIO" ------------------------------------
function Imegenes_Recomendadas() {
  console.log("tenemos " + nombre);
  var imagenes_referidos = '';
  var j = 2;
  var No_productos = 0; // CANTIDAD DE PRODUCTOS A MOSTRAR
  var completo = false;
  var contador = 0;
  while (j < recomendado.length && contador < 3) {
    if (recomendado[j] == true) {
      imagenes_referidos += '<div class="col-sm-4 mb-xs-30 wow fadeInUp" data-wow-delay="0.' + contador + 's">'
                            + '<div class="team-item">'
                              + '<div class="team-item-image">'
                                + '<img src="' + foto_Url[j] + '" onclick="Ir_producto(' + "'" + keyProducto[j] + "'" + ')" alt=""/>'
                                + '<div class="team-item-detail">'
                                  + '<h4 class="font-alt normal">Nice to meet!</h4>'
                                  + '<p> Curabitur augue, nec finibus mauris pretium eu. Duis placerat ex gravida nibh tristique porta.</p>'
                                  + '<div class="team-social-links">'
                                    + '<a href="#" target="_blank"><i class="fa fa-facebook"></i></a>'
                                    + '<a href="#" target="_blank"><i class="fa fa-twitter"></i></a>'
                                    + '<a href="#" target="_blank"><i class="fa fa-pinterest"></i></a>'
                                  + '</div>'
                                + '</div>'
                              + '</div>'
                              + '<div class="team-item-descr font-alt">'
                                + '<div class="team-item-name">'
                                  + nombre[j]
                                + '</div>'
                                + '<div class="team-item-role">'
                                  + '$' + precio[j]
                                + '</div>'
                              + '</div>'
                            + '</div>'
                          + '</div>';
      No_productos++;
      contador++;
    }
    j++;
  }
  document.getElementById("imagenes_recomendados").innerHTML = imagenes_referidos;
}









// ------------------------------- FUNCION ACTUALIZAR EL HTML CON IMAGENES DE CADA TIPO DE PRODUCTO AL DAR CLICK EN ESTE  EN LA PESTAÑA "TIPOS"------------------------------------
function imagenesTipos(prod1, prod2){
  var imagenesTipo = '';
  if (prod2 == '*'){prod2 = "";}
  var j = 2;
  var i = 2;
  var lleno = false;
  var cont = 0;
  var noProductos = 5; // 5 - 2 = 3
  var posiciones = [" ", " "];
  var completo = false;
  var verMas = "";

  for(i; i < tipos.length && lleno == false; i++){
    if(prod1.toString() == tipos[i] || prod2.toString() == tipos[i]){
      cont++;
      posiciones.push(i);
    }
    if(cont >= 3){
      lleno = true;
    }
  }

  while(j < noProductos){
    var ubicacion = posiciones[j];
    imagenesTipo +='<li class="work-item mix general">'
                    + '<a class="work-ext-link" onclick="Ir_productoINDEX('+ "'" + keyProducto[ubicacion] + "'"+ ')">'
                      + '<div class="work-img">'
                        + '<img class="work-img imgIndex" src="'+ foto_Url[ubicacion] + '" alt="Work" />'
                      + '</div>'
                      + '<div class="work-intro">'
                        + '<h3 class="work-title">' + nombre[ubicacion] + '</h3>'
                        + '<div class="work-descr">'
                          + 'Barbero Express'
                        + '</div>'
                      + '</div>'
                    + '</a>'
                    + '<div class="">'
                      + '<p class="text-center">' + nombre[ubicacion] + ' </br> $' + precio[ubicacion] + '</p>'
                    + '</div>'
                  + '</li>';
    j++;
  }
  verMas += '<div class="align-center" style="padding-bottom: 10px;">'
               +    '<button class="submit_btn btn btn-mod btn-medium btn-round" onclick="BuscarINDEX('+ "'" + prod1 + "'" + ',' +  "'" + prod2 + "'" + ')" id="submit_btn">Ver mas</button>'
               +  '</div>';
  document.getElementById("work-grid").innerHTML = imagenesTipo;
  document.getElementById("VerMas").innerHTML = verMas;
}









// ------------------------------- FUNCION PARA ACTUALIZAR EL HTML CON LAS IMAGENES INICIALMENTE MOSTRADAS EN LA PESTAÑA "TIPOS" ------------------------------------
function imagenesPortafolioGeneral(){
  var imagenesPortafolio = '';
  var j = 0;
  var noProductos = 6;
  var ubicacionImagen = ["FrontEnd/images/portafolio/barbera.jpg","FrontEnd/images/portafolio/maquina.jpg","FrontEnd/images/portafolio/tijeras.jpg","FrontEnd/images/portafolio/brush.jpg","FrontEnd/images/portafolio/crazyGel.jpg","FrontEnd/images/portafolio/espuma.jpg"];
  var nombreImagen = ["BARBERAS/CUCHILLAS","MÁQUINAS","TIJERAS","SACUDIDORES/OTROS","CERAS/GEL","TÓNICOS/ESPUMAS"];
  var contador = 0;
    imagenesPortafolio += '<!-- Work Item (External Page) -->'
                        + '<li class="work-item mix general barberasCuchillas">'
                        + '<a class="work-ext-link"  onclick="BuscarINDEX('+ "'" + 'barbera' + "'" + ',' +  "'" + 'cuchilla' + "'" + ')")">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="FrontEnd/images/portafolio/barbera.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Barberas/Cuchillas</h3>'
                        + '<div class="work-descr">'
                        + 'La mejor calidad'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">BARBERAS/CUCHILLAS</p>'
                        + '</div>'
                        + '</li>'

                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (Lightbox) -->'

                        + '<li class="work-item mix general">'
                        + '<a class="work-ext-link" onclick="BuscarINDEX('+ "'" + 'maquina' + "'" + ',' +  "'" + '*' + "'" + ')")">'
                        + '<div class="work-img">'
                        + '<img src="FrontEnd/images/portafolio/maquina.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Máquinas</h3>'
                        + '<div class="work-descr">'
                        + 'Las mejores marcas'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">MÁQUINAS</p>'
                        + '<!-- <p class="text-center">TÓNICO <br> $2.500</p> -->'
                        + '</div>'
                        + '</li>'

                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'

                        + '<li class="work-item mix general">'
                        + '<a class="work-ext-link" onclick="BuscarINDEX('+ "'" + 'tijera' + "'" + ',' +  "'" + '*' + "'" + ')")">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="FrontEnd/images/portafolio/tijeras.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Tijeras</h3>'
                        + '<div class="work-descr">'
                        + 'Diseños especiales'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">TIJERAS</p>'
                        + '</div>'
                        + '</li>'

                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'

                        + '<li class="work-item mix general">'
                        + '<a class="work-ext-link" onclick="BuscarINDEX('+ "'" + 'sacudidor' + "'" + ',' +  "'" + 'otro' + "'" + ')">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="FrontEnd/images/portafolio/brush.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Sacudidor/Otros</h3>'
                        + '<div class="work-descr">'
                        + 'El mejor complemento para tu trabajo.'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">SACUDIDORES/OTROS</p>'
                        + '</div>'
                        + '</li>'

                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'

                        + '<li class="work-item mix general">'
                        + '<a class="work-ext-link" onclick="BuscarINDEX('+ "'" + 'cera' + "'" + ',' +  "'" + 'gel' + "'" + ')")">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="FrontEnd/images/portafolio/crazyGel.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Ceras/Gel</h3>'
                        + '<div class="work-descr">'
                        + 'Excelentes fragancias y calidad.'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">CERAS/GEL</p>'
                        + '</div>'
                        + '</li>'

                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'

                        + '<li class="work-item mix general">'
                        + '<a class="work-ext-link" onclick="BuscarINDEX('+ "'" + 'tonico' + "'" + ',' +  "'" + 'espuma' + "'" + ')")">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="FrontEnd/images/portafolio/espuma.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Tónicos/Espumas</h3>'
                        + '<div class="work-descr">'
                        + 'Las mejores marcas de América'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">TÓNICOS/ESPUMAS</p>'
                        + '</div>'
                        + '</li>'

                        + '<!-- End Work Item -->'
                        ;

  document.getElementById("work-grid").innerHTML = imagenesPortafolio;
}
