WOOF.register(function() {
	
	'use strict';
	
	/**
	 * Navigation setups.
	 *
	 * @dependency jQuery
	 * @dependency jquery-megakrill
	 * @dependency jquery-megawhale
	 */
	
	var $megawhale = $('#megawhale'),
	    $html      = $('html');
	
	$megawhale
		.megakrill({
			cloneRemove : 'li > div',
			cloneId     : false
		})
		.megawhale({
			eventType      : 'hoverIntent',
			onStartOutside : function() {
				$html.addClass('mw-outside');
			},
			onEndOutside   : function() {
				$html.removeClass('mw-outside');
			}
		});
	
}); // WOOF!