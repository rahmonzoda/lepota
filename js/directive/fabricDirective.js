(function(angular) {
	var App = angular.module('lepota.fabric.directive', [
		'lepota.fabric.canvas'
	])

	App.directive('fabric', ['$timeout', 'FabricCanvas', '$window', function($timeout, FabricCanvas, $window) {

		return {
			scope: {
				fabric: '='
			},
			controller: function($scope, $element) {

				FabricCanvas.setElement($element);
				FabricCanvas.createCanvas();


				$('body').on('click', 'canvas', function() {
					if ($scope.fabric.setUserHasClickedCanvas) {
						$scope.fabric.setUserHasClickedCanvas(true);
					}
				});

				//
				// Watching Controller Variables
				// ============================================================
				
				$scope.$watch('fabric.selectedObject.text', function(newVal) {
					if (typeof newVal === 'string') {
						$scope.fabric.setText(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.fontSize', function(newVal) {
					if (typeof newVal === 'string' || typeof newVal === 'number') {
						$scope.fabric.setFontSize(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.lineHeight', function(newVal) {
					if (typeof newVal === 'string' || typeof newVal === 'number') {
						$scope.fabric.setLineHeight(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.textAlign', function(newVal) {
					if (typeof newVal === 'string') {
						$scope.fabric.setTextAlign(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.fontFamily', function(newVal) {
					if (typeof newVal === 'string' && newVal) {
						$scope.fabric.setFontFamily(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.opacity', function(newVal) {
					if (typeof newVal === 'string' || typeof newVal === 'number') {
						$scope.fabric.setOpacity(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.fill', function(newVal) {
					if (typeof newVal === 'string') {
						$scope.fabric.setFill(newVal);
						$scope.fabric.render();
					}
				});

				$scope.$watch('fabric.selectedObject.tint', function(newVal) {
					if (typeof newVal === 'string') {
						$scope.fabric.setTint(newVal);
						$scope.fabric.render();
					}
				});
			}
		};

	}]);

	App.directive('arts', ['$timeout', 'Fabric', 'FabricConstants', '$window', function($timeout, Fabric, FabricConstants, $window) {

		return {
			restrict: 'EA',
	      	replace: true,
	      	scope: true,
	      	templateUrl: "tpl/directive/arts.html",
	      	controllerAs: 'arts',
			controller: function($scope, $element) {

				$scope.clipArts = FabricConstants.clipArts;

				$scope.arts = $scope.clipArts.arts;
				$scope.categories = [ {id: 0, name: 'Все категории', children: []} ];		
				$scope.subcategories = [ {id: 0, name: 'Все подкатегории', children: []} ];			


				for (var key in $scope.clipArts.categories) {
					$scope.categories.push( $scope.clipArts.categories[key] )
				}


				$scope.selectCategory = 0;
				$scope.selectSubCategory = 0;

				$scope.isSubcat = false;
				$scope.actionCategory = function() {

					filterArt( $scope.selectCategory )

					$scope.categories.forEach(function(cat) {
						if ( cat.id === $scope.selectCategory ) {

							if ( cat.children.length > 0) {
								$scope.subcategories = $scope.subcategories.concat( cat.children );
								$scope.isSubcat = true;
							} else {
								$scope.subcategories.splice(1, ($scope.subcategories.length - 1 ) )
								$scope.isSubcat = false;
							}

						}

					});

				};
				
				$scope.actionSubCategory = function() {
					filterArt( $scope.selectCategory, $scope.selectSubCategory )
				};

				function filterArt(id, subId) {
					var id = parseInt( id );
					var subId = subId ? parseInt( subId ) : id;

					var arts = $scope.clipArts.arts;

					if ( id !== 0 ) {

						$scope.arts = arts.filter(function(art) {

							if ( (art.categories.indexOf( id ) !== -1) && (art.categories.indexOf( subId ) !== -1) ) {
								return art;
							};

						});

					} else {
						$scope.arts = arts;
					}

				};

			}
		};

	}]);

})(angular);