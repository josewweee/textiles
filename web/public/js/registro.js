/*var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
//firebase.initializeApp(config);*/

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();



//FUNCION DE REGISTRO DE USUARIO
function Registrarse(){

	var name = document.getElementById('inputName').value;
	var email = document.getElementById('input_email').value;
	var password = document.getElementById("inputPassword1").value;
	var password2 = document.getElementById("inputPassword2").value;
	var errores = false;
	//CHECKEAMOS SI LAS CONTRASEÑAS COINCIDEN
	if(password.length > 5){
		if(password.toString() == password2.toString()){
			firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;

				if (errorCode === 'auth/wrong-password') {
			        alert('Contraseña equivocada.');
			        errores = true;
			        return;
			    } else {
			    	errores = true;
			        alert(errorMessage);
			        return;
			    }
			});
		}else{
			window.alert("Las contraseñas son distintas, asegurate de escribirlas bien");
			return;
		}	
	}else{
		window.alert("La contraseña debe tener al menos 6 caracteres");
			return;
	}

	setTimeout(function(){
		if(errores == false){
		       InformacionBaseDatos(email,name);
		}else{
			console.log("problemas");
		}
	},1000);

}


//FUNCION DE AGREGAR INFORMACION A LA DB
function InformacionBaseDatos(correo,nombre){
	var ref = firebaseRef.child("USUARIOS");
	console.log("entramos");
	ref.push({
		correo: correo,
		nombre: nombre,
		vaciarA: true,
		vaciarB: true,
		comprando: false,
		apellido: "null",
		telefono: {telefonoCelular: "null", telefonoFijo: "null"},
		direccion: {direccion: "null", direccion2: "null", ciudad:"null", informacionAdicional: "null"},
		carritoCompras: {vaciar:"false",keyUsuario:"null", productos: {id:9999999999, nombre: "FINAL"}},
		foto: "null",
		historialCompras: "null"
	});
	window.alert("Registro Exitoso");
	setTimeout(function() {
		window.location.href="../../index.html";
	}, 1000);
	//CambiarVista();
}


//FUNCION PARA PASAR DE VISTA HTML
function CambiarVista(){
	var user = firebase.auth().currentUser;
	if (user) {
	  console.log("seccion iniciada");
	  //MOVER LA FUNCION ADDUSER_INFO() ACA
	  setTimeout(function(){
                window.location.href="index.html";
            }, 3000);
	} else {
	  alert("nadie ha iniciado seccion, R");
	  return;
	}
}
