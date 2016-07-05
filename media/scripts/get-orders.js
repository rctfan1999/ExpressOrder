// Process the order on client sidebar

var socket = io.connect();
console.log(socket);

console.log("Script was called");

// Request orders from DB
var PassSchoolID = 5;
socket.emit('GetOrders', PassSchoolID);

// When server returns orders, display
socket.on('GetOrders', function(order) {
	
	console.log(order);
	
	for (var i = 0; i < order.length; i++) {
		OrderID = order[i][0],
		StudentID = order[i][1],
		Name = order[i][2],
		Entree = order[i][3],
		FruitsVegetables1 = order[i][4];
		var FruitsVegetables2;
		if (order[i][5] != null) {
			FruitsVegetables2 = order[i][5];
		}
		var Beverages = order[i][6];
		
		// Add to table
		$('#orders').append('<tr>'
			+'<td>'+ OrderID +'</td>'
			+'<td>'+ StudentID +'</td>'
			+'<td>'+ Name +'</td>'
			+'<td>'
				+'<form role="form" id="'+ OrderID +'>'
					+'<fieldset id="Fufilled">'
						+'<input class="pepLightRadioinput" id="Fufilled" type="radio" name="Fufilled" value="'+ OrderID +'">'
						+'<label for="ChickenPattySandwich">'
							+'<span><span></span></span>Fufilled'
						+'</label>'
				+'</form>'
			+'</td>'
		+'</tr>');
	}
});