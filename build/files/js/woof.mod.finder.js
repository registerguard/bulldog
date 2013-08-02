WOOF.register(function() {
	
	'use strict';
	
	var $finder = $('#finder'),
	    $finder_opts,
	    $finder_radios,
	    $finder_submit;
	
	if ($finder.length > 0) {
		
		$finder_opts   = $finder.find('#finder_opts');
		$finder_radios = $finder_opts.find('input[name="options"]');
		$finder_submit = $finder.find('#finder_submit');
		
		 // Remove any disabled attributes:
		$finder_radios.removeAttr('disabled');
		$finder_submit.removeAttr('disabled');
		
		// Submissions:
		$finder.submit(function() {
			
			// Based on radio button selection, change form action:
			$finder.attr('action', $finder_radios.filter(':checked').val());
			
			//if ($finder_opts.children('#finder_opt-1').is(':checked')) {} // Google Custom Search
			
			//if ($finder_opts.children('#finder_opt-2').is(':checked')) {} // Google News Archive Search
			
			// Need to change the search query string for Proquest searches:
			if ($finder_opts.children('#finder_opt-3').is(':checked')) {
				
				$finder.find('#finder_keywords').attr('name', 'QryTxt'); // Proquest Newspaper Archives
				
			}
			
			//if ($finder_opts.children('#finder_opt-2').is(':checked')) {} // BizFinder Local
			
			// Disable unwanted inputs upon submission:
			$finder_radios.attr({ disabled: 'disabled' });
			$finder_submit.attr({ disabled: 'disabled' });
			
		});
		
	} // $finder
	
}); // WOOF!
