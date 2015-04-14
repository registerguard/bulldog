WOOF.register(function() {
	
	'use strict';
	
	//$('.Recipes-Recipe_Items_Tab').replace ('', 'hello');
	//$('.QuickFacts-QuickFacts_Stars_sssss_Movie').replaceAll('s','&#9733;');
	//var starz = $('.QuickFacts-QuickFacts_Stars_sssss_Movie');
	//starz = starz.replaceAll('s','h');
	//starz.each
	var $starz = $('.QuickFacts-QuickFacts_Stars_sssss_Movie').text(),
	$istarz = 0;
	
	for ($istarz = 0; $istarz < $starz.length; $istarz++) {
		$starz = $starz.replace('s','&#9733;');
	}
	$('.QuickFacts-QuickFacts_Stars_sssss_Movie').html($starz);
	
	
}); // WOOF!