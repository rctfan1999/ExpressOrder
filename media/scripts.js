$(document).ready(function () {
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
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

var close = document.getElementsByClassName("closebtn");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}

function openNav() {
    document.getElementById("sidenav").style.width = "250px";
    document.getElementById("container").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("container").style.marginLeft= "0";
}