var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.use(express.static(__dirname));

// Handle Connections
io.sockets.on('connection', function (socket) {

	// When an order is recieved process it
	socket.on('NewOrder', function(order) {
		// Process payment
		// Submit order to database
		// If both above are good emit true to client
		var status = true;
		socket.emit('NewOrder', status);
	});
	
	// SFS Requests Orders for their School
	socket.on('GetOrders', function(schoolID) {
		// Return order array
		socket.emit('GetOrders', orders);
	});
	
	// SFS Marks the Order as Fulfilled
	socket.on('SetFulfilled', function(OrderID, Username) {
		// Return order array
		socket.emit('SetFulfilled', status);
	});
	
	// When a client requests to see their order
	socket.on('GetMyOrder', function(username) {
		// Return order array
		socket.emit('MyOrder', order);
	});
	
	// When a client updates their payment email
	socket.on('UpdatePayment', function(username, email) {
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
console.log('Expres Order Running at 8082');