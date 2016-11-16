//API key: h6i15byym5wi26bk17mg9yy2
//API Secret: 26jcl2rntx

$(function(){
	$('.results').hide();
	$('#etsySearch').submit(function(event){
		if( $('#etsyQuery').val().length === 0) {return false}
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
		includes: 'MainImage',
		limit: 50,
		offset: 50
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
	var searchTerm = $('#etsyQuery').val();
	$.each(results.results, function(index, value){
		html += '<li><a href=" ' + value.url + ' " target="_blank" ">' + '</br>';
		html += '<img src=" '+ value.MainImage.url_570xN+ ' "/>' + '</a>' + '</br>';
		html += value.title + '</br>';
		html += 'USD' + " " + value.price;
		html += '<br>' + '<button class="button"><a href=" ' + value.url + ' " target="_blank" ">view on etsy</a></button>' + '</li>';	
	});
	$('#searchResults').html(html);
	$('#etsyQuery').val('');
	$('.results').show();
	$('.search').text(searchTerm);

}

$(document).ready(function() {
	var win = $(window);
	var html = "";
	var searchTerm = $('#etsyQuery').val();
	// Each time the user scrolls
	win.scroll(function() {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop()) {
			$('#loading').show();
			var searchTerm = ('#etsyQuery').val();
			$.ajax({
				url: 'https://openapi.etsy.com/v2/listings/active.js',
				dataType: 'html',
				success: function(html) {
					$('#searchResults').append(html);
					$('#loading').hide();
				}
			});
		}
	});
});
