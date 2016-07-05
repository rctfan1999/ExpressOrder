$(document).ready(function () {
//onload settings

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
});

function showAlert() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

$(".closebtn, .container").click(function() {
	closeNav();
});

function openNav() {
	$(".sidenav").show(0);
    document.getElementById("sidenav").style.left = "0px";
}

function closeNav() {
	var width = $(".sidenav").width();
    document.getElementById("sidenav").style.left = (width * -1) + "px";
}
