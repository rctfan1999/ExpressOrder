/*! authenticate.js | (c) Joshua Myerson */

var socket = io.connect();
console.log("Connected");
$("#loginForm").submit(function(event) {
	var Username = document.getElementById("Username").value;
	
	// Here we would call AD and get School ID and Student Name
	socket.emit('UserJoined', Username);
	
	socket.on('UserJoined', function(data) {
		document.cookie = "StuID="+ Username +"; path=/";
		document.cookie = "SchID="+ data.SchoolID +"; path=/";
		document.cookie = "StuNme="+ data.StudentName +"; path=/";
		
		console.log(Username);
		console.log(data.SchoolID);
		console.log(data.StudentName);
		
		//window.location.replace("../../index.html");
		//return false;
	});
	return false;
});