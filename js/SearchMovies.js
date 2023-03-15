$(document).ready(function(){

function renderHTML(movies){

var contentHTML        = '';
var divClassCol        = '<div class="col" style="margin-top:40px;">';
var divClassCard       = '<div class="card h-100" style="position:relative;">';
var divClassCardBody   = '<div class="card-body">';
var divClassCardFooter = '<div class="card-footer">';
var divClassFilm1      = '<i class="bi bi-camera-reels div-Class-Film1"></i>';
var divClassFilm2      = '<span class="div-Class-Film2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg></span>';
var divClassFilm3      = '<img class="div-Class-Film3" src="images/movie_trailer.png" alt="Movie Trailer">';
var endDiv             = '</div>';

for (let i = 0; i < ObjectLength(movies); i++) {

  if(movies[i].poster_path) {
    var image = '<a href="#"><img src="https://image.tmdb.org/t/p/w500' + movies[i].poster_path + '" class="card-img-top" alt="' + movies[i].original_title + '"></a>';
  }else{
    var image = '<a href="#"><img src="images/image_no_image.jpg" class="card-img-top" alt="' + movies[i].original_title + '"></a>';
  }
 
var contentHTML = contentHTML 

                      + divClassCol 
					  + divClassCard 
					  
					  + '<a href="#">' + divClassFilm2 + '</a>'
					  + '<button type="button" class="btn btn-primary position-relative">Μέση Βαθμολογία<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">' + movies[i].vote_average.toFixed(2) + '<span class="visually-hidden">unread messages</span></span></button>'
                      
					  + image 
                      
					  + divClassCardBody 
					  + '<a id="title_id_'+ movies[i].id +'" href="#"<h5 class="card-title">' + movies[i].original_title + '</h5></a>'
                      + endDiv
					  
                      +	divClassCardFooter				  
					  + '<p class="card-text">' + movies[i].overview.slice(0, 117) + '...</p>'   
					  + '<button type="button" class="btn btn-danger">' + movies[i].release_date.slice(0, 4) + '</button>'  
				      +	'&nbsp;&nbsp;&nbsp;'
					  + '<button type="button" id="details_id_'+ movies[i].id +'" class="btn btn-sm btn-outline-dark"><a style="text-decoration:none;" href="#">λεπτομέρειες</a></button>'
					  + endDiv

					  + endDiv
					  + endDiv; 

//console.log('function data: ',  jsonDATA[i].original_title);
//console.log(contentHTML);			  
}
  return contentHTML;
}

var search_term = '';
var buttonLoading = '<span class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></span>';

var fetchMovies = async () => {	

    document.getElementById('legendtext').innerHTML = 'Αναζήτηση για : ';	
    document.getElementById('searchingnow').innerHTML = buttonLoading;	

    var movies = await fetch('https://api.themoviedb.org/3/search/movie?api_key=ab166ff82684910ae3565621aea04d62&language=el-GR&query=' + search_term + '&page=1&include_adult=false');
    var data = await movies.json();
    if(data.total_results > 0){
        document.getElementById('showJsonBottomButton').style.display = "block";
        document.getElementById('legendbackdrop').style.display = "block";
        document.getElementById('tools-float-top-right').style.display = "block";	
    }else{
        document.getElementById('showJsonBottomButton').style.display = "none";
        document.getElementById('legendbackdrop').style.display = "none";	
        document.getElementById('botJson').style.display = "none";
        document.getElementById('tools-float-top-right').style.display = "none";
        $("#results").load("html/HTML_movies_initial_landing.html");
    }
    document.getElementById('results').innerHTML = renderHTML(data.results);
    document.getElementById('legendtext').innerHTML = 'Αναζήτηση για : ' + search_term;
    document.getElementById('searchingnow').innerHTML = '';
    var JSFormatt = JSON.stringify(data.results, null, '\t');
    document.getElementById('jsonraw').innerHTML = '';	
    document.getElementById('jsonraw').innerHTML = JSFormatt;
    var live = document.getElementById('live');
    document.getElementById('live').innerHTML = '';
    document.getElementById('live').innerHTML = document.getElementById('jsonraw').innerHTML;
    document.getElementById('live').style.backgroundColor = 'transparent';	
    var result = document.getElementById('live-result');
	document.getElementById('live-result').innerHTML = '';
    var formatter = new JSONFormatter(JSON.parse(JSON.stringify(data.results, null, '\t')), 3, { theme: 'dark', hoverPreviewEnabled: true });
    document.getElementById('live-result').appendChild(formatter.render());
	document.getElementById('prelive').innerHTML = '';
	document.getElementById('prelive').innerHTML = document.getElementById('live-result').innerHTML;
	document.getElementById('prelive').style.backgroundColor = '#1E1E1E';
	document.getElementById('offcanvasLEFTContent').innerHTML = '';
  //console.log('JSON LINES : ',document.getElementById('prelive').getElementsByTagName('*').length);
  //console.log(JSONFormatt.json);
    document.getElementById('moviescount').innerHTML = '';
    document.getElementById('moviescount').innerHTML = data.total_results;
    document.getElementById('offcanvasLEFTContent').innerHTML = document.getElementById('prelive').innerHTML;
    document.getElementById('offcanvasLEFTContent').style.backgroundColor = '#1E1E1E';
  //console.log('data.results:',data.total_results);
  //console.log('data.results:',data.results);
  //console.log('ObjectLength(data.results):',ObjectLength(data.results));
};

    $(document).ready(function(){
       setTimeout(function() {
	   $("#results").load("html/HTML_movies_initial_landing.html");	   
       }, 200);		
       setTimeout(function() {   
           document.getElementById('searchmovie').addEventListener('input', e => {
           search_term = e.target.value;
           fetchMovies();
          });
       }, 2000);		
    });
});