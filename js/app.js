// Initialize Firebase
var config = {
    apiKey: "AIzaSyDW1o9U4yoqCKqmc_rZZJfULlQpcrE33m4",
    authDomain: "producto-2ce12.firebaseapp.com",
    databaseURL: "https://producto-2ce12.firebaseio.com",
    projectId: "producto-2ce12",
    storageBucket: "producto-2ce12.appspot.com",
    messagingSenderId: "846954295488"
  };
  firebase.initializeApp(config);
// login with google:
  var user = null ; 
  var usuariosConectados = null;
  //conexion a la base de datos:
  var database = firebase.database();
  // llave unica por conexion :
  var conectadoKey = '';
  var $loginBtn = $('#start-login');
  $loginBtn.on('click', googleLogin) ;

  function googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();

      // funcion de la docummentacion :

      firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result){
          //guardamos el usuario que nos trae result:
          user = result.user;
          //mostramos su contenido:
          console.log(user);
          //ocultamos el div de login :
       //   $('#login').fadeOut();

          initAApp();
        // redireccion de página :
        window.location.href = 'views/home.html'
      })
  }

 function initAApp () {
     // referencia a una tabla en base de datos :
     usuariosConectados = database.ref('/connected');

     // 2 parámetros, el 2do si no tiene display name ,toma el email:

     login(user.uid, user.displayName || user.email);

 }

 function login(uid, name) {
     // se crea un objeto en la base de datos y se guarda en la referencia:

     var conectado = usuariosConectados.push({
         uid:uid,
         name: name 
     });

     // identificador unico de registro :

     conectadoKey = conectado.key;
 }

 //en vista home : 
 
 var logOut = $('.log-out-js');
logOut.on('click', signOut);
function signOut() {
  firebase.auth().onAuthStateChanged(function(user) {
	  database.ref('/conected/' + conectadoKey).remove();
	  window.location.href = '../index.html';
  });
}
