WOOF.register(function() {
	
	'use strict';
	
	//Adding stars for movie reviews
	var $starz = $('.QuickFacts-QuickFacts_Stars_sssss_Movie').text(),
	$istarz = 0;
	
	for ($istarz = 0; $istarz < $starz.length; $istarz++) {
		$starz = $starz.replace('s','&#9733;');
	}
	$('.QuickFacts-QuickFacts_Stars_sssss_Movie').html($starz);
	
}); // WOOF!