//API key: h6i15byym5wi26bk17mg9yy2
//API Secret: 26jcl2rntx
$(function(){
	$('#etsySearch').submit(function(event){
		event.preventDefault();
		var searchTerm = $('#etsyQuery').val();
		etsyData(searchTerm);
	});
});
var etsyData = function(searchTerm) {
	var listingRequest = {
		api_key: 'h6i15byym5wi26bk17mg9yy2',
		method : 'GET', 
		keywords : searchTerm,
		fields : ['listing_id', 'price', 'title', 'listing_image_id', 'url_170x135'], 
		includes: 'MainImage'
	};
	$.ajax({
		url : 'https://openapi.etsy.com/v2/listings/active.js',
		data : listingRequest,
		success : function(data, e){
					showResults(data);
				},
		dataType : 'jsonp'
	});
}
function showResults(results){
	var html = "";
	console.log(results);
	$.each(results.results, function(index, value){
		html += '<li><a href=" ' + value.results.url + ' ">';
		html += '<img src=" '+ value.results.MainImage.url_170x135 + ' "/></li>';	
	});
	

}
