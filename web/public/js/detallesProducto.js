/*var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);*/

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var prodKey = localStorage.getItem("PROD_KEY");
var SearchRef = firebase.database().ref("PRODUCTOS/" + prodKey);
var userkey = localStorage.getItem("USERKEY2");
var refCarro = firebase.database().ref("USUARIOS/" + userkey + "/" + "carritoCompras");
var prod_id;


/*$(document).ready(function(){
  var inputvalue = "testeo1";
  var ActualLocation =  window.location.href;
  console.log(ActualLocation);
  //AQUI ACTUALIZAMOS LA PAGINA LUEGO DE QUE SE CARGEN TODOS LOS ELEMENTOS
  history.pushState(null, 'boootshop online Shopping car', 'file:///C:/Users/USER/Documents/BarberExpress/pagina/public/product_details.html/testeo1');
  //window.location.replace(ActualLocation+'/'+inputvalue);
});*/

SearchRef.on("value", function(snapshot) {
	//ACTUALIZAMOS HTML CON EL PRODUCTO ELEGIDO (EL QUE VIENE DEL PROD_KEY)
	document.getElementById("nombreProducto").innerHTML = snapshot.val().nombre;
  document.getElementById("nombre_producto").innerHTML = snapshot.val().nombre;
	document.getElementById("nombreProducto2").innerHTML = snapshot.val().nombre;
	document.getElementById("marcaProducto").innerHTML = snapshot.val().marca;
	document.getElementById("descripcion_producto").innerHTML = snapshot.val().descripcion;
  //nota: añadir separadores para el precio (1 000.000)
	document.getElementById("precioProducto").innerHTML = "$" + snapshot.val().precio;
  document.getElementById("id_Producto").innerHTML = snapshot.val().id;
  prod_id = snapshot.val().id;
  console.log("ID DEL PRODUCTO: " + prod_id)

  //IMAGENES
	document.getElementById("imagenProducto1").innerHTML = '<a href="'+snapshot.val().foto+'" class="lightbox-gallery-3 mfp-image">' + '<img src="' + snapshot.val().foto + '" id="imagenProducto" alt=""/> ' + '</a>'
	/*document.getElementById("imagenProducto2").innerHTML = '<a href="'+snapshot.val().foto+'" class="lightbox-gallery-3 mfp-image"><img src="' + snapshot.val().foto + '" alt=""/></a>'
	document.getElementById("imagenProducto3").innerHTML = '<a href="'+snapshot.val().foto+'" class="lightbox-gallery-3 mfp-image"><img src="' + snapshot.val().foto + '" alt=""/></a>'
	document.getElementById("imagenProducto4").innerHTML = '<a href="'+snapshot.val().foto+'" class="lightbox-gallery-3 mfp-image"><img src="' + snapshot.val().foto + '" alt=""/></a>'*/



});


function BuscarEnCarrito(id){
  var Encontrado = false;
  console.log("id: " + id);
  refCarro.orderByChild("id").equalTo(id).on("child_added",function(snapshot){
    Encontrado = true;
    return Encontrado;
  });
  return Encontrado; 
}

/*function CambiarAPorIr(uno,dos) {

  var noMasIntentos = false;
  var intentos = 4;
  var respuesta;
  var valor;
  if(prod_id == null){
    valor = document.getElementById( "id_Producto" ).innerText;
  }else{
    valor = prod_id;
  }
  console.log(valor);

  var esta = BuscarEnCarrito(parseInt(valor));

  if (esta == true) {
    noMasIntentos = true;
    switchDivS(dos,uno);
  }else {
    switchDivS(uno,dos);
  }

}

function switchDivS(id1, id2) {
//este solo mustra el primero y oculta el segundo
//facta organizar la posicion, quizas superponer uno ensima de otro
  document.getElementById(id1).style.visibility ="visible";
  document.getElementById("yaLoTiene").style.marginTop ="-80px";
  document.getElementById("yaLoTiene").style.marginBottom ="50px";
  document.getElementById(id2).style.visibility ="hidden";

}

function MostrarUno() {
  document.getElementById("Uno").style.opacity ="1";
}

function OcultarUno() {
  document.getElementById("Uno").style.opacity ="0";
}

  setTimeout(function(){
    CambiarAPorIr('NoLoTiene','yaLoTiene');
  }, 1000);*/
