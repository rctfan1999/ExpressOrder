//var socket = io.connect();

var entrees = localStorage.getItem("Entree");

var fruitsVegetablesArray = [];
fruitsVegetablesArray.push(localStorage.getItem("FruitsVegetables0"));
fruitsVegetablesArray.push(localStorage.getItem("FruitsVegetables1"));
var beverages = localStorage.getItem("Beverage");

// Entrees
$('#entrees').html('<div class="row foodObject">'+
	'<div class="col-xs-7 cardObject">'+
		'<img class="img-responsive" src="../media/foods/'+ entrees.replace(/ /g,'') +'.jpg" width="220" height="138">'+
	'</div>'+

	'<div class="col-xs-5 cardObject">'+
		'<b>'+ entrees +'</b><br>'+
		'<input type="hidden" id="entree" name="entrees" value="'+ entrees +'">'+
	'</div>'+
'</div>');
	
// Fruits and Vegetables
for (var x = 0; x < fruitsVegetablesArray.length; x++) {
	if(fruitsVegetablesArray[x] != "undefined") {
		$('#fruitsVegetables').append('<div class="row foodObject">'+
			'<div class="col-xs-7 cardObject">'+
				'<img class="img-responsive" src="../media/foods/'+ fruitsVegetablesArray[x].replace(/ /g,'') +'.jpg" width="220" height="138">'+
			'</div>'+
			
			'<div class="col-xs-5 cardObject">'+
				'<b>'+ fruitsVegetablesArray[x] +'</b><br>'+
				'<input type="hidden" id="fruitsVegetables'+ x +'" name="fruitsVegetables" value="'+ fruitsVegetablesArray[x] +'">'+
			'</div>'+
		'</div>');
	}
}
	
// Beverages
$('#beverages').html('<div class="row foodObject">'+
	'<div class="col-xs-7 cardObject">'+
		'<img class="img-responsive" src="../media/foods/'+ beverages.replace(/ /g,'') +'.jpg" width="220" height="138">'+
		'</div>'+
	
		'<div class="col-xs-5 cardObject">'+
			'<b>'+ beverages +'</b><br>'+
			'<input type="hidden" id="beverage" name="beverages" value="'+ beverages +'">'+
		'</div>'+
	'</div>');