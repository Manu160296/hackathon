var txtNombre = document.getElementById('nombre');
var txtMensaje = document.getElementById('mensaje');
var btnEnviar = document.getElementById('btnEnviar');
var chatUl = document.getElementById('chatUl');

btnEnviar.addEventListener("click", function() {
  var nombre = txtNombre.value;
  var mensaje = txtMensaje.value;
  var html = "<li><b>"+nombre+": </b>"+mensaje+"</li>";
  chatUl.innerHTML += html;

  firebase.database().ref('chat').push({
      name: nombre,
      menssaje: mensaje
  });
});

firebase.database().ref('chat')
.on('value', function(snapshot) {
    var html = '';
    snapshot.forEach(function (e) {
      var element = e.val();
      var nombre = element.name;
      var mensaje = element.menssaje;
      html+= "<li><b>"+nombre+": </b>"+mensaje+"</li>";
    });
    chatUl.innerHTML = html;
});
