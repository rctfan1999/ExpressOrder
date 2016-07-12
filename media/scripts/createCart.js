$(document).ready(function () {
	console.log("Connected");

	$("#orderForm").submit(function(event) {
		console.log("Reached form");
		// Get Entree
		localStorage.setItem("Entree", $('input[name="entrees"]:checked').val());
		
		// Get Fruits or Vegetables and place in array
		var fruitsVegetablesArray = [];
		localStorage.setItem("FruitsVegetables", $("input:checkbox[name=fruitsVegetables]:checked").each(function(){
				fruitsVegetablesArray.push($(this).val());
			})
		);
		for (var x = 0; x < fruitsVegetablesArray.length; x++) {
			console.log(fruitsVegetablesArray[x]);
		}
		
		// Take fruitsVegetablesArray and place in separate variables
		localStorage.setItem("FruitsVegetables0", fruitsVegetablesArray[0]);
		localStorage.setItem("FruitsVegetables1", fruitsVegetablesArray[1]);
		// Get Beverage
		
		localStorage.setItem("Beverage", $('input[name="beverages"]:checked').val());
		
		// Set vars for debug
		var entree = localStorage.getItem("Entrees");
		var fruitsVegetables0 = localStorage.getItem("FruitsVegetables0");
		var fruitsVegetables1 = localStorage.getItem("FruitsVegetables1");
		var beverage = localStorage.getItem("Beverage");
		
		console.log(entree + ", " + fruitsVegetables0 + ", " + fruitsVegetables1 + ", " + beverage);
		
		window.location.replace("../cart/index.html");
		return false;
	});
});