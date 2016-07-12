var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	globals = require('globals'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

	app.use(express.static(__dirname));
	
// Handle Connections
io.sockets.on('connection', function (socket) {
	
	socket.on('EmptyTables', function(PassSchoolID) {
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			db.collection('Orders').remove();
			console.log("Orders table emptied");
			
			db.collection('Orders').insert(
				{"OrderID": PassSchoolID + "0000000000",
				"StudentID": "00000000",
				"StudentName": "IT Enterprise Applications",
				"SchoolID": String(PassSchoolID),
				"Entree": "NA",
				"FruitsVegetables1": "NA",
				"FruitsVegetables2": "NA",
				"Beverage": "NA",
				"Price": "NA",
				"DateOrdered": "NA",
				"Fulfilled": true,
				"DateFulfilled": "NA",
				"OrderedToday": true});
			console.log("School Created");
			
			var found = db.collection('Orders').find();
			found.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					console.log(doc);
				}
			});
		});
		MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			db.collection('Users').remove();
			console.log("Users table emptied");
		});
	});
	
	// When a new user joins
	socket.on('NewUser', function(Username) {
		// Connect to Users
		MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
		
			// Handle errors
			assert.equal(null, err);
			
			// Here we would pull user info from AD
			/*! Temp switch for debug */
			var StuName;
			switch (Username) {
				case "1":
					StuName = "Joshua Myerson";
					break;
				case "2":
					StuName = "Clyde Goodall";
					break;
				case "3":
					StuName = "Angel Turpin";
					break;
				default:
					StuName = "Please contact IT Enterprise Applications";
					break;
			}
			var SchID = "5";
			
			// Create user
			db.collection('Users').insert({
				"StudentID": Username,
				"StudentName": StuName,
				"SchoolID": SchID,
				"OrderedToday": "false"
			});
			db.close();
			console.log("A new student has joined: " + Username);
			socket.emit('NewUser', {StudentName: StuName, SchoolID: SchID});
		});
	});
	
	// When a client needs meta data on user stored in our database
	socket.on('GetUserMeta', function(PassUsername) {
	
		// Connect to Orders
		MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			console.log("Requested information for: " + PassUsername);
			var found = db.collection('Users').find({StudentID:PassUsername}).forEach(function (result) {
				socket.emit('GetUserMeta', {
				"SchoolID": result.SchoolID,
				"StudentName": result.StudentName,
				"OrderedToday": result.OrderedToday
				});
			});
		});
	});
	
	// When we need to see if a user exists in our database
	socket.on('CheckUser', function(PassUsername) {
		MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			var count;
			db.collection('Users').find({StudentID: PassUsername}).toArray(function(err,documents) {
				count = documents.length;
				console.log("User checker called - " + PassUsername + " was found " + count + " times");
				socket.emit("CheckUser", count);
			});
			db.close;
		});
	});
	
	// Used when we need to generate a new OrderID
	socket.on('GenerateOrderID', function(PassSchoolID) {
		
		// Use a findOne in descending order
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			db.collection('Orders').find({SchoolID: PassSchoolID}).sort({OrderID: -1}).limit(1).forEach(function (result) {	
				var GeneratedOrderID = parseInt(result.OrderID);
				GeneratedOrderID++;
				
				// Return to client
				socket.emit('GenerateOrderID', GeneratedOrderID);
			});
		});
	});
	
	// When an order is received process it
	socket.on('NewOrder', function(Order) {
		// Process payment
		/*! Payment processing script */
		
		// Send order to database
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
			console.log("New order received: " + Order);
			db.collection('Orders').insert(
				{
				"OrderID": Order[0],
				"StudentID": Order[1],
				"StudentName": Order[2],
				"SchoolID": Order[3],
				"Entree": Order[4],
				"FruitsVegetables1": Order[5],
				"FruitsVegetables2": Order[6],
				"Beverage": Order[7],
				"Price": Order[8],
				"DateOrdered": Order[9],
				"Fulfilled": Order[10],
				"DateFulfilled": Order[11],
				"OrderedToday": Order[12]
				}
			);
		});
		
		// Update last ordered time
		MongoClient.connect('mongodb://10.254.17.115:27017/Users', function(err, db) {
		
			// Handle errors
			assert.equal(null, err);
			
			// Create user
			db.collection('Users').update({StudentID: Order[1]}, {$set: {OrderedToday: true}}, false, true);
			console.log("Status change on " + Order[1] + " - Updated OrderedToday (true)");
			db.close();
		});
		
		// If both above are good emit true to client
		var status = true;
		socket.emit('NewOrder', status);
	});
	
	// SFS Requests Orders for their School
	socket.on('GetOrders', function(PassSchoolID) {
		// Connect to Orders
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			
			db.collection('Orders').find({Fulfilled: false}).forEach(function (result) {
				socket.emit('GetOrders', {
				"OrderID": result.OrderID,
				"StudentID": result.StudentID,
				"StudentName": result.StudentName,
				"SchoolID": result.SchoolID,
				"Entree": result.Entree,
				"FruitsVegetables1": result.FruitsVegetables1,
				"FruitsVegetables2": result.FruitsVegetables2,
				"Beverage": result.Beverage,
				"Price": result.Price,
				"DateOrdered": result.DateOrdered,
				"Fulfilled": result.Fulfilled,
				"DateFulfilled": result.DateFulfilled,
				"OrderedToday": result.OrderedToday
				});
			});
		});
	});
	
	// SFS Marks the Order as Fulfilled
	socket.on('SetFulfilled', function(PassOrderID) {
		// Update DB
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
		
			// Handle errors
			assert.equal(null, err);
			
			// Create user
			db.collection('Orders').update({OrderID: PassOrderID}, {$set: {Fulfilled: true}}, false, true);
			console.log("Status change on " + PassOrderID + " - Fulfilled: true");
			db.close();
		});
		
		var status = true;
		socket.emit('SetFulfilled', status);
	});
	
	// When a client requests to see their order
	socket.on('GetMyOrder', function(PassUsername) {
	
		// Connect to Orders
		MongoClient.connect('mongodb://10.254.17.115:27017/Orders', function(err, db) {
			// Handle errors
			assert.equal(null, err);
			
			var found = db.collection('Orders').find({StudentID:PassUserna
			me, Fulfilled: false}).forEach(function (result) {
				socket.emit('GetMyOrder', {
				"OrderID": result.OrderID,
				"StudentID": result.StudentID,
				"StudentName": result.StudentName,
				"Entree": result.Entree,
				"FruitsVegetables1": result.FruitsVegetables1,
				"FruitsVegetables2": result.FruitsVegetables2,
				"Beverage": result.Beverage,
				"Price": result.Price,
				"DateOrdered": result.DateOrdered,
				"Fulfilled": result.Fulfilled,
				"DateFulfilled": result.DateFulfilled,
				"OrderedToday": result.OrderedToday
				});
			});
		});
	});
	
	// When a client updates their payment pin
	socket.on('UpdatePayment', function(Username, Pin) {
		socket.emit('UpdatePayment', status);
	});
	
	// When a client updates their language
	socket.on('GetLanguage', function(Username) {
		socket.emit('GetLanguage', status);
	});
});

server.listen(8082);
console.log('Express Order Running at 8082');