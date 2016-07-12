/*! getMyOrder.js | (c) Joshua Myerson */

var socket = io.connect();

// Request student's orders
var Username = localStorage.getItem("StuID");
socket.emit('GetMyOrder', Username);

// When server returns the order, display
socket.on('GetMyOrder', function(Order) {

	// Get values from the array and set to variables
	var OrderID = Order.OrderID;
	var StudentID = Order.StudentID;
	var Name = Order.StudentName;
	var Entree = Order.Entree;
	var FruitsVegetables1 = Order.FruitsVegetables1;
	
	// If FruitsVegetables2 is undefined make it "null"
	var FruitsVegetables2;
	if (Order.FruitsVegetables2 !== "null") {FruitsVegetables2 = Order.FruitsVegetables2;}
	else {FruitsVegetables2 = "null";}
	var Beverage = Order.Beverage;
	
	// Display Orders
	
	// Entrees
	$('#entrees').html('<div class="row foodObject">'+
		'<div class="col-xs-7 cardObject">'+
			'<img class="img-responsive" src="../media/foods/'+ Entree.replace(/\s/g, '') +'.jpg" width="220" height="138">'+
		'</div>'+
		
		'<div class="col-xs-5 cardObject">'+
			'<b>'+ Entree +'</b><br>'+
		'</div>'+
	'</div>');
		
	// First ruits and Vegetables
	$('#fruitsVegetables').append('<div class="row foodObject">'+
		'<div class="col-xs-7 cardObject">'+
			'<img class="img-responsive" src="../media/foods/'+ FruitsVegetables1.replace(/\s/g,'') +'.jpg" width="220" height="138">'+
		'</div>'+
			'<div class="col-xs-5 cardObject">'+
			'<b>'+ FruitsVegetables1 +'</b><br>'+
		'</div>'+
	'</div>');
	
	// Second Fruits and Vegetables (checks if not null)
	if (FruitsVegetables2 !== "null") {
		$('#fruitsVegetables').append('<div class="row foodObject">'+
			'<div class="col-xs-7 cardObject">'+
				'<img class="img-responsive" src="../media/foods/'+ FruitsVegetables2.replace(/\s/g,'') +'.jpg" width="220" height="138">'+
			'</div>'+
				'<div class="col-xs-5 cardObject">'+
				'<b>'+ FruitsVegetables2 +'</b><br>'+
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