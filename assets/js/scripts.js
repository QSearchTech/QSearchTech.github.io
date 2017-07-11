var data = {
	current_step: 1,
	chart_preview: false,
	chart: {
		type: 'bar',
		x_label: '',
		x_data: '',
		y_label_1: '',
		y_label_1_percentage: true,
		y_label_2: '',
		y_label_2_percentage: false,
		y_dataset: [],
	},
};

var vm = new Vue({
	// options
	el: '#main',
	data: data,
	created: function () {
		// body...
	},
	methods: {
		add_dataset: function (){
			vm.chart.y_dataset.unshift(
				{
					label: '',
					color: '',
					data: '',
					axis: 1,
				}
			);
		},
		detect_color: function (color) {
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
		},
		seperate_new_line: function (text) {
			return text.split(/\n/gm);
		},
		parse_number: function (text_array) {
			var new_array = text_array.map(function (element) {
				return parseFloat(element);
			});
			return new_array;
		},
		preview_chart: function () {
			// vm.chart_preview = true;
			// data handling
			var canvas_content = {};
			canvas_content.type = vm.chart.type;
			canvas_content.data = {
				labels: vm.seperate_new_line(vm.chart.x_data),
			};

			canvas_content.data.datasets = vm.chart.y_dataset.map(function(element){
				console.log(element);
				var new_element = {};
				var color = vm.detect_color(element.color);

				new_element.label = element.label;
				new_element.backgroundColor = color.background;
				new_element.borderColor = color.border;
				new_element.data = vm.parse_number(vm.seperate_new_line(element.data));

				if (element.axis === 1) {
					new_element.yAxisID = 'y-axis-1';
				} else if (element.axis === 2) {
					new_element.yAxisID = 'y-axis-2';
				}

				return new_element;
			});

			// chart options configuring
			canvas_content.options = {
				responsive: false,
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: vm.chart.x_label
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							autoSkip: false
						}
					}]
				},
				tooltips: {
					titleMarginBottom: 10,
					bodySpacing: 10,
					titleFontSize: isMobile() ? ( width < 360 ? 12 : 14) : 18,
          			bodyFontSize: isMobile() ? ( width < 360 ? 10 : 12) : 16,
					callbacks: {
						label: function(tooltipItems, data) { 
						    return ' ' + data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel + '%';
						}
					}
				}
			};

			// Y Axis handling
			if (vm.chart.y_label_2 !== '') {
				canvas_content.options.scales.yAxes = {};
				if (vm.chart.y_label_1_percentage === true) {
					canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1,
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							callback: function(value) {
								return value + "%";
							}
						}
					});
				} else {
					canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
						}
					});
				}

				if (vm.chart.y_label_2_percentage === true) {
					canvas_content.options.scales.yAxes.unshift({
						position: 'right',
						id: "y-axis-2",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_2
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							callback: function(value) {
								return value + "%";
							}
						}
					});
				} else {
					canvas_content.options.scales.yAxes.unshift({
						position: 'right',
						id: "y-axis-2",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_2
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
						}
					});
				}
			} else {
				canvas_content.options.scales.yAxes = {};
				if (vm.chart.y_label_1_percentage === true) {
					canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1,
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							callback: function(value) {
								return value + "%";
							}
						}
					});
				} else {
					canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1
						},
						ticks: {
							fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
						}
					});
				}
			}


			var ctx = document.getElementById('chart').getContext('2d');
			var chart = new Chart(ctx,canvas_content);
		}
	},
});