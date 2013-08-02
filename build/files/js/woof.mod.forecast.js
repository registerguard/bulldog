WOOF.register(function() {
	
	'use strict';
	
	/**
	 * Forecast widget.
	 * Gets weather data as `jsonp` response from ReSTful API and creates widget on page.
	 * This JS is specifically tailored to the RG HTML/templates... At some point I may make it more modular.
	 *
	 * @dependency jQuery
	 * @dependency jquery-jsonp
	 * @pattern Singleton instance/module pattern.
	 * @see rgne.ws/R5aLJg
	 */
	
	var $widget,
	    apiFQDN,
	    assetFQDN,
	    homeFQDN,
	    forecast = (function() {
		
		//----------------------------------
		// Local private variable(s):
		//----------------------------------
		
		$widget   = $('#forecast');                      // Target `<div>` on template.
		apiFQDN   = 'http://projects.registerguard.com'; // JSON API Fully Qualified Domain Name.
		assetFQDN = 'http://projects.registerguard.com'; // Image server FQDN.
		homeFQDN  = 'http://projects.registerguard.com'; // Weather landing page FQDN.
		
		//--------------------------------------------------------------------
		
		/**
		 * Called if successful API request has been made.
		 *
		 * @param { object } The JSON object returned from the server.
		 */
		
		function successful(json) {
			
			// CSS media queries and style info for `<head>` of document:
			
			// http://stackoverflow.com/a/9050485/922323
			$('head').append('<style type="text/css">@media only screen and (min-width: 1005px) { #forecast { background-repeat: no-repeat; background-image: url(' + assetFQDN + '/static/weather/' + json.code + '.png); } } @media only screen and (min-width: 1005px) and (min--moz-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (-moz-min-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (-o-min-device-pixel-ratio: 3/2), only screen and (min-width: 1005px) and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (min-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (min-resolution: 1.5dppx) { #forecast { background-image: url(' + assetFQDN + '/static/weather/' + json.code + '@2x.png); -moz-background-size: 115px 115px; -ie-background-size: 115px 115px; -o-background-size: 115px 115px; -webkit-background-size: 115px 115px; background-size: 115px 115px; } }</style>');
			
			/*
			// Below gives me "unexpected call to method or property access" in <IE9.
			$('<style />')
				// For this example, we don't want to load images, retina included, at a viewport width < 1005px:
				.append('@media only screen and (min-width: 1005px) { #forecast { background-repeat: no-repeat; background-image: url(' + assetFQDN + '/static/weather/' + json.code + '.png); } } @media only screen and (min-width: 1005px) and (min--moz-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (-moz-min-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (-o-min-device-pixel-ratio: 3/2), only screen and (min-width: 1005px) and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (min-device-pixel-ratio: 1.5), only screen and (min-width: 1005px) and (min-resolution: 1.5dppx) { #forecast { background-image: url(' + assetFQDN + '/static/weather/' + json.code + '@2x.png); -moz-background-size: 115px 115px; -ie-background-size: 115px 115px; -o-background-size: 115px 115px; -webkit-background-size: 115px 115px; background-size: 115px 115px; } }')
				// Append the styles to the `<head>`; note that the media queries will not work in IE < 8. :(
				.appendTo('head');
			*/
			
			// Append `html` to widget:
			$widget.append('<span title="' + json.skies + '"><a href="' + homeFQDN + '/weather/">' + json.temp_f + '&deg;</a></span>');
			
		} // successful()
		
		//--------------------------------------------------------------------
		
		return {
			
			/**
			 * Initializes module.
			 *
			 * @constructor
			 */
			
			init : function() {
				
				//----------------------------------
				// Check for container's existence:
				//----------------------------------
				
				if ($widget.length) {
					
					//----------------------------------
					// Use $.jsonp or $.getJSON?
					//----------------------------------
					
					if ($.jsonp) {
						
						/**
						 * Use @jaubourg's jQuery-JSONP plugin.
						 *
						 * @see rgne.ws/OEYxY2
						 */
						
						$.jsonp({
							url : apiFQDN + '/weather/widget3/?callback=?',
							cache : true,
							success : successful
						});
						
					} else {
						
						/**
						 * Use jQuery's $.getJSON.
						 *
						 * @see rgne.ws/S7EsQY
						 */
						
						$.getJSON(apiFQDN + '/weather/widget3/?callback=?', successful);
						
					}
					
				}
				
			} // init()
			
		};
		
	})(); // forecast
	
	forecast.init();
	
}); // WOOF!
