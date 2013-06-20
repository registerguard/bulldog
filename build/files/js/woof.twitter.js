WOOF.register(function() {
	
	'use strict';
	
	!function(id) {
		
		if ($('.twitter-timeline').length && ( ! $('#' + id).length)) {
			
			$('<script>')
				.appendTo('head')
				.attr('id', id)
				.attr('src', '//platform.twitter.com/widgets.js');
			
		}
		
	}('twitter-wjs');
	
}); // WOOF!
