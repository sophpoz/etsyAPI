//API key: h6i15byym5wi26bk17mg9yy2
//API Secret: 26jcl2rntx
$(function(){
	$('#submit').submit(function(event){
		event.preventDefailt();
		var searchTerm = $('#etsyQuery').val();
		etsyData(searchTerm);
	});
});
var etsyData = function(searchTerm) {
	var request = {
		//params here
		k
	};

	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active?api_key=h6i15byym5wi26bk17mg9yy2",
		data: request,

	})
}