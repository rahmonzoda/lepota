	App.controller('HomeController', [
		'$scope', 
		'$routeParams',
		'Fabric',
		'FabricConstants',

		function HomeController($scope, $routeParams, Fabric, FabricConstants) {
			'use strict';			
			
			$scope.fabric = {};
	        $scope.FabricConstants = FabricConstants;


			$scope.images = $scope.FabricConstants.product.images;
			$scope.imageId = $routeParams.imageId ? $routeParams.imageId : $scope.images[0].id;
	       
			if ( $scope.images.length > 1) {
				$scope.thumbnails = true;

				$scope.images.forEach(function(image, index) {
					var imageNext;
					var imagePrev;

					if ( $scope.imageId === image.id ) {

						imagePrev = index - 1;
						imageNext = index + 1;
						
						if ( imagePrev < 0 ) {
							imagePrev = ($scope.images.length - 1)
						};

						if ( $scope.images.length <= imageNext ) {
							imageNext = 0
						};

						$scope.imageActive = image;
						$scope.imageNext = $scope.images[ imageNext ];					
						$scope.imagePrev = $scope.images[ imagePrev ];

					};

				})

			} else {
				$scope.thumbnails = false;
			}

			$scope.selectCanvas = function () {
	            $scope.canvasCopy = {
	                width: $scope.fabric.canvasOriginalWidth,
	                height: $scope.fabric.canvasOriginalHeight
	            };
	        };

	        $scope.setCanvasSize = function () {
	            $scope.fabric.setCanvasSize(650, 650);
	            $scope.fabric.setDirty(true);
	            delete $scope.canvasCopy;
	        }

			$scope.init = function () {
	            $scope.fabric = new Fabric({
	                JSONExportProperties: FabricConstants.JSONExportProperties,
	                textDefaults: FabricConstants.textDefaults,
	                shapeDefaults: FabricConstants.shapeDefaults,
	                json: {}
	            });

	            $scope.printArea();

	        };

	        $scope.toggleArts = function() {
	        	$scope.fabric.selectedObject.type = 'image'
	        };

	        $scope.printArea = function() {
	        	$scope.fabric.createPrintArea($scope.imageActive)
	        }


			$scope.$on('canvas:created', $scope.init);


		


			$scope.artToggle = false;
			$scope.toggleArts = function() {
				$scope.artToggle = $scope.artToggle ? false : true;
			};

			$scope.addArt = function(art) {
				event.preventDefault();
				$scope.artToggle = false;

				if ( art.clipart ) {
					$scope.fabric.addShape( art.url );
				} else {
					$scope.fabric.addImage( art.url )
				}
			};

		    $scope.setFiles = function(input) {
		    	var file = input.files[0], img;

		    	if ( file.type.search('image') !== -1 ) {
		    		img = new Image,
					img.src = URL.createObjectURL(file)
					img.onload = function() {
						$scope.fabric.addImage(img.src);
					}
		    	} else {
		    		alert('Неверный формат ')
		    	}
			};
		}
	]);



	App.controller('PreviewController', ['$scope','Fabric', 'FabricConstants',
		function PreviewController($scope, $routeParams, FabricConstants){
			$scope.fabric = {};
			$scope.FabricConstants = FabricConstants;

			$scope.images = $scope.FabricConstants.product.images;
			$scope.imageId = $routeParams.imageId ? $routeParams.imageId : $scope.images[0].id;
		}
	]);

