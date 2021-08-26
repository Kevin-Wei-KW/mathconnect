// Get the header
var navbar = document.getElementById("topnavbar");
var navbartoggler = document.getElementById("navbutton");
var check = document.getElementById("navbarSupportedContent").getAttribute('aria-expanded');
var hwexpand = document.getElementById("navbarDropdown");
var hwexpandcheck = document.getElementById("navbarDropdown").getAttribute('aria-expanded');;

var dropdownheight = "448px";
var expandheight = "270px"

function redirect() {
	name = document.getElementById("fname").value;
	email = document.getElementById("email").value;
  topic = document.getElementById("subject").value;
	message = document.getElementById("description").value;

	window.location.href = 'mailto:pottsmathhelp@gmail.com?subject=' + topic + '&body=' + name + ' (' + email + ')%0D%0A%0D%0A' + message;
	document.getElementById("fname").value = null;
	document.getElementById("email").value = null;
	document.getElementById("subject").value = null;
  document.getElementById("description").value = null;
	document.getElementById("formsubmit").value = "Thanks for contacting us!"
	document.getElementById("formsubmit").style.transform = "scale(0.8)"
	document.getElementById("formsubmit").style.margin = "auto"
	document.getElementById("formsubmit").style.right = "4%"
  return false;
}

function resizeIframe(iframe) {
	iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
}


if (document.getElementById("big")) {
	var sticky = document.getElementById('big').offsetHeight;
	window.addEventListener("resize", function () {
		sticky = document.getElementById('big').offsetHeight;
	});
	navbartoggler.addEventListener("mouseup", function (evt) {
		check = navbartoggler.getAttribute('aria-expanded');

		if (check == "false") {
			navbar.style.height = expandheight;
		} else if (check == "true") {
			navbar.style.height = "60px";
		}

	});

	hwexpand.addEventListener("mouseup", function (evt) {

		hwexpandcheck = document.getElementById("navbarDropdown").getAttribute('aria-expanded');
		check = navbartoggler.getAttribute('aria-expanded');
		console.log(hwexpandcheck, check)
		if (hwexpandcheck === "true" && check === "true") {
			navbar.style.height = "300px";

		} else if (hwexpandcheck === "false" && check === "true") {
			navbar.style.height = dropdownheight;
		}

	});

	function stick() {
		//When scroll position reaches the navbar position
		if (window.pageYOffset > sticky) {
			// if navbar is not expanded 
			if (navbar.style.height != expandheight && navbar.style.height != dropdownheight) {
				// add class "sticky" to navbar so it sticks at the top of the page
				navbar.classList.add("sticky");
				// remove Bootstrap class "navbar-dark" and replace it with "navbar-light" to change the colour of the text
				navbar.classList.remove("navbar-dark");
				navbar.classList.add("navbar-light");
				// change the hight to 60px
				navbar.style.height = "60px";
			}
		} else {
			// if nav bar is not expanded
			if (navbar.style.height != expandheight && navbar.style.height != dropdownheight) {
				// remove the class "sticky" so the nav bar does not stick at the top of the page anymore
				navbar.classList.remove("sticky");
				// remove Bootstrap class "navbar-light" and replace it with "navbar-dark" to change the colour of the text
				navbar.classList.remove("navbar-light");
				navbar.classList.add("navbar-dark");
				// change the height of the navbar to 9% of the viewport height
				navbar.style.height = "9vh";
			}
		}
	}
	//check function stick() when scroll is detected
	window.onscroll = function () { stick() };
}

stick();