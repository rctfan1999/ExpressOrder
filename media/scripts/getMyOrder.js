/*! getMyOrder.js | (c)Joshua Myerson */

var socket = io.connect();

// Request student's orders
var Username = "24812309";
socket.emit('GetMyOrder', Username);

// When server returns the order, display
socket.on('GetMyOrder', function(Order) {
	console.log(Order); // See array for debug purposes
	
	// Create variables from data
	var Entree = Order[3];
	
	// Add fruits and vegetables
	var fruitsVegetablesArray = [];
	fruitsVegetablesArray.push([Order[4]]); // First mandatory selection
	if (Order[5] !== "null") { // Second optional selection (can be null)
		fruitsVegetablesArray.push([Order[5]]);
	}
	var Beverage = Order[6];
	
	console.log(Order);
	
	$('#entrees').html('<div class="row foodObject">'+
		'<div class="col-xs-7 cardObject">'+
			'<img class="img-responsive" src="../media/foods/'+ Entree.replace(/\s/g,'') +'.jpg" width="220" height="138">'+
		'</div>'+
		
		'<div class="col-xs-5 cardObject">'+
			'<b>'+ Entree +'</b><br>'+
		'</div>'+
	'</div>');
		
	// Fruits and Vegetables
	for (var x = 0; x < fruitsVegetablesArray.length; x++) {
	
		var fruitsVegetablesSlug = String(fruitsVegetablesArray[x]); // Strip white space for file name
		
		$('#fruitsVegetables').append('<div class="row foodObject">'+
			'<div class="col-xs-7 cardObject">'+
				'<img class="img-responsive" src="../media/foods/'+ fruitsVegetablesSlug.replace(/\s/g,'') +'.jpg" width="220" height="138">'+
			'</div>'+

			'<div class="col-xs-5 cardObject">'+
				'<b>'+ fruitsVegetablesArray[x] +'</b><br>'+
			'</div>'+
		'</div>');
	}
		
	// Beverages
	$('#beverages').html('<div class="row foodObject">'+
		'<div class="col-xs-7 cardObject">'+
			'<img class="img-responsive" src="../media/foods/'+ Beverage.replace(/\s/g,'') +'.jpg" width="220" height="138">'+
		'</div>'+

		'<div class="col-xs-5 cardObject">'+
			'<b>'+ Beverage +'</b><br>'+
		'</div>'+
	'</div>');
});