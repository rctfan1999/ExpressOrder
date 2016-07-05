// SFS Side - Get all orders for
// a school using the given ID

var socket = io.connect();

// Show Details of an Order
function showDetails(PassOrderID) {
	$('
}

// Request orders from DB
var PassSchoolID = 5;
socket.emit('GetOrders', PassSchoolID);

// When server returns orders, display
socket.on('GetOrders', function(order) {
	console.log(order);
	
	for (var i = 0; i < order.length; i++) {
		// Get values from the array and set to variables
		var OrderID = order[i][0];
		var StudentID = order[i][1];
		var Name = order[i][2];
		var Entree = order[i][3];
		var FruitsVegetables1 = order[i][4];
		
		// If Fruits and Vegetables 2 is null, leave it
		var FruitsVegetables2;
		if (order[i][5] !== null) {
			FruitsVegetables2 = order[i][5];
		}
		var Beverages = order[i][6];
		
		// Object to append
		var appendObject = '<tr>'+
			'<td>'+ OrderID +'</td>'+
			'<td>'+ StudentID +'</td>'+
			'<td>'+ Name +'</td>'+
			'<td>'+
				'<form role="form" id="'+ OrderID +'>'+
					'<fieldset id="Fulfilled">'+
						'<input class="pepLightRadioinput" id="Fulfilled" type="radio" name="Fulfilled" value="'+ OrderID +'">'+
						'<label for="ChickenPattySandwich">'+
							'<span><span></span></span>Fulfilled'+
						'</label>'+
					'</fieldset>'+
				'</form>'+
				'<div class="button">'+
					'<button class="linkButton" isbutton="1" href="" onClick="showDetails('+ OrderID +')">'+
					//'<button class="linkButton" isbutton="1" href="" onClick="showDetails()">'+
					//'<button class="linkButton" isbutton="1" href="">'+
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
	
	// Check if button was clicked
	$(".linkButton").click(function(){
		alert("Button was clicked.");
	});
});