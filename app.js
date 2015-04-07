var app = angular.module('testApp', ['tableGistogram']);

app.controller('mainCtrl', ['$scope', function($scope){

		$scope.scopeShowGistogram = true;

		$scope.hideTable  = function () {
			$scope.scopeShowGistogram = false;
		}

		$scope.showTable  = function () {
			$scope.scopeShowGistogram = true;	
		}

}])