/*! process-order.js | (c) Joshua Myerson */

var socket = io.connect();
console.log("Reached");

$("#orderForm").submit(function(event) {
	console.log("Reached form submission");
	// Create order array
	var Order = [];
	
	// OrderID
	Order[0] = getCookie("SchID") + Math.random();
	
	// Student ID
	Order[1] = getCookie("StuID");
	
	// Student Name
	Order[2] = getCookie("StuNme");
	
	// Entrées
	Order[3] = document.getElementById("entree").value;
	
	// Fruits and Vegetables
	Order[4] = document.getElementById("fruitsVegetables0").value;
	//if(document.getElementById("fruitsVegetables1").value != null) {
		//Order[5] = document.getElementById("fruitsVegetables1").value;
	//} else { 
		//Order[5] = "null";
	//}
	
	// Beverage
	Order[6] = document.getElementById("beverage").value;
	
	// Pice
	Order[7] = "$2.50";
	
	// Dates
	var date = new Date();
	Order[8] = date;
	Order[10] = date;
	
	// Fulfilled (defaults in DB to false)
	Order[9] = false;
	
	// Ordered Today (defaults in DB to true)
	Order[11] = true;
	
	console.log(Order);

	// Submit to server
	socket.emit('NewOrder', Order);
	
	socket.on('NewOrder', function(status) {
		// Check status returned
		if (status) {
			return false;
		}
	});
	
	// Handles getting cookies
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
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
	
	window.location.replace("../../index.html");
	return false;
});