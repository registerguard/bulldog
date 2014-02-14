/**
 * Nutshell
 * In a nutshell, simple jQuery-powered tabs.
 *
 * @author Micky Hulse
 * @link http://mky.io
 * @docs https://github.com/mhulse/jquery-nutshell
 * @copyright Copyright (c) 2014 Micky Hulse.
 * @license Released under the Apache License, Version 2.0.
 * @version 1.1.0
 * @date 2014/01/06
 */

//----------------------------------

// Notes to self:
//console.profile('profile foo');
// ... code here ...
//console.profileEnd('profile foo');
// ... or:
// console.time('timing foo');
// ... code here ...
// console.timeEnd('timing foo');

//----------------------------------

(function($, window, document, undefined) {
	
	/**
	 * Function-level strict mode syntax.
	 *
	 * @see rgne.ws/XcZgn8
	 */
	
	'use strict';
	
	//--------------------------------------------------------------------------
	//
	// Local "globals":
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Javascript console.
	 *
	 * @see rgne.ws/12p2bvl
	 */
	
	var console = (window.console || { log : function() {}, warn : function() {} }),
	
	//----------------------------------
	
	/**
	 * The plugin namespace.
	 */
	
	NS = 'nutshell',
	
	//--------------------------------------------------------------------------
	//
	// Defaults and settings:
	//
	//--------------------------------------------------------------------------
	
	defaults = {
		
		classSelected : NS + '-selected',    // Selected tab CSS class.
		classSingle   : '',                  // Have "external" link(s) open a single tab based on its hash?
		animIn        : { opacity: 'show' }, // What animation object to use to show the panels.
		animOut       : { opacity: 'hide' }, // IBID, but for hiding.
		easeIn        : 'swing',             // Easing function in.
		easeOut       : 'swing',             // Easing function out.
		speedIn       : 'normal',            // Animation speed in.
		speedOut      : 'normal',            // Animation speed out.
		onInit        : $.noop,              // Callback on plugin initialization.
		onAfterInit   : $.noop,              // Callback after plugin initialization.
		onBeforeShow  : $.noop,              // Before reveal animation begins.
		onShow        : $.noop,              // After reveal animation ends.
		onBeforeHide  : $.noop,              // Before hide animation begins.
		onHide        : $.noop               // After hide animation ends.
		
	}, // defaults
	
	//--------------------------------------------------------------------------
	//
	// Public methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Methods object.
	 *
	 * @type { object }
	 */
	
	methods = {
		
		/**
		 * Init constructor.
		 *
		 * @type { function }
		 * @param { object } opts Options object literal.
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		init : function(options) {
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare/initialize:
				//----------------------------------
				
				var $this = $(this),        // Target object.
				    data  = $this.data(NS), // Namespace instance data.
				    settings;
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if ( ! data) {
					
					//----------------------------------
					// Initialize:
					//----------------------------------
					
					settings = $.extend(true, {}, defaults, options, $this.data(NS + 'Options')); // Recursively merge defaults, options and data attribute options.
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					$this.data(NS, {
						
						init     : false,
						settings : settings,
						target   : $this
						
					});
					
					//----------------------------------
					// Easy access:
					//----------------------------------
					
					data = $this.data(NS);
					
				}
				
				//----------------------------------
				// Data initialization check:
				//----------------------------------
				
				if ( ! data.init) {
					
					//----------------------------------
					// Call main:
					//----------------------------------
					
					_main.call($this, data);
					
				} else {
					
					//----------------------------------
					// Ouch!
					//----------------------------------
					
					console.warn('jQuery.' + NS, 'thinks it\'s already initialized on', this);
					
				}
				
			});
			
		}, // init
		
		//----------------------------------
		
		/**
		 * Removes plugin from element.
		 *
		 * @type { function }
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		destroy : function() {
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare/initialize:
				//----------------------------------
				
				var $this = $(this),
				    data  = $this.data(NS);
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if (data) {
					
					$this // ... hot chaining action -->
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					.removeData(NS) // -->
					
					//----------------------------------
					// Get tab links:
					//----------------------------------
					
					.find('a') // -->
					
					//----------------------------------
					// Tabs "click" event handler:
					//----------------------------------
					
					.off('click.' + NS) // -->
					
					//----------------------------------
					// Remove "active" class:
					//----------------------------------
					
					.removeClass(data.settings.classSelected) // -->
					
					//----------------------------------
					// Hide inactive panels:
					//----------------------------------
					
					.each(function() {
						
						$($(this).attr('href')).css('display', ''); // Smack!
						
					});
					
					//----------------------------------
					// External single clicks?
					//----------------------------------
					
					if (data.settings.classSingle.length) {
						
						//----------------------------------
						// Remove handler:
						//----------------------------------
						
						$('.' + data.settings.classSingle).off('click.' + NS); // Bah-zing!
						
					}
					
				}
				
			});
			
		} // destroy
		
	}, // methods
	
	//--------------------------------------------------------------------------
	//
	// Private methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Called after plugin initialization.
	 *
	 * @private
	 * @type { function }
	 * @this { object.jquery }
	 */
	
	_main = function(data) {
		
		//----------------------------------
		// Hoist variables:
		//----------------------------------
		
		var $links,    // Tab links.
		    $active,   // Active tab.
		    $inactive, // Last active tab.
		    $panel;    // The tab's panel.
		
		//----------------------------------
		// Data?
		//----------------------------------
		
		if (typeof data == 'undefined') {
			
			//----------------------------------
			// Attempt to determine data:
			//----------------------------------
			
			data = this.data(NS);
			
		}
		
		//----------------------------------
		// Data?
		//----------------------------------
		
		if (data) {
			
			//----------------------------------
			// Yup!
			//----------------------------------
			
			data.init = true; // Data initialization flag.
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onInit.call(data.target);
			
			//----------------------------------
			// Get tab links:
			//----------------------------------
			
			$links = $(this).find('a');
			
			//----------------------------------
			// Get "active" link:
			//----------------------------------
			
			$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links.filter('.' + data.settings.classSelected)[0] || $links[0]); // Activate by `location.hash`, manually assignment or first tab.
			
			//----------------------------------
			// Remove existing "active" class:
			//----------------------------------
			
			$links.removeClass(data.settings.classSelected);
			
			//----------------------------------
			// Apply "active" class:
			//----------------------------------
			
			$active.addClass(data.settings.classSelected);
			
			//----------------------------------
			// Hide inactive panels:
			//----------------------------------
			
			$links.not($active).each(function() {
				
				$($(this).attr('href')).hide(); // Determined by anchor IDs.
				
			});
			
			//----------------------------------
			// Get and show "active" panel:
			//----------------------------------
			
			$panel = $($active.attr('href'));
			$panel.show();
			
			//----------------------------------
			// External single clicks?
			//----------------------------------
			
			if (data.settings.classSingle.length) {
				
				//----------------------------------
				// Click handler for class:
				//----------------------------------
				
				$('.' + data.settings.classSingle).on('click.' + NS, function($e) {
					
					//----------------------------------
					// Prevent anchor's default action:
					//----------------------------------
					
					$e.preventDefault();
					
					//----------------------------------
					// Trigger head click:
					//----------------------------------
					
					$links
						.filter('[href="' + $(this).attr('href') + '"]') // Use anchor value.
						.trigger('click.' + NS);                         // Boom goes the dynamite!
					
				});
				
			}
			
			//----------------------------------
			// Tabs "click" event handler:
			//----------------------------------
			
			$links.on('click.' + NS, function($e) {
				
				//----------------------------------
				// Hoist variables:
				//----------------------------------
				
				var $this = $(this);
				
				//----------------------------------
				// Prevent anchor's default action:
				//----------------------------------
				
				$e.preventDefault();
				
				//----------------------------------
				// Already "active"?
				//----------------------------------
				
				if ( ! $this.hasClass(data.settings.classSelected)) {
					
					//----------------------------------
					// New tab so deactivate/hide old:
					//----------------------------------
					
					$active.removeClass(data.settings.classSelected);
					
					//----------------------------------
					// Cache active/inactive tabs:
					//----------------------------------
					
					$inactive = $active;
					$active = $this;
					
					//----------------------------------
					// Apply the "selected" class:
					//----------------------------------
					
					$active.addClass(data.settings.classSelected);
					
					//----------------------------------
					// Callback:
					//----------------------------------
					
					data.settings.onBeforeHide.call(data.target, $active, $inactive, $panel);
					
					//----------------------------------
					// Hide the old panel:
					//----------------------------------
					
					$panel
						.stop()
						.animate(
							data.settings.animOut,
							data.settings.speedOut,
							data.settings.easeOut,
							function() {
								
								//----------------------------------
								// Callback:
								//----------------------------------
								
								data.settings.onHide.call(data.target, $active, $inactive, $(this));
								
								//----------------------------------
								// Get the new panel:
								//----------------------------------
								
								$panel = $($this.attr('href'));
								
								//----------------------------------
								// Callback:
								//----------------------------------
								
								data.settings.onBeforeShow.call(data.target, $active, $inactive, $panel);
								
								//----------------------------------
								// Show the new panel:
								//----------------------------------
								
								$panel
									.stop()
									.animate(
										data.settings.animIn,
										data.settings.speedIn,
										data.settings.easeIn,
										function() {
											
											//----------------------------------
											// Callback:
											//----------------------------------
											
											data.settings.onShow.call(data.target, $active, $inactive, $(this));
											
										}
									);
								
							}
						);
					
				}
				
			});
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onAfterInit.call(data.target);
			
		}
		
	}; // _main
	
	//--------------------------------------------------------------------------
	//
	// Method calling logic:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Boilerplate plugin logic.
	 *
	 * @constructor
	 * @see rgne.ws/OvKpPc
	 * @type { function }
	 * @param { string } method String method identifier.
	 * @return { method } Calls plugin method with supplied params.
	 */
	
	$.fn[NS] = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method == 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('jQuery.' + NS + ' thinks that ' + method + ' doesn\'t exist');
			
		}
		
	}; // $.fn[NS]
	
}(jQuery, window, document));
