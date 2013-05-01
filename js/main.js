$(function() {
    var market = window.location.pathname.split('/')[2];
    var selectText = '';
    var carot = "\n<span class=\"caret\"></span>";
    $('#market-dropdown li a').each(function(index, a) {
	var text = $(a).text();
	var compareMarket = text.toLowerCase();
	if (compareMarket.replace(/[^a-zA-Z]+/, '') == market.replace(/[^a-zA-Z]+/, '')) {
	    selectText = text;
	}
    });

    if (market != undefined) {
	$('#dLabel').html(selectText + carot)
    }
});
