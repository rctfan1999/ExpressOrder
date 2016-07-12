/*! process-order.js | (c) Joshua Myerson */

var socket = io.connect();

$("#orderForm").submit(function(event) {
	// Create order array
	var Order = [];
	console.log("Test");
	// Get School ID from cookie
	var SchoolID = localStorage.getItem("SchID");
	
	// Generate OrderID
	socket.emit('GenerateOrderID', SchoolID);
	
	socket.on('GenerateOrderID', function(GeneratedOrderID) {
		Order[0] = String(GeneratedOrderID);
		
		// Student ID
		Order[1] = localStorage.getItem("StuID");
		
		// Student Name
		Order[2] = localStorage.getItem("StuNme");
		
		// School ID
		Order[3] = SchoolID;
		
		// Entrées
		Order[4] = document.getElementById("entree").value;
		
		// Fruits and Vegetables
		Order[5] = document.getElementById("fruitsVegetables0").value;
		if($('#fruitsVegetables1').length !== 0) {
			Order[6] = document.getElementById("fruitsVegetables1").value;
		} else { 
			Order[6] = "null";
		}
		
		// Beverage
		Order[7] = document.getElementById("beverage").value;
		
		// We now need to clear all the temp localStorage variables related to the order
		localStorage.removeItem("Entree");
		localStorage.removeItem("FruitsVegetables");
		localStorage.removeItem("FruitsVegetables0");
		localStorage.removeItem("FruitsVegetables1");
		localStorage.removeItem("Beverage");
		
		// Price
		Order[8] = "$2.50";
		
		// Dates
		var date = new Date();
		Order[9] = date;
		Order[11] = date;
		
		// Fulfilled (defaults in DB to false)
		Order[10] = false;
		
		// Ordered Today (defaults in DB to true)
		Order[12] = true;
		
		//console.log(Order); // Display order for debug purposes
		
		// Submit to server
		socket.emit('NewOrder', Order);
		
		socket.on('NewOrder', function(status) {
			// Check status returned
			if (status) {
				var date = new Date();
				var expire = new Date();
				
				// Create a OrderDisabled localStorage object
				localStorage.setItem("OrderDisabled", true);
				
				// Return to the home screen
				window.location.replace("../../index.html");
				return false;
			}
		});
		return false;
	});
	return false;
});