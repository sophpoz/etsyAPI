//API key: h6i15byym5wi26bk17mg9yy2
//API Secret: 26jcl2rntx
var OFFSET = 50;
var SEARCHTERM = '';

$(function(){
	
});
var etsyData = function(searchTerm, offset) {
	var listingRequest = {
		api_key: 'h6i15byym5wi26bk17mg9yy2',
		method : 'GET', 
		keywords : searchTerm,
		fields : ['listing_id', 'price', 'title', 'listing_image_id', 'url_170x135'], 
		includes: 'MainImage',
		limit: 50,
		offset: offset ? offset : 0

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
	$.each(results.results, function(index, value){
		html += '<li><a href=" ' + value.url + ' " target="_blank" ">' + '</br>';
		html += '<img src=" '+ value.MainImage.url_570xN+ ' "/>' + '</a>' + '</br>';
		html += value.title + '</br>';
		html += 'USD' + " " + value.price;
		html += '<br>' + '<button class="button"><a href=" ' + value.url + ' " target="_blank" ">view on etsy</a></button>' + '</li>';	
	});
	$('#searchResults').append(html);
	$('#etsyQuery').val('');
	$('.resultsText').show();
	$('.search').text(SEARCHTERM);
	$('#loading').hide();

}

$(document).ready(function() {
	$('.resultsText').hide();
	$('#loading').hide();
	$('#etsySearch').submit(function(e){
		 e.preventDefault();
		if( $('#etsyQuery').val().length === 0) {return false};
		$('searchResults').html('');
		SEARCHTERM = $('#etsyQuery').val();
		OFFSET = 50;
		etsyData(SEARCHTERM);

	});
	// Each time the user scrolls
	$(window).scroll(function() {
		console.log(Math.floor($(window).scrollTop()));
		// End of the document reached?
		if(Math.floor($(window).scrollTop()) + $(window).height() == $(document).height() - 5) {
       	alert("bottom!");
       	$('#loading').show();
			etsyData(SEARCHTERM, OFFSET);
			OFFSET += 50;
   		} 
			
		
	});
});
