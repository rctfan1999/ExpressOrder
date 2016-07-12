/*! get-orders.js | (c)Joshua Myerson */

var socket = io.connect();

// Show Details of an Order
function showDetails(OrderID, StudentID, Name, Entree, FruitsVegetables1, FruitsVegetables2, Beverage) {

	// Data to add to modal body
	var modalBodyContent = "<p>Order ID: "+ OrderID +"</p>"; // OrderID
	modalBodyContent += "<p>Student ID: "+ StudentID +"</p>"; // StudentID
	modalBodyContent += "<p>Student Name: "+ Name +"</p>"; // Name
	modalBodyContent += "<p>Entree: "+ Entree.replace(/\+/g, "") +"</p>"; // Entree
	modalBodyContent += "<p>First Fruit or Vegetable: "+ FruitsVegetables1.replace(/\+/g, "") +"</p>"; // Fruit or vegetable 1
	
	if (FruitsVegetables2 !== "null") { // Check if second fruit or vegetable was selected
		modalBodyContent += "<p>Second Fruit or Vegetable: "+ FruitsVegetables2.replace(/\+/g, "") +"</p>"; // Fruit or vegetable 2
	}
	modalBodyContent += "<p>Beverage: "+ Beverage.replace(/\+/g, "") +"</p>"; // Beverage
	
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

/*! Request orders from DB */

// Initial Request
var PassSchoolID = 5;
socket.emit('GetOrders', PassSchoolID);

// All other requests
window.setInterval(function(){
	$('#orders').html("");
	var PassSchoolID = 5;
	socket.emit('GetOrders', PassSchoolID);
}, 5000);

// When server returns orders, display
socket.on('GetOrders', function(Order) {
	//Get values from the array and set to variables
	var OrderID = Order.OrderID;
	var StudentID = Order.StudentID;
	var Name = Order.StudentName;
	var Entree = Order.Entree;
	var FruitsVegetables1 = Order.FruitsVegetables1;
	
	//If Fruits and Vegetables 2 is null, leave it
	var FruitsVegetables2;
	if (Order.FruitsVegetables2 !== undefined) {
		FruitsVegetables2 = Order.FruitsVegetables2;
	}
	else {
		FruitsVegetables2 = "null";
	}
	var Beverage = Order.Beverage;
	var Fulfilled = Order.Fulfilled;
	console.log("Is fulfilled: " + Fulfilled);
	
	//Object to append to table
	var appendObject = '<tr id="'+OrderID +'-row">'+
		'<td>'+ OrderID +'</td>'+
		'<td>'+ StudentID +'</td>'+
		'<td>'+ Name +'</td>'+
		'<td>'+
			//Form used to localize data - useful on larger data sets
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
	
	//Add to table
	$('#orders').append(appendObject);
});