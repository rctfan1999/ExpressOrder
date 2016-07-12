/*! authenticate.js | (c) Joshua Myerson */

var socket = io.connect();
console.log("Connected");
$("#loginForm").submit(function(event) {
	var Username = document.getElementById("Username").value;
	
	// Check if user is in our database
	socket.emit("CheckUser", Username);
	socket.on("CheckUser", function(count) {
		if (count == "1") {
			// Here we would call AD and get School ID and Student Name
			socket.emit('GetUserMeta', Username);
			
			socket.on('GetUserMeta', function(data) {
				localStorage.setItem("StuID", Username);
				localStorage.setItem("SchID", data.SchoolID);
				localStorage.setItem("StuNme", data.StudentName);
				
				if(data.OrderedToday) {
					localStorage.setItem("OrderDisabled", true);
				}
				
				// Go to home screen
				window.location.replace("../index.html");
				return false;
			});
		}
		else {
			// Tell database we have a new user
			socket.emit('NewUser', Username);
			socket.on("NewUser", function(data) {
				localStorage.setItem("StuID", Username);
				localStorage.setItem("SchID", data.SchoolID);
				localStorage.setItem("StuNme", data.StudentName);
				
				// Go to home screen
				window.location.replace("../index.html");
				return false;
			});
		}
	});
	return false;
});