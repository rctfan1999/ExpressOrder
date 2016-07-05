// Process the order on client sidebar

var socket = io.connect();
console.log(socket);
var order = [];
/* Order Array Map */
/* 0 - entrees, 1 - fruitsVegetablesArray[0], 2 - fruitsVegetablesArray[1] or null, 3 - beverages */

// When the order is confirmed, create the disabled cookie
$(".orderForm").submit(function(event) {
	
	// Set Order Selections
	order[0] = entrees;
	order[1] = fruitsVegetablesArray[0];
	if (fruitsVegetablesArray[1] != null) {
		order[2] = fruitsVegetablesArray[1];
	}
	order[3] =  beverages;
	//console.log(order);
	
	// Notify socket server
	socket.emit('NewOrder', order);
	
	console.log(order);
	
	socket.on('NewOrder', function(status) {
		console.log(status);
		console.log("Received");
		/*if (status) {
			// Disable Orders
			document.cookie = "orderDisabled=true; path=/;";
			
			// Go to Order Placed page
			event.preventDefault();
			window.location = "http://10.254.17.169:8082/order-placed/";
		}*/
	});
	return false;
});