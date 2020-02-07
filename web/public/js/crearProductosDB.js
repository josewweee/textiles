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
var id = 0;
var vacio = ".";
var selectedFile;
var tipo = "null";




// -------------------- FUNCION PARA AGREGAR PRODUCTOS --------------------
function Añadir(){

	firebaseRef.child("PRODUCTOS/ZZZZZZZ").once("value", function(snapshot) {
		id = snapshot.val().totalProductos;
		id + 1;
	});

	setTimeout(function(){
		id = id + 1;
		var nombre = document.getElementById('nombre').value;
		var precio = document.getElementById("precio").value;
		var marca = document.getElementById("marca").value;
		tipo = document.getElementById("tipo").value;

		firebaseRef.child("PRODUCTOS").push({
			nombre: nombre,
	    	marca: marca,
			precio: precio,
			foto: "null",
			gif:"null",
			descripcion:"null",
			id: id,
			disponibles: 10,
			numCompras: 0,
			tipo: tipo,
			recomendado: false
		});

		firebaseRef.child("PRODUCTOS/ZZZZZZZ").update({
			totalProductos: id
		})
		document.getElementById("nombre").innerHTML = vacio;
		document.getElementById("precio").innerHTML = vacio;
		setTimeout(function(){
			CargarFoto();
		}, 4000);

	}, 4000);

}


/*
// -------------------- FUNCION ACTUALIZAR TODOS LOS PRODUCTOS--------------------
function Agregar(){
	var keys = [" ", " "];
	var recomendado = document.getElementById("recomendado").value;
	firebaseRef.child("PRODUCTOS").on("child_added", function(snapshot) {
		keys.push(snapshot.key);
	});
	
	setTimeout(function(){
		for(j = 2; j < keys.length; j++){
			firebaseRef.child("PRODUCTOS").child(keys[j]).update({
				recomendado : false
			});
		}
		console.log(keys);
    }, 3000)
	
}

*/




// -------------------- FUNCION PARA CARGAR FOTOS --------------------
/*document.getElementById('file').onchange = function() {
	selectedFile = event.target.files[0];
}*/

document.getElementById('file').addEventListener('change',prepareUpload,false);
function prepareUpload(event)
{
  selectedFile = event.target.files[0];
}

function CargarFoto(){
	var fileName = selectedFile.name;
	var NombreProducto = id;
	var storageRef = firebase.storage().ref();
	storageRef = storageRef.child("productos/" +  fileName);
	var uploadTask = storageRef.put(selectedFile);
	var key_Producto;


	uploadTask.on('state_changed', function(snapshot){
  	  // Observe state change events such as progress, pause, and resume
  	  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	 /* var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED: // or 'paused'
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING: // or 'running'
	      console.log('Upload is running');
	      break;
	    }*/
	}, function(error) {
  		window.alert("Error al subir la imagen, intenta de nuevo");
	}, function() {
  		var downloadURL = uploadTask.snapshot.downloadURL;
  		var firebaseRef = firebase.database().ref("PRODUCTOS");
  		firebaseRef.orderByChild('id').equalTo(id).on("child_added", function(snapshot) {
				key_Producto = snapshot.key
		});

  		setTimeout(function(){
	  		firebaseRef.child(key_Producto).update({
	  			foto: downloadURL
	  		});
  		}, 4000);
   		//console.log(downloadURL);
   		window.alert("Foto Agregada Exitosamente");
	});
}




// -------------------- FUNCION PARA EL PREVIEW DE LA FOTO A MONTAR --------------------
function PreviewPhoto(input, cualPreview){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function (e){
			if(cualPreview == 1){
				$('#preview img').attr('src', e.target.result);
			}else{
				$('#preview2 img').attr('src', e.target.result);

			}
		}
		reader.readAsDataURL(input.files[0]);
	}
}

document.getElementById('file').onchange = function() {
	PreviewPhoto(this, 1);
}






// -------------------- FUNCION PARA USAR EL BUSCADOR --------------------
function Buscar(){
  var imagenes;
  var queryText = document.getElementById("srchFld").value;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "];
  var descripcion = [" ", " "];
  var id = [" ", " "];

    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
        foto_Url.push(snapshot.val().foto);
        nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        id.push(snapshot.val().id);
    });
     queryText = parseInt(queryText);
    firebaseRef.child("PRODUCTOS").orderByChild('id').equalTo(queryText).on('child_added', function(snapshot) {
        foto_Url.push(snapshot.val().foto);
        nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        id.push(snapshot.val().id);
    });

    setTimeout(function(){
    	var j = 2;
        while(j < foto_Url.length){
	    	imagenes += '<li>';
	        imagenes += '<img src="'+foto_Url[j]+'" style="width:200px;height:200px;" alt=""/>';                                
	        imagenes += '<p><span> Nombre del producto: </span>' + nombre[j] +'</p>';
	        imagenes += '<p><span> id del producto: </span>' + id[j] + '</p>';
	        imagenes += '</li>';
	        j++;
        }
        document.getElementById("fotos_Busqueda").innerHTML = imagenes;
    }, 3000);

}




// -------------------- FUNCION ACTUALIZAR 1 PRODUCTO--------------------



document.getElementById('file2').addEventListener('change',prepareUpload2,false);
function prepareUpload2(event)
{
  selectedFile = event.target.files[0];
  PreviewPhoto(this, 2);
}

function Actualizar(){

	var queryText = document.getElementById("ID_producto").value;
	id = parseInt(queryText);
	firebaseRef.child("PRODUCTOS").orderByChild('id').equalTo(id).on("child_added", function(snapshot) {
		tipo = snapshot.val().tipo
		
	});
	setTimeout(function() {
		CargarFoto();
	}, 3000);
	
}
