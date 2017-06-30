angular
	.module('designapp')
	.controller('VisualizeController', VisualizeController);

	VisualizeController.$inject = ['$scope','$rootScope','$http', '$location','orderByFilter','$filter','$window','$q'];

	function VisualizeController($scope,$rootScope,$http,$location,orderBy,$filter,$window,$q){
		// BEGIN FUNCTION DECLARATION
		$scope.init = init;

		// BEGIN VARAIABLE DECLARATION
		$scope.current_step = 1;
		$scope.chart = {
			type: 'barchart',
		};

		function init(){

		}
	}