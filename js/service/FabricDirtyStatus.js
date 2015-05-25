angular.module('lepota.fabric.dirtyStatus', [])

.service('FabricDirtyStatus', ['$window', function($window) {

	var self = {
		dirty: false
	};

	function checkSaveStatus() {
		if (self.isDirty()) {
			return "Oops! Вы не сохранили изменения.\n\nПожалуйста, сохраните перед отъездом, так что вы не потеряете работу.";
		}
	}

	self.endListening = function() {
		$window.onbeforeunload = null;
		$window.onhashchange = null;
	};

	self.startListening = function() {
		//$window.onbeforeunload = checkSaveStatus;
		//$window.onhashchange = checkSaveStatus;
	};

	self.isDirty = function() {
		return self.dirty;
	};

	self.setDirty = function(value) {
		self.dirty = value;
	};

	return self;

}]);
