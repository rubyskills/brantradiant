var effectSpeed = 100;
		
$(document).ready(function(e) {
  
	contentFilter();
	contentRotator();
	productDetails();
	productPreviews();
	zipcodeSearchbar();
	
});

function contentFilter() {
	
	if ($('.content_filter').exists()) {
		
		var selectedLocation = $.cookie("location_selector") != null ? $('#location_selector #' + $.cookie("location_selector")).html() : $('#location_selector .dropdown li:first-child').html();
		var selectedMarket = $.cookie("market_selector") != null ? $('#market_selector #' + $.cookie("market_selector")).html() : $('#market_selector .dropdown li:first-child').html();
		
		validateMarketOptions(selectedLocation);
		
		$('#location_selector .selected').html(selectedLocation);
		$('#market_selector .selected').html(selectedMarket);
		
		var hoverConfig = {
			over: function(){
				$(this).find('.dropdown').fadeIn(effectSpeed);
			},
			timeout: 100,
			out: function(){
				$('.content_filter .selector .dropdown').fadeOut(effectSpeed);
			}	
		};
		$('.content_filter .selector').hoverIntent(hoverConfig);
		
		$('.content_filter .selector .dropdown li').click(dropdownHandler);
	}
	
};

function dropdownHandler(e) {
	
	$(this).closest('.selector').find('.selected').html($(this).html());
	$(this).closest('.selector').find('.selected').attr('id', $(this).attr('id'));
	$(this).closest('.dropdown').fadeOut(effectSpeed);
	
	var parentSelectorId = $(this).closest('.row').attr('id');
	
	$.cookie(parentSelectorId, $(this).attr('id'), { path: '/', expires: 365 });
	
	if(parentSelectorId == "location_selector")
	{
		validateMarketOptions($(this).html());
	}
	
	if($('.content_filter_needs_reloads').exists()) {
		
		if ( location.search.indexOf("?product=") == 0 ) {
			location.replace(location.host + "/products/");
		}
		else if ( location.search.indexOf("?distr=") == 0 || location.search.indexOf("?zipcode=") == 0 ) {
			location.replace(location.host + "/locate-distributor/");
		}
		else {
			location.reload();
		}
		
	}
}

function validateMarketOptions($location)
{
	$currentMarket = $('#market_selector .selected').html();
	var currentMarketIsvalid = false;
	
	var marketData = JSON.parse($('#market_data').html());
	$('#market_selector .dropdown').html('');
	
	$.each(marketData, function(i, item) {
		if ($.inArray($location, item.locations) > -1)
		{
			var listItem = '<li id="'+item.id+'">'+item.title+'</li>';
			$('#market_selector .dropdown').append(listItem);
			
			if ($currentMarket == item.title)
				currentMarketIsvalid = true;
		}
	});
	
	$('#market_selector .dropdown li').click(dropdownHandler);
	
	if (!currentMarketIsvalid)
	{
		$('#market_selector .selected').html($('#market_selector .dropdown li:first-child').html());
	}
}

function contentRotator() {
	
	if ($('.rotator').exists()) {
		
		var itemWidth = $('.rotator .items .item:first-child').outerWidth();
		var itemCount = $('.rotator .items').children('.item').length;
		
		$('.rotator .items').width(itemWidth * itemCount);
		$('.rotator .indicators .indicator:first-child').addClass('active');
		
		var $timer = $.timer(function() {
		
			$('.rotator .window').animate(
				{
					scrollLeft: itemWidth
				},
				500,
				'swing',
				function() {
					$('.rotator .window').scrollLeft(0);
					$('.rotator .items .item:first-child').appendTo('.rotator .items');
					
					// make next indicator "active"
					var activeIndex = $('.rotator .indicators .indicator.active').index();
					activeIndex = activeIndex < $('.rotator .indicators').find('.indicator').length - 1 ? activeIndex + 1 : 0;
					
					$('.rotator .indicators .active').removeClass('active');
					$('.rotator .indicators .indicator:eq(' + activeIndex + ')').addClass('active');
				}
			);
		
		});
		
		$timer.set({
			time: 5000,
			autostart: true
		});
	
	}
	
}

function productDetails() {
	
	if ($('.product .details').exists()) {
	
		$('.product .details').tabs();	
		
	}
	
}

function productPreviews() {
	
	if ($('.sidebar-products').exists()) {
		var effectSpeed = 100;
		
		var hoverConfig = {
			over: function(){
				$(this).find('.preview').fadeIn(effectSpeed);
				$(this).animate(
					{
						'background-color' : '#CCCCCC'
					},
					effectSpeed
				)
			},
			timeout: 100,
			out: function(){
				$('.sidebar-products .preview').fadeOut(effectSpeed);
				$(this).animate(
					{
						'background-color' : '#FFFFFF'
					},
					effectSpeed
				)
			}	
		};
		$('.sidebar-products .children li').hoverIntent(hoverConfig);
		
	}
	
}

function zipcodeSearchbar() {
	
	if ($('.zipcode_searchbar').exists()) {
		
		$('.zipcode_searchbar .button').click(function(e) {
      
			$('.zipcode_searchbar #zipcode_search').submit();
			e.preventDefault();
    });
		
	}
	
}

// Utility functions
jQuery.fn.exists = function(){
	return this.length > 0;
}