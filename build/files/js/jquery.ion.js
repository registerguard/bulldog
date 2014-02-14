/**
 * Ion
 * Super simple jQuery-powered accordions.
 *
 * @author Micky Hulse
 * @link http://mky.io
 * @docs https://github.com/mhulse/jquery-ion
 * @copyright Copyright (c) 2014 Micky Hulse.
 * @license Released under the Apache License, Version 2.0.
 * @version 1.0.1
 * @date 2014/02/13
 */

// http://www.jacklmoore.com/demo/accordion.html
// http://stackoverflow.com/questions/9948306/overriding-jquery-plugin-options-with-html5-data-attributes
// https://medium.com/web-design-tutorials/29b39ac24b38
// http://www.adipalaz.com/scripts/jquery/jquery.nestedAccordion.txt

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
	
	NS = 'ion',
	
	//--------------------------------------------------------------------------
	//
	// Defaults and settings:
	//
	//--------------------------------------------------------------------------
	
	defaults = {
		
		alwaysOpen        : false,                               // Must one panel always be open?
		allowMultiple     : false,                               // Allow multiple panels to be open at same time?
		classHead         : NS + '-head',                        // Head class.
		classHeadSelected : NS + '-head-selected',               // Head "selected" class.
		classPanel        : NS + '-panel',                       // Panel class.
		classPanelOpen    : NS + '-panel-open',                  // Panel "open" class.
		classSingle       : '',                                  // Have "external" link(s) open a single panel based on its hash?
		animIn            : { opacity: 'show', height: 'show' }, // Animation object used to show the panels.
		animOut           : { opacity: 'hide', height: 'hide' }, // IBID, but for hiding.
		easeIn            : 'swing',                             // Easing function in.
		easeOut           : 'swing',                             // Easing function out.
		speedIn           : 'normal',                            // Animation speed in.
		speedOut          : 'normal',                            // Animation speed out.
		onInit            : $.noop,                              // Callback on plugin initialization.
		onAfterInit       : $.noop,                              // Callback after plugin initialization.
		onBeforeShow      : $.noop,                              // Before reveal animation begins.
		onShow            : $.noop,                              // After reveal animation ends.
		onBeforeHide      : $.noop,                              // Before hide animation begins.
		onHide            : $.noop                               // After hide animation ends.
		
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
					// Find heads:
					//----------------------------------
					
					.find('.' + data.settings.classHead) // -->
					
					//----------------------------------
					// Remove data:
					//----------------------------------
					
					.removeData(NS + '.toggled')
					
					//----------------------------------
					// Remove handler:
					//----------------------------------
					
					.off('click.' + NS)
					
					//----------------------------------
					// Remove selected class:
					//----------------------------------
					
					.removeClass(data.settings.classHeadSelected) // -->
					
					//----------------------------------
					// Find panels:
					//----------------------------------
					
					.next('.' + data.settings.classPanel) // -->
					
					//----------------------------------
					// Remove open class:
					//----------------------------------
					
					.removeClass(data.settings.classPanelOpen) // -->
					
					//----------------------------------
					// Remove inline style:
					//----------------------------------
					
					.css('display', ''); // Smack!
					
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
	 * @param { object } data Parent data object literal.
	 */
	
	_main = function(data) {
		
		//----------------------------------
		// Hoist variables:
		//----------------------------------
		
		var $this = $(this),
		    $heads,
		    $heads_active,
		    $panels,
		    $panels_active;
		
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
			// Cache heads and panels:
			//----------------------------------
			
			$heads = $this.find('.' + data.settings.classHead);
			$panels = $this.find('.' + data.settings.classPanel);
			
			//----------------------------------
			// Cached heads and panels?
			//----------------------------------
			
			if ($heads.length && $panels.length) { // Compare length as well?
				
				//----------------------------------
				// URI hash to select active?:
				//----------------------------------
				
				$heads
					.filter(location.hash)                      // If there's a hash ID in the URI that matches a head ID ...
					.addClass(data.settings.classHeadSelected); // ... then apply the selected class to head.
				
				//----------------------------------
				// Cache active heads:
				//----------------------------------
				
				$heads_active = $heads.filter('.' + data.settings.classHeadSelected);
				
				//----------------------------------
				// Cache ative panels:
				//----------------------------------
				
				$panels_active = $panels.filter('.' + data.settings.classPanelOpen);
				
				//----------------------------------
				// If none, open first head/panel:
				//----------------------------------
				
				if (data.settings.alwaysOpen && ( ! $heads_active.length) && ( ! $panels_active.length)) {
					
					$heads_active = $heads.first();   // First head.
					$panels_active = $panels.first(); // First panel.
					
				}
				
				//----------------------------------
				// Hide inactive panels:
				//----------------------------------
				
				$panels
					.not($panels_active) // Not the active panel.
					.hide();             // Ensure non-active panels are hidden.
				
				//----------------------------------
				// Open all active heads/panels:
				//----------------------------------
				
				_open.call($heads_active.add(
					$panels_active.prev('.' + data.settings.classHead) // @TODO: Should I worry about dupes?
				), data);
				
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
						
						$heads
							.filter($(this).attr('href')) // Use anchor value.
							.trigger('click.' + NS);      // Boom goes the dynamite!
						
					});
					
				}
				
				//----------------------------------
				// Assign event handler to heads:
				//----------------------------------
				
				$heads.on('click.' + NS, function($e) {
					
					//----------------------------------
					// Hoist variables:
					//----------------------------------
					
					var $t = $(this);
					
					//----------------------------------
					// Prevent default action (if any):
					//----------------------------------
					
					$e.preventDefault();
					
					//----------------------------------
					// Toggle between open and closed:
					//----------------------------------
					
					if ( ! $t.data(NS + '.toggled')) { // OPEN!
						
						//----------------------------------
						// Multiple active heads/panels?
						//----------------------------------
						
						if ( ! data.settings.allowMultiple) {
							
							//----------------------------------
							// Nope. Close heads/panels:
							//----------------------------------
							
							_close.call($heads.not($t), data);
							
						}
						
						//----------------------------------
						// Open Sesame!
						//----------------------------------
						
						_open.call($t, data);
						
					} else { // CLOSE!
						
						//----------------------------------
						// Close head/panel, based on:
						//----------------------------------
						
						// When click is triggered ...
						// IF setting "alwaysOpen" is false, THEN close.
						// OR
						// IF setting "alwaysOpen" is true, AND, there are more than one panels open, close.
						// Otherwise, do nothing.
						if (( ! data.settings.alwaysOpen) || (data.settings.alwaysOpen && ($panels.filter('.' + data.settings.classPanelOpen).length > 1))) {
							
							//----------------------------------
							// Close up shop:
							//----------------------------------
							
							_close.call($t, data);
							
						}
						
					}
					
				});
				
			} else {
				
				//----------------------------------
				// Ouch!
				//----------------------------------
				
				console.warn('jQuery.' + NS, 'thinks your\'re missing head(s) and/or panel(s) for', this);
				
			}
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onAfterInit.call(data.target);
			
		}
		
	}, // _main
	
	//----------------------------------
	
	/**
	 * Open accordion method.
	 *
	 * @private
	 * @type { function }
	 * @this { object.jquery } A jQuery object that contains one or more head elements.
	 * @param { object } data Parent data object literal.
	 */
	
	_open = function(data) {
		
		//----------------------------------
		// Hoist variables:
		//----------------------------------
		
		var $this = $(this);
		
		//----------------------------------
		// Callback:
		//----------------------------------
		
		data.settings.onBeforeShow.call(data.target, $this);
		
		//----------------------------------
		// Toggle the active head/panel:
		//----------------------------------
		
		$this
			.data(NS + '.toggled', true)               // Set locally namespaced "toggled" data.
			.addClass(data.settings.classHeadSelected) // Toggle the head's "selected" class.
			.next('.' + data.settings.classPanel)  // Find the related panel ...
			.addClass(data.settings.classPanelOpen)    // Add the "open" class to panel.
			.stop(true, true)                          // Stop animation, clear queue and jumpt to end.
			.animate(
				data.settings.animIn,
				data.settings.speedIn,
				data.settings.easeIn,
				function() {
					
					//----------------------------------
					// Callback:
					//----------------------------------
					
					data.settings.onShow.call(data.target, $this, $(this)); // Show this MOFO!
					
				});
		
	}, // _open
	
	//----------------------------------
	
	/**
	 * Close accordion method.
	 *
	 * @private
	 * @type { function }
	 * @this { object.jquery } A jQuery object that contains one or more head elements.
	 * @param { object } data Parent data object literal.
	 */
	
	_close = function(data) {
		
		//----------------------------------
		// Hoist variables:
		//----------------------------------
		
		var $this = $(this);
		
		//----------------------------------
		// Callback:
		//----------------------------------
		
		data.settings.onBeforeHide.call(data.target, $this);
		
		//----------------------------------
		// Remove data boolean:
		//----------------------------------
		
		$this
			.removeData(NS + '.toggled')                  // Remove locally namespaced "toggled" data.
			.removeClass(data.settings.classHeadSelected) // Remove "selected" class from head.
			.next('.' + data.settings.classPanel)     // Find the related panel ...
			.removeClass(data.settings.classPanelOpen)    // Remove the "open" class.
			.stop(true, true)                             // Stop animation, clear queue and jumpt to end.
			.animate(
				data.settings.animOut,
				data.settings.speedOut,
				data.settings.easeOut,
				function() {
					
					//----------------------------------
					// Callback:
					//----------------------------------
					
					data.settings.onHide.call(data.target, $this, $(this)); // Hide this MOFO!
					
				});
		
	}; // _close
	
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
