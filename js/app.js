	var App = angular.module('lepota', [
        'ngRoute', 
        'colorpicker.module', 
        'ngSanitize', 
        'ui.select',
        'lepota.fabric',
        'lepota.fabric.constants'
    ]);

	App.config(function ($routeProvider) {
		'use strict';

		$routeProvider
			.when('/', {
      			templateUrl: 'tpl/template.html',
      			controller: 'HomeController'
    		})

    		.when('/:imageId', {
      			templateUrl: 'tpl/template.html',
      			controller: 'HomeController'
    		})

    		.when('/:imageId/preview', {
      			templateUrl: 'tpl/template.html',
      			controller: 'PreviewController'
    		})
    		
    		.otherwise({
      			redirectTo: '/'
    		});
		
	});

    (function() {

        var fonts = LepotaOptions.fonts;

        if ( fonts ) {
            WebFont.load({
                google: {
                    families: fonts
                }
            })
        };

    })();

