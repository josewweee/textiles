var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var ref;
var sesion_google = false;
var auth2;
//var providerG = new firebase.auth.GoogleAuthProvider();  //instancia de google




// -------------------- FUNCION PARA INICIAR SESION CON FACEBOOK --------------------


/*function checkLoginState() {
  FB.getLoginStatus(function(response) {
    //statusChangeCallback(response);
    if (response.status === 'not_authorized') {

    }
  });
}*/

function FbSignIn(){
   FB.getLoginStatus(function(response) {
    //statusChangeCallback(response);
    if (response.status === 'not_authorized') {
      console.log("sesion iniciada en facebook pero no en la aplicacion, " + response.status);
      FB.logout(function(response) {console.log("loging out ...")});
    }else if (response.status === 'unknown'){
      console.log("no sabemos el estado de la cuenta, " + response.status);
      FB.logout(function(response) {console.log("loging out ...")});
    }else if (response.status === 'connected') {
      console.log("estamos conectados a fb, " + response.status);  
      FB.logout(function(response) {console.log("loging out ...")});
    }

    setTimeout(function() {
      var provider = new firebase.auth.FacebookAuthProvider(); //instancia de facebook
      provider.addScope('public_profile');
      var loggearFb = "null";
      var email;
      var nombre;
      //nos envia a la pagina de fb a loggearnos
      firebase.auth().signInWithRedirect(provider);
      //chekeamos si nos loggeamos correctamente
      //firebase.auth().signInWithPopup(provider).then(function(result){
        firebase.auth().getRedirectResult().then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        email = user.email;
        /*if(email != null && email != "" && email != "null"){
          var errores = true;
          for (var i = 0; i < email.length; i++){
            if(email[i] == '@'){
              errores = false;
            }
          }
          if(errores == true){
            throw "Porfavor inicia sesion con tu correo electronico";
          }
        }*/
        nombre = user.displayName;
          
        setTimeout(function() {
          var SearchRef = firebase.database().ref("USUARIOS");
          SearchRef.orderByChild('correo').equalTo(email).on("child_added", function(snapshot) {
          loggearFb = snapshot.val().correo;
          });
        }, 1000);


        setTimeout(function() {
          //if(errores == false){
            localStorage.setItem("USERNAME2", nombre);
            window.alert("Bienvenido " + nombre + " que bueno tenerte de vuelta");
            if(loggearFb == "null" || loggearFb == "undefined" || loggearFb == undefined){
              InformacionBaseDatosNoRedirect(email,nombre);
            }else{
              window.location.href="../../index.html";
            }
          //}
        }, 1000);
      
        

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }, 2000);
  });
  
  localStorage.setItem("PROVEEDOR","FACEBOOK");
}









// -------------------- FUNCION PARA INICIAR SESION CON GOOGLE --------------------


function loginGoogle(){

  var SearchRef = firebase.database().ref("USUARIOS");
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    var correo = user.email;
    var encontrado = false;
    var nombre = "vacio";
    nombre = user.displayName;
    /*var nombreFIREBASE;
    var key;
    var count = 0;*/

    SearchRef.orderByChild('correo').equalTo(correo).on("child_added", function(snapshot) {

       localStorage.setItem("USERNAME2", snapshot.val().nombre);
       encontrado = true;
    });

    setTimeout(function() {
      if(encontrado == false){
        InformacionBaseDatosNoRedirect(correo, nombre);
      }
    }, 2000);

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });


 /* var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);*/
}







// -------------------- FUNCION PARA AGREGAR INFORMACION A LA DB --------------------
function InformacionBaseDatosNoRedirect(correo,nombre){
  var ref = firebaseRef.child("USUARIOS");
  ref.push({
    correo: correo,
    nombre: nombre,
    apellido: "null",
    comprando: false,
    telefono: {telefonoCelular: "null", telefonoFijo: "null"},
    direccion: {direccion: "null", direccion2: "null", ciudad:"null", informacionAdicional: "null"},
    carritoCompras: {vaciar:"false",keyUsuario:"null", productos: {id:9999999999, nombre: "FINAL"}},
    foto: "null",
    historialCompras: "null",
    vaciarA: true,
    vaciarB: true
  });
}








// -------------------- FUNCION PARA INICIAR SESION CON LA FORMA CONVENCIONAL --------------------
function IniciarSeccion(){
	var email = document.getElementById('inputEmail').value;   
	var password = document.getElementById("inputPassword").value;
  var errores = false;


	firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  //MANEJO DE ERRORES
	  if (errorCode === 'auth/wrong-password'){
            errores = true;
            alert('Contraseña equivocada.');
            return;
          } else if (errorCode === 'auth/user-not-found'){
            errores = true;
            alert('Usuario no encontrado.');
            return;

      	  } else if(errorCode === 'auth/invalid-email'){
            errores = true;
      	  	alert('Email invalido.');
      	  	return;

      	  } else if(errorCode === 'auth/user-disabled'){
            errores = true;
      	  	alert('Usuario bloqueado.');
      	  	return;

      	  }else{
            errores = true;
      	  	alert(errorMessage);
      	  	return;
      	  }
	});

   window.alert("Bienvenido " + email + " que bueno tenerte de vuelta");
   localStorage.setItem("PROVEEDOR","LOCAL");
  setTimeout(function() {
    if(errores == false){
      window.location.href="../../index.html";
    }
  }, 1000);
  
}













// -------------------- FUNCION PARA TOMAR LOS VALORES DE KEY USUARIO Y NOMBRE DE USUARIO EN LOCALSTORAGE --------------------

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	var SearchRef = firebase.database().ref("USUARIOS");

	var correo = user.email;
  console.log("buscamos a " +  correo);
	var nombre = user.displayName;
  var nombreFIREBASE;
  var key;
  var count = 0;

	SearchRef.orderByChild('correo').equalTo(correo).on("child_added", function(snapshot) {
     
     nombreFIREBASE = snapshot.val().nombre;
		 key = snapshot.key;
		 ref = firebase.database().ref("USUARIOS/" + key);
     localStorage.setItem("USERKEY2", key);
     localStorage.setItem("USERNAME2", snapshot.val().nombre);
     console.log("tu nombre es: " + snapshot.val().nombre);
	});

  setTimeout(function() {
    console.log("HEY ESTAMOS LOGGEADOS Y ESTAMOS TOMANDO INFORMACION DESDE LOGIN.JS, " +  nombreFIREBASE)
    window.location.href="../../index.html";
  }, 1000);
    
  } else {
    console.log("nadie ha iniciado seccion");
  }
});


//--------------------- RAMON, ¿QUE ES ESTO?, REVISALO Y BORRARLO SI NO ES NECESARIO PORFA -----------//
function sumarUno(){
  var valor = document.getElementById( "cantidad" ).value;
  var num = parseInt( valor );
    console.log("valor: "+valor+" num: "+num);
    num++;
    console.log("valor: "+valor+" num: "+num);
  //document.getElementById( "cantidad" ).innerHTML = num ;
  document.getElementById("cantidad").value = num ;
}

function restarUnoCompras(){
  var valor = document.getElementById( "cantidad" ).value;
  var num = parseInt( valor );
    console.log("valor: "+valor+" num: "+num);
    if(num <= 1){
      num = 1;
    }else{
      num--;
    }
    console.log("valor: "+valor+" num: "+num);
    document.getElementById("cantidad").value = num ;
}












