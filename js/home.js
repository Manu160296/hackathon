$(document).ready(function() {
  $('.carousel').carousel();
  $('.carousel').carousel({
    interval: 2000
  });
  function moveToSelected(element) {
    if (element === 'next') {
      var selected = $('.selected').next();
    } else if (element === 'prev') {
      var selected = $('.selected').prev();
    } else {
      var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();

    $(selected).removeClass().addClass('selected');

    $(prev).removeClass().addClass('prev');
    $(next).removeClass().addClass('next');

    $(nextSecond).removeClass().addClass('nextRightSecond');
    $(prevSecond).removeClass().addClass('prevLeftSecond');

    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
  }

  // Eventos teclado
  $(document).keydown(function(event) {
    switch (event.which) {
    case 37: // left
      moveToSelected('prev');
      break;

    case 39: // right
      moveToSelected('next');
      break;

    default: return;
    }
    event.preventDefault();
  });
  // evento click
  $('#carousel div').click(function() {
    moveToSelected($(this));
  });

  $('#prev').click(function() {
    moveToSelected('prev');
  });

  $('#next').click(function() {
    moveToSelected('next');
  });


  // funcionalidad buscador :

  // nombrando variables necesarias:
  var arrResults = [];
  var idResults = [];
  var searchInput = $('#search-input-js');
  console.log(searchInput);
  var searchButton = $('#searchButton');
  console.log(searchButton);
  var movieList = $('#movieList');

  searchButton.on('click', function(event) {
    var searchText = $('#search-input-js').val();
    $('.carousel-js').addClass('hidden');
    console.log(searchText);
    getMovie(searchText);
  });

  // funcion que busca peliculas por el titulo:
  function getMovie(searchText) {
    $.getJSON('https://www.omdbapi.com/?&apikey=a00f7a66&s=' + encodeURI(searchText) + '&type=movie').then(function(response) {
      console.log(response);
      filterMovies(response);
    });
  }

  // getMovie('star wars');

  // funcion que filtra peliculas por e género:
  function filterMovies(response) {
    $('#container-movies-js').empty();
    var idResults = [];
    console.log(response);

    for (var i in response.Search) {
      console.log(response.Search);
      var movie = response.Search[i];
      var idSearch = movie.imdbID;
      idResults.push(idSearch);
    }
    console.log(idResults);

    for (var i = 0 ; i < idResults.length ; i++) {
      $.getJSON('https://www.omdbapi.com/?&apikey=3a181f1c&i=' + idResults[i])
        .then(function(response) {
          console.log(response);
          if (response.Genre.indexOf('Short') !== -1 || response.Genre.indexOf('Documentary') !== -1) {
            console.log('hola');
          } else if (response.Genre.indexOf('Adventure') !== -1 || response.Genre.indexOf('Animation') !== -1 || response.Genre.indexOf('Sci-Fi') !== -1 || response.Genre.indexOf('Action') === -1) {
            console.log(response);
            var li = $('<li class="list-group-item">');
            var img = $('<img src="' + response.Poster + '" with="50px">');
            var output = `
    <div class ="col-md-3">
    <div class = "well text-center">
    <img  src= "${response.Poster}">
    <h5> ${response.Title}</h5>
    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details </a>
    </div>
    </div>
    `;
            $('#container-movies-js').append(output);
          }
        });
    }
  };
});
