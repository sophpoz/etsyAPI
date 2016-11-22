//API key: h6i15byym5wi26bk17mg9yy2
//API Secret: 26jcl2rntx
var OFFSET = 50;
var SEARCHTERM = '';

var etsyData = function(searchTerm, offset) {
	var listingRequest = {
		api_key: 'h6i15byym5wi26bk17mg9yy2',
		method : 'GET', 
		keywords : searchTerm,
		fields : ['listing_id', 'price', 'title', 'listing_image_id', 'url_570xN'], 
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
		html += '<img src=" '+ value.MainImage.url_570xN + ' "/>' + '</a>' + '</br>';
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
	$('#loading2').hide();
	//submit your search
	$('#etsySearch').submit(function(e){
		$('#loading2').hide();
		e.preventDefault();
		if( $('#etsyQuery').val().length === 0) {return false};
		$('#loading').show();
		$('#searchResults').html('');
		SEARCHTERM = $('#etsyQuery').val();
		OFFSET = 50;
		etsyData(SEARCHTERM);

	});

	// Each time the user scrolls
	$(window).scroll(function() {
		// End of the document reached?
		if(Math.floor($(window).scrollTop()) + $(window).height() > $(document).height() - 5) {
			$('#loading2').show();
			etsyData(SEARCHTERM, OFFSET);
			OFFSET += 50;
		} 	
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('#arrow').fadeIn();
		} else {
			$('#arrow').fadeOut();
		}
	});

	$("#top").click(function (e) {
		e.preventDefault();
		$("html, body").animate({scrollTop: 0}, 500);
	});

});

