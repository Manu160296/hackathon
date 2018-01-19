// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDW1o9U4yoqCKqmc_rZZJfULlQpcrE33m4',
  authDomain: 'producto-2ce12.firebaseapp.com',
  databaseURL: 'https://producto-2ce12.firebaseio.com',
  projectId: 'producto-2ce12',
  storageBucket: 'producto-2ce12.appspot.com',
  messagingSenderId: '846954295488'
};
firebase.initializeApp(config);
// login with google:
var user = null ;
var usuariosConectados = null;
// conexion a la base de datos:
var database = firebase.database();
// llave unica por conexion :
var conectadoKey = '';
var $loginBtn = $('#start-login');
$loginBtn.on('click', googleLogin) ;

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  //  funcion de la docummentacion :

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // guardamos el usuario que nos trae result:
      user = result.user;
      // mostramos su contenido:
      console.log(user);
      // ocultamos el div de login :
      //   $('#login').fadeOut();

      initAApp();
      // redireccion de página :
      window.location.href = 'views/home.html';
    });
}

function initAApp() {
  // referencia a una tabla en base de datos :
  usuariosConectados = database.ref('/connected');

  // 2 parámetros, el 2do si no tiene display name ,toma el email:

  login(user.uid, user.displayName || user.email);
}

function login(uid, name) {
  // se crea un objeto en la base de datos y se guarda en la referencia:

  var conectado = usuariosConectados.push({
    uid: uid,
    name: name
  });

  // identificador unico de registro :

  conectadoKey = conectado.key;
}

// en vista home :

var logOut = $('.log-out-js');
logOut.on('click', signOut);
function signOut() {
  firebase.auth().onAuthStateChanged(function(user) {
	  database.ref('/conected/' + conectadoKey).remove();
	  window.location.href = '../index.html';
  });
}

// login with email:
var send = $('.send-register-js');
console.log(send);

send.on('click', registrar);

function registrar() {
  var email = $('.register-email-js').val();
  var password = $('.password-register-js').val();
  console.log(email);
  console.log(password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      verificar();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}

var submit = $('.send-register2-js');
submit.on('click', signIn);
function signIn() {
  console.log('click');
  var email2 = $('.register-email2-js').val();
  var password2 = $('.password-register2-js').val();

  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);
    });
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('usuario activo ');
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
      console.log('no existe usuario activo');
    }
  });
}

observador();

/* Acceso a datos de firebase*/
var tablaDeBaseDatos = firebase.database().ref('chat');

/* CHAT */
var txtNombre = $('#name');
var txtMensaje = $('#message');
var btnEnviar = $('#btnEnviar');

btnEnviar.click(function(event) {
  event.preventDefault();
  var nombre = txtNombre.val();
  var mensaje = txtMensaje.val();
  var html = '<li><b>' + nombre + ':</b>' + mensaje + '</li>';
  chatUl.innerHTML += html;

  tablaDeBaseDatos.push({
    name: nombre,
    message: mensaje
  });
});

tablaDeBaseDatos.on('value', function(snapshot) {
  var html = '';
  snapshot.forEach(function(e) {
    var element = e.val();
    var nombre = element.name;
    var mensaje = element.message;
    html += '<li><b>' + nombre + ':</b>' + mensaje + '</li>';
  });
  chatUl.html = html;
});