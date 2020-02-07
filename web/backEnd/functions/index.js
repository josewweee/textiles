var functions = require('firebase-functions');

//Acceso admin
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase, inetnto chorromil");
//  console.log("A la verga todo :v");
// });
/*
exports.totalizarCarrito = functions.database
.ref('/USUARIOS/{USUARIOSID}/carritoCompras')
.onWrite(event =>{ 
	// esto es para coger la infurmacion de todo el carrito de compras
	const carritoCompra = event.data.val()
	console.log(carritoCompra.vaciar.isVerified)
	// preguntamos por vaciar, para que no entre 2 veces
	if (carritoCompra.vaciar.isVerified == 'true') {
		console.log("se fue")
		return
	}
	// aqui modificamos el valor vaciar
	carritoCompra.vaciar.isVerified = true
	console.log("entro  >:v")


	var eventSnapshot = event.data; // Get carrito data
    var itemsSnapshot = eventSnapshot.child('productos'); // Get items data
    var totalSD = 0 ;

    // --- Pedido ----

		//var pedido ={productos:[],total:0};
		//var listaP =[];
		var productos =[];
		var info ={
				id:0,
				nombreUsuario: " ",
				totalPesos: 0,
				direccionEntrega:"", 
				telefonoContacto: "",
				comoLlegar:""
				};

    itemsSnapshot.forEach(function(itemSnapshot) { // For each item
        //var itemKey = itemSnapshot.key; // Get item key
        var itemData = itemSnapshot.val(); // Get item data
        console.log("id: "+ itemData.id)
        console.log("precio: "+ itemData.precio)
        var yave = itemData.key;

        console.log("yave: " + yave)

		var value = parseFloat(itemData.precio);
		

		
		// ---- DATOS INSEGUROS -------
		var cantidad = parseInt(itemData.cantidad);
		var nombre = itemData.nombre;
		var marca = itemData.marca;
		
		var producto ={
			nombre: nombre,
			marca: marca,
			cantidad: cantidad,
			precio: value
		};
		
		productos.push(producto);

		totalSD += (value * cantidad);
		


		//aqui mas adelante hacer descuento

    });
    console.log("Total: " + totalSD)
	// cambiamos la informacion del DataBase por el nuevo carritoCompras
	
	carritoCompra.total = totalSD


	info.totalPesos = totalSD;
	

	const promise = event.data.ref.set(carritoCompra)

	var refUsuario = carritoCompra.keyUsuario
	console.log("refUsuario: "+refUsuario);

	var ref = event.data.ref.root;
  	return ref.child("PEDIDOS").push({productos:productos,info:info});
  	//return ref.child("PEDIDOS").push(info);
	return promise
})

function getDatosPadre(event) {
	coevent.data.ref.parent.once("value").then(snap => {
      const post = snap.val();
      // do stuff with post here
      info.nombreUsuario = post.nombre +" "+ post.apellido;
      info.telefonoContacto = post.telefono.telefonoCelular;
      info.direccionEntrega = post.direccion.direccion;
      info.comoLlegar = post.direccion.informacionAdicional;
    });
}

*/

exports.totalizarCarrito = functions.database
.ref('/USUARIOS/{USUARIOSID}')
.onWrite(event =>{ 
	// esto es para coger la infurmacion de todo el carrito de compras
	const usuario = event.data.val()
	var eventSnapshot = event.data; // Get usuario data
	//console.log(carritoCompra.vaciar.isVerified)
	// preguntamos por vaciar, para que no entre 2 veces
	
	/*if (usuario.vaciarA) {
		console.log("se fue")
		return
	}*/

	// aqui modificamos el valor vaciar
	//carritoCompra.vaciar.isVerified = true
	if(eventSnapshot.val().comprando == true){
		console.log("------- ENVIADO PEDIDO -------------")

		

		
	    var itemsSnapshot = eventSnapshot.child('carritoCompras/productos'); // Get items data
	    var totalSD = 0 ;
	    var adressSnapshot = eventSnapshot.child('direccion');
	    var phoneSnapshot = eventSnapshot.child('telefono');
	    var shoppingCar = eventSnapshot.child('carritoCompras'); // Get items data

	    // --- Pedido ----

			//var pedido ={productos:[],total:0};
			//var listaP =[];
			var productos =[];
			var info ={
					id:0,
					nombreUsuario: "",
					totalPesos: 0,
					direccionEntrega: adressSnapshot.val().direccion, 
					telefonoContacto: phoneSnapshot.val().telefonoCelular,
					comoLlegar: adressSnapshot.val().informacionAdicional
					};
				info.nombreUsuario = usuario.nombre + " " + usuario.apellido;
			var factura ={
				id:0,
				nombreUsuario: "",
				totalPesos: 0,
				productos: productos
			}
			factura.nombreUsuario = usuario.nombre + " " + usuario.apellido;
	    itemsSnapshot.forEach(function(itemSnapshot) { // For each item
	    	
	        //var itemKey = itemSnapshot.key; // Get item key
	        var itemData = itemSnapshot.val(); // Get item data
	        if(itemData.nombre != "FINAL"){

		        var yave = itemData.key;

				var value = parseFloat(itemData.precio);
				
				
				// ---- DATOS INSEGUROS -------
				var cantidad = parseInt(itemData.cantidad);
				var nombre = itemData.nombre;
				var marca = itemData.marca;
				
				var producto ={
					nombre: nombre,
					marca: marca,
					cantidad: cantidad,
					precio: value
				};
				
				productos.push(producto);

				/*
				pedido.child("productos").push({
					nombre: nombre,
					marca: marca,
					cantidad: cantidad,
					precio: value
				});
				*/
				totalSD += (value * cantidad);
				


				//aqui mas adelante hacer descuento
			}

	    });
		// cambiamos la informacion del DataBase por el nuevo carritoCompras
		
		shoppingCar.total = totalSD;

		info.totalPesos = totalSD;
		
		const promise = event.data.adminRef.set(usuario)

		var ref = event.data.adminRef.root;
		eventSnapshot.val().comprando = false;
		usuario.vaciarA = true;
	  	return ref.child("PEDIDOS").push({productos:productos,info:info});
	  	//return ref.child("PEDIDOS").push(info);
		return promise
	}
})


/*FACTURAS*/


exports.crearFactura = functions.database
.ref('/USUARIOS/{USUARIOSID}')
.onWrite(event =>{ 


	// esto es para coger la infurmacion de todo el carrito de compras
	const usuario = event.data.val()
	var eventSnapshot = event.data; // Get usuario data
	//console.log(carritoCompra.vaciar.isVerified)
	// preguntamos por vaciar, para que no entre 2 veces
	
	/*if (usuario.vaciarB) {
		console.log("se fue :v")
		return	
	}*/
	
	// aqui modificamos el valor vaciar
	//carritoCompra.vaciar.isVerified = true
	if(eventSnapshot.val().comprando == true){
		console.log("------ FACTURANDO -----")
		

		var eventSnapshot = event.data; // Get usuario data
	    var itemsSnapshot = eventSnapshot.child('carritoCompras/productos'); // Get items data
	    var totalSD = 0 ;
	    var adressSnapshot = eventSnapshot.child('direccion');
	    var phoneSnapshot = eventSnapshot.child('telefono');
	    var shoppingCar = eventSnapshot.child('carritoCompras'); // Get items data

	    // --- Pedido ----

			var productos =[];
			var factura ={
				id:0,
				nombreUsuario: "",
				totalPesos: 0,
				productos: productos
			}

			factura.nombreUsuario = usuario.nombre + " " + usuario.apellido;


	    	itemsSnapshot.forEach(function(itemSnapshot) { // For each item
		        //var itemKey = itemSnapshot.key; // Get item key
		        var itemData = itemSnapshot.val(); // Get item data
		        if(itemData.nombre != "FINAL"){
			        var yave = itemData.key;
					var value = parseFloat(itemData.precio);
					
					/*
					var ref = event.data.ref.root;
					console.log("/PRODUCTOS"+"/"+yave)
			  		var producto = ref.child("/PRODUCTOS"+"/"+yave)

			  		//console.log("producto: "+ producto)
			  		var productoData = producto.data;
			  		var klp = productoData.val();
			  		console.log("precioReal: " + klp.precio)
			  		*/
					
					// ---- DATOS INSEGUROS -------
					var cantidad = parseInt(itemData.cantidad);
					var nombre = itemData.nombre;
					var marca = itemData.marca;
					
					var producto ={
						nombre: nombre,
						marca: marca,
						cantidad: cantidad,
						precio: value
					};
					
					productos.push(producto);

					/*
					pedido.child("productos").push({
						nombre: nombre,
						marca: marca,
						cantidad: cantidad,
						precio: value
					});
					*/
					totalSD += (value * cantidad);
					


					//aqui mas adelante hacer descuento
				}

	    	});
		// cambiamos la informacion del DataBase por el nuevo carritoCompras
		
		factura.totalPesos = totalSD;
		shoppingCar.vaciar = true;
		const promise = event.data.adminRef.set(usuario)
		
		factura.productos = productos
		var ref = event.data.adminRef.root;
		console.log("factura " + factura.nombreUsuario)
		eventSnapshot.val().comprando = false;
		usuario.vaciarB = true;
	  	return ref.child("FACTURAS").push({factura: factura});
		return promise
	}

})

exports.borrarCarrito = functions.database
.ref('/USUARIOS/{USUARIOSID}')
.onWrite(event =>{ 

	const usuario = event.data.val()

	/*if (usuario.vaciarA) {
		console.log("vaciarA listo")
		if (usuario.vaciarB) {
			console.log("vaciarB listo")*/

			var eventSnapshot = event.data; // Get  data
    		var itemsSnapshot = eventSnapshot.child('carritoCompras'); // Get items data

    		var carritoDeCompras = itemsSnapshot.val();
    		var vaciar = itemsSnapshot.val().vaciar;

			if (eventSnapshot.val().comprando == true) {
				setTimeout(function() {
					console.log("vaciar carrito listo")
					var finalon = {id:9999999999, nombre:"FINAL"};
					var productosN ={FINAL:" "};
					productosN.FINAL = finalon;
					usuario.comprando = false;
					carritoDeCompras.productos = productosN;
					carritoDeCompras.vaciar = false;

					usuario.carritoCompras = carritoDeCompras;
					const promise = event.data.ref.set(usuario)
					
					usuario.vaciarA = false;
					usuario.vaciarB = false;
					return promise
				}, 6000);
				
			}	
		/*}	
	}*/

	
})

