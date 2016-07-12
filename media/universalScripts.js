$(document).ready(function () {
	// Check if user is logged in
	if (localStorage.getItem("StuID") == null) {
	console.log("not logged in");
		var pname = window.location.pathname;
		var amt = pname.split("/").length;
		console.log(amt);
		switch(amt) {
			case 0:
				window.location.replace('login/index.html');
				break;
			case 1:
				window.location.replace('login/index.html');
				break;
			case 2:
				window.location.replace('../login/index.html');
				break;
			case 3:
				window.location.replace('../../login/index.html');
				break;
			case 4:
				window.location.replace('../../../login/index.html');
				break;
			case 5:
				window.location.replace('../../../../login/index.html');
				break;
			default:
				break;
		}
		
	}
	else {
		console.log("Logged in");
	}
	
	// Sidebar
	$(".sidenav").css({"left" : $(".sidenav").width() * -1 });

	$("input[name='fruitsVegetables']").change(function () {
		var maxAllowed = 2;
		var cnt = $("input[name='fruitsVegetables']:checked").length;
		if (cnt > maxAllowed) {
			$(this).prop("checked", "");
			$('#snackbar').html("You can only choose two from this group");
			showAlert();
		}
	});
	
	// If in blackout time, disable orders
	var currentdate = new Date(); 
	/*if (currentdate.getHours() >= 11 && currentdate.getHours() < 16) {
		$('.orderDisabled').show();
		$('.orderActive').hide();
		$('#orderActiveBtn').prop("disabled",true);
	}
	else */if (localStorage.getItem("OrderDisabled")) {
		$('.orderDisabled').show();
		$('.orderActive').hide();
		$('#orderActiveBtn').prop("disabled",true);
	}
	
	// Close sidenav jquery
	$(".closebtn, .container").click(function() {
		closeNav();
	});
});
function ordersDisabled() {
	$('#snackbar').html("Please check back at 4 PM EST to preorder.");
	showAlert();
}
// Show snackbar
function showAlert() {
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
// Open side nav
function openNav() {
	$(".sidenav").show(0);
	document.getElementById("sidenav").style.left = "0px";
}
// Close sidenav
function closeNav() {
	var width = $(".sidenav").width();
	document.getElementById("sidenav").style.left = (width * -1) + "px";
}
// Global Script to get a Cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return "";
}