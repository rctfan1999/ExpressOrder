/*! authenticate.js | (c) Joshua Myerson */

var socket = io.connect();
	console.log("Connected");
	$("#loginForm").submit(function(event) {
		var Username = document.getElementById("Username").value;
		
		// Here we would call AD and get School ID and Student Name
		document.cookie = "StuID="+ Username +"; path=/";
		document.cookie = "SchID=1286; path=/";
		document.cookie = "StuNme=Joshua Myerson; path=/";
		console.log(Username);
		window.location.replace("../../index.html");
		return false;
	});