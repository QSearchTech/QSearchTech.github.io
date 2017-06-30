angular
	.module('designapp')
	.controller('VisualizeController', VisualizeController);

	VisualizeController.$inject = ['$scope','$rootScope','$http', '$location','orderByFilter','$filter','$window','$q'];

	function VisualizeController($scope,$rootScope,$http,$location,orderBy,$filter,$window,$q){
		// BEGIN FUNCTION DECLARATION
		$scope.init = init;
		$scope.add_dataset = add_dataset;
		$scope.preview_chart = preview_chart;

		// BEGIN VARAIABLE DECLARATION
		$scope.current_step = 1;
		$scope.chart_preview = false;
		$scope.color = [
			{
				name: 'purple',
			},
			{
				name: 'blue'
			},
			{
				name: 'green',
			},
			{
				name: 'orange',
			},
			{
				name: 'yellow',
			}
		];
		$scope.chart = {
			type: 'bar',
			x_label: '',
			x_data: '',
			y_label_1: '',
			y_label_1_percentage: true,
			y_label_2: '',
			y_label_2_percentage: false,
			y_dataset: [],
		};

		function init(){

		}

		function color_detect(color) {
			switch(color) {
				case 'purple':
					return {
						background: 'rgba(109, 92, 174, 0.5)',
						border: 'rgba(109, 92, 174, 1)',
					};

				case 'blue':
					return {
						background: 'rgba(72, 176, 247, 0.5)',
						border: 'rgba(72, 176, 247, 1)'
					};

				case 'green':
					return {
						background: 'rgba(16, 207, 189, 0.5)',
						border: 'rgba(16, 207, 189, 1)'
					};

				case 'orange':
					return {
						background: 'rgba(245, 87, 83, 0.5)',
						border: 'rgba(245, 87, 83, 1)'
					};

				case 'yellow':
					return {
						background: 'rgba(248, 208, 83, 0.5)',
						border: 'rgba(248, 208, 83, 1)'
					};
			}
		}

		function preview_chart(){
			// data handling
			// 1. x axis label

			var ctx = document.getElementById('chart').getContext('2d');
			var chart = new Chart(ctx, {
				// The type of chart we want to create
				type: $scope.chart.type,

				// The data for our dataset
				data: {
					labels: [
						"China Times", 
						"ETNEWS新聞雲", 
						"TVBS 新聞", 
						"udn.com 聯合新聞網", 
						"Yahoo! 奇摩新聞", 
						"三立新聞", 
						"中央社新聞粉絲團", 
						"今周刊", 
						"商業周刊（商周.com）", 
						"壹週刊", 
						"天下雜誌", 
						"東森新聞", 
						"自由時報", 
						"蘋果日報", 
						"蘋果日報即時新聞", 
						"遠見雜誌"],
					datasets: [
						{
							label: "3 - 5 月互動黏著度成長率",
							backgroundColor: 'rgba(109, 92, 174, 0.5)',
							borderColor: 'rgba(109, 92, 174, 1)',
							borderWidth: 2,
							data: [
								22.44,
								-2.7,
								2.47,
								2.92,
								-10.78,
								1.75,
								-1.53,
								-0.92,
								-3.53,
								10.64,
								-2.41,
								-5.23,
								-3.49,
								-1.94,
								-15.71,
								-1.2,
							],
						},
						{
							label: "3 - 5 月不重複的粉絲人數成長率",
							backgroundColor: 'rgba(72, 176, 247, 0.5)',
							borderColor: 'rgba(72, 176, 247, 1)',
							borderWidth: 2,
							data: [
								-22.14,
								-15.25,
								-21.62,
								15.59,
								-13.76,
								-9.48,
								-15,
								-35.07,
								0.78,
								25.5,
								-26.84,
								-8.32,
								-18.94,
								16.42,
								24.52,
								-14.51,
							],
						}
					],
				  
				},

				// Configuration options go here
				options: {
				  scales: {
					yAxes:[{
						ticks:{
							callback: function(value) {
								return value + "%";
							}
						},
						scaleLabel: {
							display: true,
							labelString: "百分比"
						}
					}],
					xAxes:[{
						scaleLabel: {
							display: true,
							labelString: $scope.chart.x_label
						},
						ticks: {
							autoSkip: false
						}
					}]
				  },
				  tooltips: {
				  	titleMarginBottom: 10,
					bodySpacing: 10,
					callbacks: {
		                label: function(tooltipItems, data) { 
	                        return ' ' + data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel + '%';
	                    }
		            }
				  }
				}
			});
		}

		function add_dataset(){
			$scope.chart.y_dataset.unshift(
				{
					label: '',
					color: '',
					data: '',
					axis: 1,
				}
			);
		}
	}