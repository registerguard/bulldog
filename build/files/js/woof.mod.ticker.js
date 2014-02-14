WOOF.register(function() {
	
	'use strict';
	
	// Due to limitations of plugin, and the need for navigation arrows, we need to target IDs:
	var $tickers = $('#ticker1, #ticker2, #ticker3, #ticker4'),
	    delay = 5; // We're going to stagger these suckers.
	
	// Make sure we've got something to work with:
	if ($tickers.length) {
		
		// To avoid duplicating code, let's loop:
		$.each($tickers, function(i) {
			
			// Hoist:
			var $this = $(this),
			    $ticker_ul;
			
			// Don't bother if there's only one list item:
			if ($this.find('ul').children().length > 1) {
				
				$this.closest('dl').addClass('ticker-has-nav');
				
				// We need a unique nav for each item, thus we create the object here, within the loop:
				$ticker_ul = $('<ul>', { 'class' : 'ticker-nav' })
					.html('<li><a href="#">&lt;</a></li><li><a href="#">&gt;</a></li>');
				
				// Instanciate the plugin and add the navigation:
				$this
					// https://github.com/wmh/jquery-scrollbox
					.scrollbox({ delay : delay + i }) // They'll start out in sync, but then be staggered.
					.after($ticker_ul); // Add the navigation arrows.
				
				// Look for clicks:
				$ticker_ul.on('click', 'a', function ($e) {
					
					// Hoist:
					var $t = $(this);
					
					// Disable default click behaviour:
					$e.preventDefault();
					
					// First list item clicked?
					if ($t.parent().is(':first-child')) {
						
						// Yah, so let's trigger the "backward" function:
						$this.trigger('backward');
						
					} else {
						
						// Nah, so it must be the "forward" function that's needed:
						$this.trigger('forward');
						
					}
					
				});
				
			}
			
		});
		
	}
	
}); // WOOF!