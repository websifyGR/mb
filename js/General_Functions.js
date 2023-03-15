function ObjectLength(object) {
  var length = 0; 
	for( var key in object ) {
	   if( object.hasOwnProperty(key) ) {
		 ++length;
	   }
	} 
	return length;	
};

function ToggleElement(TogglerElementID,ContentElementID,TogglerTextShow,TogglerTextHide){
/*
EXAMPLE :
  <button id="TogglerElementID" onClick="ToggleElement('TogglerElementID','ContentElementID','Show Content','Hide Content');">Show Content</button>
  <div id="ContentElementID" style="display: none;">Element Content</div>
*/
  if(document.getElementById(ContentElementID).style.display === 'block'){
	 document.getElementById(ContentElementID).style.display = "none";
	 document.getElementById(TogglerElementID).innerHTML = TogglerTextShow;		
  }else{
	 document.getElementById(ContentElementID).style.display = "block";
	 document.getElementById(TogglerElementID).innerHTML = TogglerTextHide;
  }
}
