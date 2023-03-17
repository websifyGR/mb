  function GetClips(movieID) {  
   fetchClips(movieID);
  }
  
  function spinoff(spinID) {
   var elem = document.getElementById(spinID).innerHTML; 	  
   document.getElementById(spinID).innerHTML = '';
   //console.log(elem);
  }
  
 var fetchClips = async (movieID) => {
	
    var allClips = await fetch('https://api.themoviedb.org/3/movie/' + movieID + '/videos?api_key=ab166ff82684910ae3565621aea04d62&language=en-US');
    var movieClipsJson = await allClips.json();
    var movieClips = movieClipsJson.results;	
		
    var clipsHTML = '';
	var scriptJquery = '';

    if ( ObjectLength(movieClips) > 10){
	  var limit = 10;
	}else{
	  var limit = ObjectLength(movieClips);	
	} 
	
	for (let ic = 0; ic < limit; ic++) {	
	
    clipsHTML = clipsHTML + '<div class="alert alert-warning" role="alert">' + movieClips[ic].name + '</div><span id="' + ic + '"><div class="spinner-grow" style="width: 4rem; height: 4rem;" role="status"></div></span><div class="embed-responsive embed-responsive-16by9"><iframe onload="spinoff(' + ic + ');" class="embed-responsive-item" src="https://www.youtube.com/embed/' + movieClips[ic].key + '?rel=0" allowfullscreen></iframe></div>';	
		
	}
	
	document.getElementById('offcanvasVIDEOSContent').innerHTML = clipsHTML;
 }

 

 
