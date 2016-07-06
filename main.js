var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	globals = require('globals'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

	app.use(express.static(__dirname));
	
	// Connect to Orders
	MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
		// Handle errors
		assert.equal(null, err);
		//db.collection('Users').remove({})
	});

// Handle Connections
io.sockets.on('connection', function (socket) {
	
	// When a new user joins
	socket.on('UserJoined', function(Username) {
		// Connect to Users
		MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
		
			// Handle errors
			assert.equal(null, err);
			
			// Create user
			db.collection('Users').insert(
				{"StudentID": Username,
				"StudentName": "Joshua Myerson",
				"SchoolID": "5"
				}
			);
			console.log("User Created");
			
			/*// List all StudentID's for debug purposes
			var found = db.collection('Users').find();
			found.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					console.log(doc);
				}
			});*/
			//db.close();
		});
		var StuName = "Joshua Myerson";
		var SchID = "5";
		
		socket.emit('UserJoined', {StudentName: StuName, SchoolID: SchID});
	});
	
	// When an order is received process it
	socket.on('NewOrder', function(Order) {
		// Process payment
		
		// Create
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
			db.collection('Order').insert(
				{"OrderID": Order[0],
				"StudentID": Order[1],
				"StudentName": Order[2],
				"Entree": Order[3],
				"FruitsVegetables1": Order[4],
				"FruitsVegetables2": Order[5],
				"Beverage": Order[6],
				"Price": Order[7],
				"DateOrdered": Order[8],
				"Fulfilled": Order[9],
				"DateFulfilled": Order[10],
				"OrderedToday": Order[11]
				}
			);
			//db.close();
		});
		
		// If both above are good emit true to client
		var status = true;
		socket.emit('NewOrder', status);
	});
	
	// SFS Requests Orders for their School
	socket.on('GetOrders', function(PassSchoolID) {
		
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
	socket.on('GetMyOrder', function(PassUsername) {
	
		// Connect to Orders
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
		
		// Handle errors
		assert.equal(null, err);
			var found = db.collection('Orders').find();
			found.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					console.log(doc);
				}
			});
		});
		db.close();
		
		// Search array for where Username = Student ID
		for (var y = 0; y < order.length; y++) {
			if(order[y][1] == PassUsername) {
				// Return order array
				socket.emit('GetMyOrder', order[y]);
				console.log(order[y]);
			}
		}
	});
	
	// When a client updates their payment pin
	socket.on('UpdatePayment', function(Username, Pin) {
		// Return order array
		socket.emit('UpdatePayment', status);
	});
	
	// When a client updates their language
	socket.on('GetLanguage', function(Username) {
		// Return order array
		socket.emit('GetLanguage', status);
	});
});

server.listen(8082);
console.log('Express Order Running at 8082');