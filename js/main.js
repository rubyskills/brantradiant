var findMarket = function() {
    var market = window.location.pathname.split('/')[2];
    var selectText = '';
    var selectHref = '';

    if (!market) { return null }

    $('#market-dropdown li a').each(function(index, a) {
	var text = $(a).text();
	var href = $(a).attr('href');
	var compareMarket = text.toLowerCase();
	if (compareMarket.replace(/[^a-zA-Z]+/, '') == market.replace(/[^a-zA-Z]+/, '')) {
	    selectText = text;
	    selectHref = href;
	}
    });

    return {name: market, text: selectText, href: selectHref}
}

var productLink = function(href) {
    $('#products_link').attr('href', href)
}

$(function() {
    var market = findMarket()
    if (market != null) {
	var carot = "\n<span class=\"caret\"></span>";
	$('#dLabel').html(market.text + carot)
	productLink(market.href)
    }
});
