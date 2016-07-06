var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.use(express.static(__dirname));

// Handle Connections
io.sockets.on('connection', function (socket) {

	// When an order is recieved process it
	socket.on('NewOrder', function(Order) {
		// Process payment
		// Submit order to database
		// If both above are good emit true to client
		var status = true;
		socket.emit('NewOrder', status);
	});
	
	// SFS Requests Orders for their School
	socket.on('GetOrders', function(PassSchoolID) {
		var SchoolID = SchoolID;
		var order = [];
		
		// Push dummy date
		order.push(["SHS00001000", "24676637", "Joshua Myerson", "Chicken Patty Sandwich", "Assorted Fruit Cup", "Baby Carrots", "Chocolate Milk", "$2.50", "Fulfilled"]);
		order.push(["SHS00001001", "24812309", "CJ Goodall", "Italian Sub", "Assorted Fruit Cup", "Apple", "Vanilla Milk", "$2.50", "Fulfilled"]);
		order.push(["SHS00001002", "25760134", "Thomas Jefferson", "Penne Pasta w/Meat Sauce", "Assorted Fruit Cup", "Watermelon", "Orange Juice", "$2.50", "Fulfilled"]);
		
		// Return order array
		socket.emit('GetOrders', order);
	});
	
	// SFS Marks the Order as Fulfilled
	socket.on('SetFulfilled', function(OrderID) {
		// Update DB
		var status = true;
		socket.emit('SetFulfilled', status);
	});
	
	// When a client requests to see their order
	socket.on('GetMyOrder', function(Username) {
		// Return order array
		socket.emit('MyOrder', order);
	});
	
	// When a client updates their payment pin
	socket.on('UpdatePayment', function(Username, Pin) {
		// Return order array
		socket.emit('UpdatePayment', status);
	});
	
	// When a client updates their language
	socket.on('GetLanguage', function(username) {
		// Return order array
		socket.emit('GetLanguage', status);
	});
});

server.listen(8082);
console.log('Express Order Running at 8082');