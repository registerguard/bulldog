// Set up slider var
var slider = $('.iosSlider');

// Check to see if there are any sliders on the page
if (slider.length) {
	
	//var slidersCount = slider.length;
	//console.log(slidersCount);
	
	// Loop over every slider that's on the page
	// This is needed to allow buttons to work
	slider.each(function(i){
		
		// We want the count of the loop
		// to keep track of the id. The 
		// loop index starts at 0 but the
		// loop index in cache starts at 1
		// so we add one here.
		var count = i + 1;
		//console.log(count);
		
		// Get the slider object
		var sliderObj = $('.iosSlider' + count);
		//console.log(sliderObj);
		
		// Initialize iosSlider
		// Options: https://www.iosscripts.com/iosslider/#settings-and-options
		sliderObj.iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
			navNextSelector: $('.next' + count),
			navPrevSelector: $('.prev' + count),
			infiniteSlider: true,
			scrollbarHeight: '100px',
			autoSlide: true,
			autoSlideTimer: 7000
			
		});
		
	});
	
	// We set these to visibility: none in the CSS so that if
	// JS doesn't load it fails gracefully, only showing the
	// first story.
	$('.container .nextContainer').css('visibility','visible');
	$('.container .prevContainer').css('visibility','visible');
	
}