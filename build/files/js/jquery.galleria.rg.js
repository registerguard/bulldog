/**
 * The Register-Guard Galleria theme
 * http://registerguard.com
 *
 * Built off of the Galleria Classic Theme
 * http://galleria.io 
 *
 */

(function($) {
	
	$('.galleria').css('padding-top','0'); // do this here so that it doesn't grow twice as big before filling

/*global window, jQuery, Galleria */

Galleria.addTheme({
    name: 'rg',
    author: 'Rob Denton, The Register-Guard',
    //css: 'bulldog.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'height',
        debug: false,
        //thumbnails: 'lazy',

        // set this to false if you want to show the caption all the time:
        _toggleInfo: true,
        height: 0.75, // Set aspect ratio to be 3:4
		lightbox: false,
		fullscreenDoubleTap: false,
		idleMode: false,
		imageMargin: 0
		
    },
    init: function(options) {

        Galleria.requires(1.4, 'This version of Classic theme requires Galleria 1.4 or later');

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH;

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( 'click:fast', function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

		// bind some stuff
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6).bind('click:fast', function() {
                    $(this).css( 'opacity', 1 ).parent().siblings().children().css('opacity', 0.6);
                });
            }
        });

        var activate = function(e) {
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        };

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            window.setTimeout(function() {
                activate(e);
            }, touch ? 300 : 0);
            this.$('info').toggle( this.hasInfo() );
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
        
        /***********************************************************************/
        /*********************      ROB STUFF BELOW      ***********************/
        /***********************************************************************/
        
        this.remove('info','tooltip','counter');

		length = this.getDataLength();
		this.bind('image', function(e) {
			data = e.galleriaData;
			count = e.scope;
			//console.log('lenght: ' + e.getDataLength());
			length = this.getDataLength();
			$('.gal-count').html( (e.index+1)+'/'+length );
			if (data.description.length > 9){
				$('.gal-caption').html( " – " + data.description );
				//console.log(data.description.length);
			} else {
				$('.gal-caption').html("&nbsp;");
			};
			//console.log(length);
			if (length == 1){
				this.remove('image-nav');
				$('.gal-count').css('display','none');
			} else if (length < 1){
				//$('.slider').remove();
			}
			ga('send', 'event', 'image', 'load', 'slider');

		});
		
		
		
		/* WHY DOESN'T THIS WORK?!?! */
		
		//(function(r,g,n,e,w,s){r.GoogleAnalyticsObject=e;r[e]||(r[e]=function(){(r[e].q=r[e].q||[]).push(arguments)});r[e].l=+new Date;w=g.createElement(n);s=g.getElementsByTagName(n)[0];w.src='//www.google-analytics.com/analytics.js';w.async = 1;s.parentNode.insertBefore(w,s)}(window,document,'script','ga'));ga('create','UA-882065-1','registerguard.com');ga('require','displayfeatures');ga('require','linkid','linkid.js');ga('send','pageview',{'dimension1':'test','dimension2':'test','dimension3':'Jun 6, 2015 11:06PM','dimension4':'http://registerguard.com/rg/staging/33171483-110/galleria-test-02.html.csp','dimension5':'test','dimension6':'test','dimension7':'test'});
		
 		/*$('.galleria-image-nav-right').on('click', function() {
 			ga('send', 'event', 'right', 'click', 'slider');
			console.log('right');
 		});
 		$('.galleria-image-nav-left').on('click', function() {
 			ga('send', 'event', 'left', 'click', 'slider');
 			console.log('left');
 		});*/

/* ----------------- Don't worry about ads right now
		
		// add ad overlay
		this.addElement('ad-overlay');
			// append it in
			this.appendChild( 'container', 'ad-overlay' );
			// style overlay, full width, height
			$('.galleria-ad-overlay').html('.galleria-ad-overlay').css('background-color', 'black').css('z-index', '9').css('position','absolute').css('top','0px').css('width','100%').css('bottom','0px').css('display','none');
			// add advert wrap div
			this.addElement('advert');
				this.appendChild('ad-overlay', 'advert');
			// add ad close button
			this.addElement('ad-overlay-close')
				this.appendChild('ad-overlay', 'ad-overlay-close');
				// style close button
				$('.galleria-ad-overlay-close').html('<i class="fa fa-times"></i>').css('font-size','1.2em').css('cursor','pointer').css('color','white').css('background-color','rgba(0,0,0,0)').css('padding','20px').css('position','absolute').css('top','0px').css('width','20px').css('height','20px').css('right','0px').click(function(){ $('.galleria-ad-overlay').hide(); });
		
		this.bind('image', function(e) {
			// if the image index is divisible by 5, not including zero
			if ((e.index % 5 == 0) && (e.index != 0)){
				// make the ad overlay show
				$('.galleria-ad-overlay').css('display','block');
				// clear the current ad content
				$('.galleria-advert').html('ADVERTISEMENT<br>').css('color','white').css('font-family','sans-serif').css('width','100%').css('text-align','center').css('position','absolute').css('top','50%').css('transform','translateY(-50%)');//.css('opacity','0');
				// add content div that will be have an id attached and targeted
				//console.log(this);
				this.addElement('ad-overlay-content');
					// append element
					this.appendChild('advert', 'ad-overlay-content');
				// give it some style, remove an id if it has one, then give it an id
				$('.galleria-ad-overlay-content').css('background','black').removeAttr('id').html('Hello.<br>We really enjoy bringing you the news<br>and online advertising helps us do that.<br>Please disable ad blocking software for<br>The Register-Guard. Thank you.').attr('id','ad-overlay-5');
				// Get ads async
				_ox.addAdUnit('537969703'); // Medium Rectangle 1
				_ox.setAdUnitSlotId('537969703', 'ad-overlay-5');
				_ox.addVariable('bp', ((window.innerWidth <= 1005) ? 'm' : 'd')); // ... return "m" or "d", where 1005px is the break point between "mobile" and "desktop".
				_ox.addVariable('s', 'staging');
				_ox.addVariable('s', 'home');
				_ox.load();
			}
			else{
				console.log(" --- ! % 5: " + e.index);	
			}
		});
		
----------------- */
        
        /***********************************************************************/
        
    }
});

}(jQuery));
