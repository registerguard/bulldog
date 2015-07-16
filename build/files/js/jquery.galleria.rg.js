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
        
        // More configuration in slider02.csp
        
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
        
    }
});

}(jQuery));
