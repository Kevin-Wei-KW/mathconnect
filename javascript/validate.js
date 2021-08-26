
function load(){
	val = prompt("This page is password protected.\n Please enter the password.")
	
	if (val == "mathrules"){	
		document.getElementsByTagName("body")[0].style.filter = "none";
		document.getElementsByTagName("body")[0].style.webkitFilter = "none";
		
	}else{
		window.location = "error.html";
	}
	

}
var x = setTimeout(function(){
	document.addEventListener("DOMContentLoaded", load());
},400)


