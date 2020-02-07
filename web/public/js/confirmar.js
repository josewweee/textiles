var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var userkey = localStorage.getItem("USERKEY2");
var user = firebase.auth().currentUser;
var actualizar = true;
var refCarro;
var table = '<tr>' + '<th>Producto</th>' + '<th>Precio</th>' + '<th> </th>';
var table2 = "";
var tabla_total;
var rows = 1;
var producto = 'themes/images/products/4.jpg';
var nombre = [" ", " "];
var marca = [" ", " "];
var precio = [" ", " "];
var foto_URL = [" ", " "];
var descuento = [" ", " "];
var cantidad = [" ", " "];
var total = 0;
var id_producto = [" ", " "];
var keyArreglo = [" ", " "];
var codigos = [" ", " "];
var ciudad, direccion, nombre_pedido, apellido, telefono, informacion_adicional;
var botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="1" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button><button class="btn btn-danger" type="button" onclick="EliminarArticulo()"><i class="icon-remove icon-white"></button></div>';
var refUsuario;
var totalID_productos = [];
var Metodo_pago = localStorage.getItem("METODOPAGO");







// ---------------------------------- CODIGO PARA ACTUALIZAR EL CARRITO DE COMPRAS DEL USUARIO ---------------------------------
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	actualizar = false;

	refCarro = firebase.database().ref("USUARIOS/" + userkey + "/" + "carritoCompras" + "/" + "productos");
	refUsuario = firebase.database().ref("USUARIOS/" + userkey);
  	//DATOS DE ENVIO
	

    refUsuario.once("value", function(snapshot){
    	ciudad = snapshot.val().direccion.ciudad;
    	direccion = snapshot.val().direccion.direccion;
    	nombre_pedido = snapshot.val().nombre;
    	apellido = snapshot.val().apellido;
    	telefono = snapshot.val().telefono.telefonoCelular;
      informacion_adicional = snapshot.val().direccion.informacionAdicional;
      ActualizarCarrito();
    });

    var refCod = firebase.database().ref("CODIGOS");
    refCod.on("child_added", function(snapshot){
      codigos.push(snapshot.val().codigo);
    });

} else {
   window.alert("Inicia sesion primero");
   window.location.href="login.html";
}
});

function ActualizarCarrito(){
    var end = false;
    var time = 0;
    
    nombre = [" ", " "];  
    marca = [" ", " "];
    precio = [" ", " "];
    foto_URL = [" ", " "];
    descuento = [" ", " "];
    total = 0;
    table = "";
    id_producto = [" ", " "];
    cantidad = [" ", " "];
    keyArreglo = [" ", " "];
    document.getElementById("tablaCarritoCompras").innerHTML = "";
    document.getElementById("tabla_total").innerHTML = "";


/* AQUI ESTAMOS TOMANDO LOS DATOS DE LA DB*/
      refCarro.orderByChild("id").on("child_added", function(snapshot){
  			//producto.push(snapshot.val().foto);
        if(snapshot.val().nombre != "FINAL"){
    			nombre.push(snapshot.val().nombre);
    			precio.push(snapshot.val().precio);
          keyArreglo.push(snapshot.key);
    			marca.push(snapshot.val().marca);
    			descuento.push(snapshot.val().descuento);
    			foto_URL.push(snapshot.val().foto);
    			id_producto.push(snapshot.val().id);
          cantidad.push(snapshot.val().cantidad);
        }else{
          Actualizar_HTML_carrito();
        }

		  });
}

function Actualizar_HTML_carrito(){
  var j = 2;
  var Precio_total = 0;
  var descuento_total = 0;
    while(j < nombre.length){
      if(parseInt(cantidad[j]) >= 1){
        table += '<tr>'
                  + '<td>'
                      + nombre[j]
                  + '</td>'
                  + '<td>'
                      +  'X ' + cantidad[j]
                  + '</td>'   
              + '</tr>';
        Precio_total += parseInt(precio[j] * cantidad[j]);
        totalID_productos.push(id_producto[j]);
        j++;
      }else{
         table += '<tr>'
                  + '<td>'
                      + nombre[j]
                  + '</td>'
                  + '<td>'
                      +  'X ' + cantidad[j]
                  + '</td>'
              + '</tr>';
        Precio_total += parseInt(precio[j] * cantidad[j]);
        totalID_productos.push(id_producto[j]);
        j++;
      } 
    }
      /*PARTE DE INFORMAICON PERSONAL*/
    table += '<tr>'
              +'<td>'
                + 'Ciudad'
              + '</td>'
              + '<td>'
                +  ciudad
              + '</td>'
            +'</tr>'

            +'<tr>'
              + '<td>'
                + 'Direccion'
              + '</td>'
              + '<td>'
                +  direccion
              + '</td>'
            +'</tr>'

            +'<tr>'
              + '<td>'
                + 'Nombre'
              + '</td>'
              + '<td>'
                +  nombre_pedido
              + '</td>'
            +'</tr>'

            +'<tr>'
              + '<td>'
                + 'Apellido'
              + '</td>'
              + '<td>'
                +  apellido
              + '</td>'  
            +'</tr>'

            +'<tr>'
              + '<td>'
                + 'Telefono'
              + '</td>'
              + '<td>'
                +  telefono
              + '</td>'
            +'</tr>'

            +'<tr>'
              + '<td>'
                + 'Metodo de pago'
              + '</td>'
              + '<td>'
                +  Metodo_pago
              + '</td>'
            +'</tr>';

            if(Metodo_pago == "pagoElectronico"){
                table += '<tr>'
                        + '<td>'
                          + 'Tiempo de entrega'
                        + '</td>'
                        + '<td>'
                          +  'Entrega hoy mismo'
                        + '</td>'
                      +'</tr>'

                      + '<tr>'
                        + '<td>'
                          + 'Instrucciones de pago'
                        + '</td>'
                        + '<td>'
                          + '1. Para efectuar el pago electronico debes enviar el valor indicado en "precio total" a nuestra cuenta BANCOLOMBIA' + '<br>'
                          + '<br>' + '2. Una vez hecho el pago debes de enviar una foto del comprobante de pago al telefono + 57 321 603 6039' + '<br>'
                          + '<br>' + '3. Una vez mandes la foto te responderan con un codigo de 6 digitos que deberas ingresar en el cuadro de abajo' + '<br>'
                          + '<br>' + '4. Datos de la cuenta:' + '<br>'
                          + 'Nombre: Jose Mira Barrientos' + '<br>'
                          + 'cuenta: 82829291010394930' + '<br>'
                          + 'Cedula: 1037650535' + '<br>'
                        + '</td>'
                      +'</tr>';
                      Precio_total += 3.500;

                      table2 += 'Confirma tu pedido si toda la informacion es correcta.'
                              + '<input placeholder="Codigo pago electronico" id = "codigoPago" class="input-sm mb-xs-10" style="width: 250px;" type="text" pattern=".{3,100}" required />'
                              + '&nbsp;'
                      document.getElementById("CodigoMetodoPago").innerHTML = table2;
            }else{
              table += '</tr>'
                        + '<td>'
                          + 'Tiempo de entrega'
                        + '</td>'
                        + '<td>'
                          +  '1 dia'
                        + '</td>'
                      +'</tr>';
                      Precio_total += 8.500;
            }
            table += '<tr>'
                      + '<td>'
                        + 'Precio total'
                      + '</td>'
                      + '<td>'
                        +  '<strong> $'+ Precio_total +'</strong>'
                      + '</td>'
                    +'</tr>';



    document.getElementById("tablaCarritoCompras").innerHTML = table;
    
}


  function comprar(){
    var codigoCompleto = false;
    if(Metodo_pago == "pagoElectronico"){
      var refCod = firebase.database().ref("CODIGOS");
      var codigoUsuario = document.getElementById("codigoPago").value;

      for(var i= 2; i <= codigos.length; i++){
        if(codigoUsuario == codigos[i]){
          codigoCompleto = true;
        }

      }
      console.log("codigo: " +  codigoUsuario + " estatus: " +  codigoCompleto);
      if(codigoCompleto == true){

        refCod.orderByChild("codigo").equalTo(codigoUsuario).on("child_added", function(snapshot) {
          var id = snapshot.key;
          refCod.child(id).remove();
        });
 
      //CREAMOS UN NUEVO PEDIDO
       refUsuario.update({
        comprando: true
       });

       window.alert("Compra exitosa, su pedido estara en su puerta lo antes posible, si tienes alguna duda puedes contactarnos al +57 321 603 3639");
      }else{
         window.alert("Codigo invalido, si tienes alguna duda puedes contactarnos al +57 321 603 3639");
      }
    }else{
     //CREAMOS UN NUEVO PEDIDO
     refUsuario.update({
      comprando: true
     });
     window.alert("Compra exitosa, su pedido estara en su puerta lo antes posible, si tienes alguna duda puedes contactarnos al +57 321 603 3639");
    }
  }