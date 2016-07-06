var socket = io.connect();

$('.orderDisabled').hide();
var currentdate = new Date(); 
if (currentdate.getHours() >= 11 && currentdate.getHours() < 16) {
	$('.orderDisabled').show();
	$('.orderActive').hide();
}
function ordersDisabled() {
	$('#snackbar').html("Please check back at 4 PM EST to preorder.");
	showAlert();
}

var entrees = getUrlVars()["entrees"];
var fruitsVegetablesArray = getUrlArrayValues("fruitsVegetables");
var beverages = getUrlVars()["beverages"];

// Used for Single Selections (Radios or Text)
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
// Used for Multiple Selections (Checkboxes)
function getUrlArrayValues(paramName) {
	var values = [];
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		if (key == paramName) {
			values.push(value);
		}
	});
return values;
}

// Entrees
$('#entrees').html('<div class="row foodObject">'+
	'<div class="col-xs-7 cardObject">'+
		'<img class="img-responsive" src="../media/foods/'+ entrees +'.jpg" width="220" height="138">'+
	'</div>'+

	'<div class="col-xs-5 cardObject">'+
		'<b>'+ entrees +'</b><br>'+
		'<input type="hidden" id="entree" name="entrees" value="'+ entrees +'">'+
	'</div>'+
'</div>');
	
// Fruits and Vegetables
for (var x = 0; x < fruitsVegetablesArray.length; x++) {
	$('#fruitsVegetables').append('<div class="row foodObject">'+
		'<div class="col-xs-7 cardObject">'+
			'<img class="img-responsive" src="../media/foods/'+ fruitsVegetablesArray[x] +'.jpg" width="220" height="138">'+
		'</div>'+

		'<div class="col-xs-5 cardObject">'+
			'<b>'+ fruitsVegetablesArray[x].replace(/\s/g,'') +'</b><br>'+
			'<input type="hidden" id="fruitsVegetables'+ x +'" name="fruitsVegetables" value="'+ fruitsVegetablesArray[x] +'">'+
		'</div>'+
	'</div>');
}
	
// Beverages
$('#beverages').html('<div class="row foodObject">'+
	'<div class="col-xs-7 cardObject">'+
		'<img class="img-responsive" src="../media/foods/'+ beverages +'.jpg" width="220" height="138">'+
		'</div>'+
	
		'<div class="col-xs-5 cardObject">'+
			'<b>'+ beverages.replace(/\s/g,'') +'</b><br>'+
			'<input type="hidden" id="beverage" name="beverages" value="'+ beverages +'">'+
		'</div>'+
	'</div>');