$(document).ready(function(){

function renderHTML(movies){

var contentHTML        = '';
var divClassCol        = '<div class="col" style="margin-top:40px;">';
var divClassCard       = '<div class="card h-100" style="position:relative;">';
var spanClassImageWr   = '<span clas="movie-image-wrapper">';
var divClassCardBody   = '<div class="card-body">';
var divClassCardFooter = '<div class="card-footer">';
var endSpan            = '</span>';
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
					  
					  + '<span id="openVideosButton_' + movies[i].id + '"></span>'
					  + '<button type="button" class="btn btn-primary position-relative">Μέση Βαθμολογία<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">' + movies[i].vote_average.toFixed(2) + '<span class="visually-hidden">unread messages</span></span></button>'
                      
					  + spanClassImageWr
					  + image
					  + '<div class="movie-id">Movie ID : ' + movies[i].id + '</div>'
					  + endSpan

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

					  
 fetchVideos(movies[i].id); // Le Brand : βλέπω εάν υπάρχουν διαθέσιμα videos για αυτή την ταινία ώστε να τα δώσω αργότερα σε ένα πλαίσιο offcanvas					  
					  
//console.log('function data: ',  jsonDATA[i].original_title);
//console.log(contentHTML);			  
} // end for loop
  return contentHTML;
}

var fetchVideos = async (movieID) => {	
	var openVideosButton = '';
	var divClassFilm     = '<span title="Βρέθηκαν διαθέσιμα Trailers. Πατήστε εδώ για να φορτώσουν" class="div-Class-Film2"><img class="blink-image" src="../images/film-24.png" alt="Video Clip"></span>';
	var divClassNoFilm   = '<span title="Δυστυχώς δε βρέθηκαν διαθέσιμα Trailers για αυτή την ταινία" class="div-Class-Film2"><img src="../images/film-24.png" alt="Video Clip"></span>';
	
    var videos = await fetch('https://api.themoviedb.org/3/movie/' + movieID + '/videos?api_key=ab166ff82684910ae3565621aea04d62&language=en-US');
    var clips = await videos.json();
    var clipsCount = ObjectLength(clips.results);
	//console.log('clips.results : ',clips.results);
	//console.log('MovieID,clipsCount : ',movieID,clipsCount);
	if(clipsCount > 0){
	openVideosButton = '<span onClick="GetClips('+ movieID +');" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVIDEOS" aria-controls="offcanvasVIDEOS">' + divClassFilm + '</span>';
	}else{
	openVideosButton = divClassNoFilm;	
	}
	document.getElementById('openVideosButton_' + movieID).innerHTML = openVideosButton;
};


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
	document.getElementById('offcanvas-movie-title').innerHTML = search_term;
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