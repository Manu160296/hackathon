$('.carousel.carousel-slider').carousel({fullWidth: true});

$(".dropdown-button").dropdown();

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
    <div class ="col-md-3 prueba-contenedor">
    <div class = "well text-center">
    <img  src= "${response.Poster}">
    <h5> ${response.Title}</h5>
    <a data-id="${response.Title}" data-title="${response.Title}" data-genere= "${response.Genre}" data-director="${response.Director}"  data-plot="${response.Plot}"  data-poster="${response.Poster}"  data-actors="${response.Actors}" class="btn btn-primary prueba" href="#">Movie Details </a>
    </div>
    </div>
    `;
    //aqui
    $('#container-movies-js').append(output);
    $('.prueba-contenedor').on('click', function (event) {
      event.preventDefault()
      var title = event.target.dataset.title;
      var genere = event.target.dataset.genere;
      var director = event.target.dataset.director;
      var plot = event.target.dataset.plot;
      var poster = event.target.dataset.poster;
      var actors = event.target.dataset.actors;
      
      sessionStorage.setItem('title', title);
      sessionStorage.setItem('genere', genere);
      sessionStorage.setItem('director', director);
      sessionStorage.setItem('plot', plot);
      sessionStorage.setItem('poster', poster);
      sessionStorage.setItem('actors', actors);
      window.location = 'movie.html';
         return false;
      // console.log($(this))
     }) 
          }
        });
    }
   
  };

  function getResult () {
    var movieId = sessionStorage.getItem('movieId');
    var movieTitle = sessionStorage.getItem('title');
    var movieGenere = sessionStorage.getItem('genere');
    var movieDirector = sessionStorage.getItem('director')
    var moviePlot = sessionStorage.getItem('plot');
    var moviePoster = sessionStorage.getItem('poster');
    var movieActors = sessionStorage.getItem('actors');

    var output = `
<div class="row">
<div class = "col-md-4">
 <img src = "${moviePoster}" class = "thumbnail">
</div>
<div class="col-md-8">
<h2>${movieTitle}</h2> 
<ul class ="list-group">
<li class="list-group-item"><strong> Genere: </strong> ${movieGenere}</li>
<li class="list-group-item"><strong> Director: </strong> ${movieDirector}</li>
<li class="list-group-item"><strong> Actors: </strong> ${movieActors}</li>
<li class="list-group-item"><strong> Plot: </strong> ${moviePlot}</li>
</ul>
</div>
</div>
<div class= "row">
<div class = "well">
<h3>Plot </h3>

<hr>
<a href="home.html" class="btn btn-default">Go Back To Search</a>
</div>
</div>
`;
$('#movie-description').html(output);

  }

 
 

  
//});
