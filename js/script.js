/* Author: Robert Romore

*/

$(document).scroll(function(){
    // If has not activated (has no attribute "data-top"
    if (!$('.subnav').attr('data-top')) {
        // If already fixed, then do nothing
        if ($('.subnav').hasClass('subnav-fixed')) return;
        // Remember top position
        var offset = $('.subnav').offset()
        $('.subnav').attr('data-top', offset.top);
    }

    if ($('.subnav').attr('data-top') - $('.subnav').outerHeight() <= $(this).scrollTop())
        $('.subnav').addClass('subnav-fixed');
    else
        $('.subnav').removeClass('subnav-fixed');
});

var scripts = [	"app/ump.js", 
				"app/ump.favorites.js", 
				"app/ump.services.reddit.js", 
				"app/ump.handlers.youtube.js"
			];
for( var s in scripts ) {
	$.getScript("js/"+scripts[s]);
}
