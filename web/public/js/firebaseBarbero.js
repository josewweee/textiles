var config = {
    apiKey: "AIzaSyAVCcHaDu7iETTruTao-QsbiDC6aow4b9s",
    authDomain: "barbero-express.firebaseapp.com",
    databaseURL: "https://barbero-express.firebaseio.com",
    projectId: "barbero-express",
    storageBucket: "barbero-express.appspot.com",
    messagingSenderId: "1021518127997"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();

//VEAMOS EN QUE HTML ESTAMOS
var url = window.location.pathname;
var currentLocation = url.substring(url.lastIndexOf('/')+1);
console.log("locacion actual: " + currentLocation +  " = " + "buscar-4columnas");
//NO HACEMOS ESTA OPERACION SI ESTAMOS EN LA PAGINA DEL BODEGUERO
if (currentLocation != "bodeguero.html"){
	// ---- SI EL USUARIO ESTA LOGGEADO PARA PONER SU FOTO, SU NOMBRE, CAMBIAR EL BOTON DE INICIAR/CERRAR SESION Y ACTUALIZAR LOS PRODUCTOS DEL CARRO DE COMPRAS EN EL NAV BAR -------
	var userL = localStorage.getItem("USERKEY2");
	var userN = localStorage.getItem("USERNAME2");
	console.log("userKey: " +  userL);
	if (userL != "null" && userL != null) {	

		//TEXTO NOMBRE
		if(currentLocation == "carritoCompras" || currentLocation == "buscar-4columnas" || currentLocation == "login" || currentLocation == "productoSimple" || currentLocation == "terminosLegales"){
			var infoUsuario = "";
			//infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';
			infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';

		}else{
			var infoUsuario = "";
			//infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';
			infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';
		}


		//BOTON DE INICIAR SESION / CERRAR SESION
		var botonIniciarCerrar = "";
		botonIniciarCerrar = '<a onclick="CerrarSeccion()">Cerrar sesión</a>';

		document.getElementById("infoUsuario").innerHTML = infoUsuario;
		document.getElementById("iniciar/cerrar").innerHTML = botonIniciarCerrar;

		//MOSTRAMOS LA CANTIDAD DE PRODUCTOS EN EL CARRO DE COMPRAS
		mostrarCantidadPedidos();

	}else{

		//TEXTO NOMBRE
		/*if(currentLocation == "index.html"){
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.png"/>BE</p>';
		}else{
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.png"/>BE</p>';
		}*/

		//BOTON DE INICIAR SESION / CERRAR SESION
		if(currentLocation == "carritoCompras" || currentLocation == "buscar-4columnas" || currentLocation == "login" || currentLocation == "productoSimple" || currentLocation == "terminosLegales"){
			var botonIniciarCerrar = "";
			botonIniciarCerrar = '<a href="login.html">iniciar sesión</a>';
			//botonIniciarCerrar = '<a href="FrontEnd/vistas/login.html">iniciar sesión</a>';
		}else{
			var botonIniciarCerrar = "";
			botonIniciarCerrar = '<a href="FrontEnd/vistas/login.html">iniciar sesión</a>';
			//botonIniciarCerrar = '<a href="login.html">iniciar sesión</a>';
		}
		document.getElementById("iniciar/cerrar").innerHTML = botonIniciarCerrar;
		//document.getElementById("infoUsuario").innerHTML = infoUsuario;
	}
}

// -------------------- FUNCION PARA CERRAR SECCION --------------------
//DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAR PARA AÑADIR ESTO

function onLoad() {
	/*gapi.load('auth2', function() {
        gapi.auth2.init();
    });*/
}

function CerrarSeccion(){
	/*var auth2 = gapi.auth2.getAuthInstance();
		if(auth2 != null && auth2 != "null" && auth2 != ""){
		    auth2.signOut().then(function () {
		      document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://barberoexpress-8c13c.firebaseapp.com";
		      alert('Te has desconectado exitosamente.');
		    });
		}*/


	firebase.auth().signOut().then(function() {
		//CERRAMOS SESION CON GOOGLE
		/*var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      console.log('User signed out.');
	    });*/

		window.alert("sesion cerrada correctamente");
		localStorage.setItem("USERKEY2", "null");
		localStorage.setItem("USERNAME2", "null");
		if(currentLocation != "index"){
			window.location.href="../../index.html";
		}else{
			window.location.href="index.html";
		}
	}, function(error) {
    	windows.alert("Un error ha sucedido, por favor comuniquese con lancha para mas informacion");
	});
}

/* Ramon */

// IE10+
document.getElementsByTagName( "html" )[0].classList.remove( "loading" );

// All browsers
document.getElementsByTagName( "html" )[0].className.replace( /loading/, "" );

// Or with jQuery
//$( "html" ).removeClass( "loading" );



// -------------------- FUNCION PARA USAR EL BUSCADOR EN EL INDEX--------------------
function BuscarINDEX(prod1, prod2){
  var queryText = prod1;
  var queryText2 = prod2;
  if (queryText2 == '*'){queryText2 = "";}
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "];
  var descripcion = [" ", " "];
  var keyProducto = [" ", " "];
  //aca debemos de agregar un if que mire si hay disponibilidad del producto
  //BUSCAMOS COINCIDENCIAS CON EL PRIMER PRODUCTO
    if(queryText.length >= 2){
	    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('marca').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('tipo').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	}else{
	    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
	    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
	    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
	    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
	    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
  	}

    //BUSCAMOS COINCIDENCIAS CON EL SEGUNDO PRODUCTO
    if(queryText2.length >= 2){
	    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText2).endAt(queryText2+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('marca').startAt(queryText2).endAt(queryText2+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('tipo').startAt(queryText2).endAt(queryText2+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	}else{
	    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
	    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
	    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
	    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
	    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
  	}


    //ESPERAMOS UN PAR DE SEGUNDOS QUE SE HAGA LA BUSQUEDA PARA MANDAR LA INFORMACION AL HTML
    setTimeout(function(){
      localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
      localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
      localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
      localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
      localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
      window.location.href="FrontEnd/vistas/buscar-4columnas.html";
    }, 2000);
}


// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO --------------------
function Ir_productoINDEX(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  /* es preferible abrir una pestaña nueva con el producto para que el ususario
   no pierda su busqueda y pueda seguir viendo productos
  */
  window.location.href= "FrontEnd/vistas/productoSimple.html";

}

// -------------------- FUNCION PARA ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL NAV-BAR--------------------
function mostrarCantidadPedidos(){
	var numeroPedidos = "";
	var tamañoArregloPedidos = [];

	firebaseRef.child("USUARIOS").child(userL).child("/carritoCompras/productos").on("child_added", function(snapshot) {
		tamañoArregloPedidos.push(snapshot.val().cantidad);
	});

	
	setTimeout(function() {
		console.log(tamañoArregloPedidos.length);
		if(currentLocation == "carritoCompras" || currentLocation == "buscar-4columnas" || currentLocation == "login" || currentLocation == "productoSimple" || currentLocation == "terminosLegales"){
			numeroPedidos = '<a href="carritoCompras.html" style="height: 75px; line-height: 75px;"><i class="fa fa-shopping-cart"></i> Carrito('+ (tamañoArregloPedidos.length -1) + ')</a>';
		}else{
			numeroPedidos = '<a href="FrontEnd/vistas/carritoCompras.html" style="height: 75px; line-height: 75px;"><i class="fa fa-shopping-cart"></i> Carrito('+ (tamañoArregloPedidos.length -1) + ')</a>';
		}
		document.getElementById("cantidadPedidos").innerHTML = numeroPedidos;
	}, 2000);
	
}



// -------------------- FUNCION PARA USAR EL BUSCADOR --------------------
function Buscar(){
  var queryText = document.getElementById("srchFld").value;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "];
  var descripcion = [" ", " "];
  var keyProducto = [" ", " "];

  if(queryText.length >= 2){
  	
    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
        foto_Url.push(snapshot.val().foto);
        nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        keyProducto.push(snapshot.key);
    });

    firebaseRef.child("PRODUCTOS").orderByChild('marca').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
        foto_Url.push(snapshot.val().foto);
        nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        keyProducto.push(snapshot.key);
    });

    firebaseRef.child("PRODUCTOS").orderByChild('tipo').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
          foto_Url.push(snapshot.val().foto);
          nombre.push(snapshot.val().nombre);
          precio.push(snapshot.val().precio);
          descripcion.push(snapshot.val().descripcion);
          keyProducto.push(snapshot.key);
    });

    setTimeout(function(){
      localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
      localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
      localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
      localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
      localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
      //window.location.href="buscar-4columnas.html"; COMENTADO POR NUEVO INDEX
      window.location.href="index.html";
    }, 3000);

  }else{
    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
   // window.location.href="buscar-4columnas.html";   COMENTADO POR NUEVO INDEX
   window.location.href="index.html";
  }
}


// ----- FUNCION PARA HACER PEDIDO ---- //

function HacerPedido(){
	var ref = firebase.database().ref('USUARIOS/' + userL + '/');
  	console.log(ref);
  	var user = firebase.auth().currentUser;

  	if (user) {
  		
  		var ciudadP = document.getElementById("ciudadPedido").value;
  		
  		var direccionP = document.getElementById("direccionPedido").value;

  		var nombreUsuario = document.getElementById("nombrePedido").value;

  		var apellindoUsuario = document.getElementById("apellidoPedido").value;

  		var  telefonoUsuario = document.getElementById("telefonoPedido").value;
  		
  		var  infoPedido = document.getElementById("informacionAdicionalPedido").value;
  		var info = " " ;
  		
  		if (ciudadP.length<3) {
  			info += "ingrese la ciudad de entrega : "+ciudadP+"\n";
  			info += `Ingrese la ciudad de entrega: ${ciudadP} \n`
  			console.log(ciudadP)
  			//window.alert("ingrese la ciudad de entrega");
  		}
  		if (direccionP.length<3) {
  			info += "ingrese la direccion de entrega : "+direccionP+"\n";
  			//window.alert("ingrese la direccion de entrega");
  			console.log(direccionP)
  		}
  		if (nombreUsuario.length<3) {
  			info += "ingrese el nombre del que recibe entrega"+nombreUsuario+"\n";
  			//window.alert("ingrese el nombre del que recibe entrega");
  			console.log(nombreUsuario)
  		}
  		if (apellindoUsuario.length<3) {
  			info += "ingrese el nombre y apellido del que recibe entrega : "+apellindoUsuario+"\n";
  			//window.alert("ingrese el nombre y apellido del que recibe entrega");
  			console.log(apellindoUsuario)
  		}
		if (telefonoUsuario.length<7 && !isNaN(telefonoUsuario)) {
  			info += "ingrese un numero telefonico valido : " +telefonoUsuario+"\n";
  			//window.alert("ingrese un numero valido");
  			console.log(telefonoUsuario)
  		}
  		window.alert( info );

  	} else {
    window.alert("Inicia sesion primero");
  }
}

// -------------------- FUNCION PARA AGREGAR PRODUCTOS AL CARRO DE COMPRAS --------------------

function AgregarAlCarrito(){
  var ref = firebase.database().ref('USUARIOS/' + userL + '/');
  console.log(ref);
  var user = firebase.auth().currentUser;

  if (user) {
    var nombre = $("#nombreProducto").text();
    var precioHTML = $("#precioProducto").text();
    var precio = precioHTML.substring(1);
    var id = parseInt($("#id_Producto").text());
    var cantidad = document.getElementById( "cantidad" ).value;

    var marca = $("#marcaProducto").text();
    var descuento = "0";
    var foto = $('#imagenProducto').attr('src');
    var keyP = localStorage.getItem("PROD_KEY")

   ref.child("carritoCompras/productos").push({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      id: id,
      key: keyP,
      marca: marca,
      descuento: descuento,
      foto: foto
    });
    window.alert("Producto Agregado");
    //window.location.href="product_summary.html";
    window.location.href= "carritoCompras.html";
  } else {
    window.alert("Inicia sesion primero");
  }
}








// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO -------------------- RESPLICADOOOOOO, BORRAR, YA ESTA EN FIREBASEBARBERO
function Ir_producto(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  //window.location.href= "productoSimple.html"; COMENTADO POR NUEVO INDEX
  window.location.href= "FrontEnd/vistas/productoSimple.html";

}
