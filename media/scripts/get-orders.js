/*! get-orders.js | (c)Joshua Myerson */

var socket = io.connect();

// Show Details of an Order
function showDetails(OrderID, StudentID, Name, Entree, FruitsVegetables1, FruitsVegetables2, Beverage) {

	// Data to add to modal body
	var modalBodyContent = "<p>Order ID: "+ OrderID +"</p>"; // OrderID
	modalBodyContent += "<p>Student ID: "+ StudentID +"</p>"; // StudentID
	modalBodyContent += "<p>Student Name: "+ Name +"</p>"; // Name
	modalBodyContent += "<p>Entree: "+ Entree +"</p>"; // Entree
	modalBodyContent += "<p>First Fruit or Vegetable: "+ FruitsVegetables1 +"</p>"; // Fruit or vegetable 1
	
	if (FruitsVegetables2 !== null) { // Check if second fruit or vegetable was selected
		modalBodyContent += "<p>Second Fruit or Vegetable: "+ FruitsVegetables2 +"</p>"; // Fruit or vegetable 2
	}
	modalBodyContent += "<p>Beverage: "+ Beverage +"</p>"; // Beverage
	
	// Actually add content to modal
	$('.modal-body').html(modalBodyContent);
	
	// Show modal
	$('#detailModal').modal();
}

// Hide the row and notify server when an order is set as fulfilled
function setFulfilled (OrderID) {

	// Notify server
	socket.emit('SetFulfilled', OrderID);
	
	socket.on('SetFulfilled', function(status) {
		// Check status returned
		if (status) {
			// Delay the hide for aesthetics
			setTimeout(function() {
				// Hide the row
				$('#'+OrderID+'-row').hide(500);
			}, 500);
		}
	});
}

// Request orders from DB
var PassSchoolID = 5;
socket.emit('GetOrders', PassSchoolID);

// When server returns orders, display
socket.on('GetOrders', function(Order) {
	console.log(Order); // See array for debug purposes
	
	for (var i = 0; i < Order.length; i++) {
		// Get values from the array and set to variables
		var OrderID = Order[i][0];
		var StudentID = Order[i][1];
		var Name = Order[i][2];
		var Entree = Order[i][3];
		var FruitsVegetables1 = Order[i][4];
		
		// If Fruits and Vegetables 2 is null, leave it
		var FruitsVegetables2;
		if (Order[i][5] !== null) {
			FruitsVegetables2 = Order[i][5];
		}
		var Beverage = Order[i][6];
		
		// Object to append to table
		var appendObject = '<tr id="'+OrderID +'-row">'+
			'<td>'+ OrderID +'</td>'+
			'<td>'+ StudentID +'</td>'+
			'<td>'+ Name +'</td>'+
			'<td>'+
				// Form used to localize data - useful on larger data sets
				'<form role="form" id="'+OrderID +'-form">'+
					'<fieldset id="Fulfilled">'+
						'<input class="pepLightRadioinput" onClick="setFulfilled(\''+ OrderID +'\')" id="Fulfilled" type="radio" name="Fulfilled" value="'+ OrderID +'">'+
						'<label for="ChickenPattySandwich">'+
							'<span><span></span></span>Fulfilled'+
						'</label>'+
					'</fieldset>'+
				'</form>'+
				'<div class="button">'+
					'<button class="linkButton" isbutton="1" href="" onClick="showDetails(\''+ OrderID +'\',\''+ StudentID +'\',\''+ Name +'\',\''+ Entree +'\',\''+ FruitsVegetables1 +'\',\''+ FruitsVegetables2 +'\',\''+ Beverage +'\')">'+
					//'<button class="linkButton" isbutton="1" href="" onClick="showDetails('+ Order +')">'+
						'<span class="button blue">'+
							'<span>Details</span>'+
						'</span>'+
					'</button>'+
				'</div>'+
			'</td>'+
		'</tr>';
		
		// Add to table
		$('#orders').append(appendObject);
	}
});