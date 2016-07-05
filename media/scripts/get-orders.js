// Process the order on client sidebar

//var socket = io.connect();
//console.log(socket);
var order = [];
/* Order Array Map */
/* 0 - OrderID, 1 - Student ID, 2 - Student Name, 3 - entrees, 4 - fruitsVegetablesArray[0], 5 - fruitsVegetablesArray[1] or null, 6 - beverages */

// When the order is confirmed, create the disabled cookie
console.log("AMERICA WAS CALLED");
	// Request orders from DB
	//socket.emit('GetOrders', SchoolID);
	
	// When server returns orders, display
	/*socket.on('GetOrders', function(SchoolID) {
		// Set Order Selections
		order[0] = entrees;
		order[1] = fruitsVegetablesArray[0];
		if (fruitsVegetablesArray[1] != null) {
			order[2] = fruitsVegetablesArray[1];
		}
		order[3] =  beverages;
		
		console.log(order);
	});*/