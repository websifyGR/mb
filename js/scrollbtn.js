window.onscroll = function() { scrollFunction('gototop') };

function scrollFunction(buttonID) {
  var gototopbutton = document.getElementById(buttonID);	
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    gototopbutton.style.display = "block";
  } else {
    gototopbutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
