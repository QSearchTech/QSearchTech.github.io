// global variable
var data = {
	current_step: 1,
	chart_preview: false,
	chart: {
		title: '',
		type: 'bar',
		x_label: '',
		x_data: '',
		y_label_1: '',
		y_label_1_percentage: false,
		y_label_2: '',
		y_label_2_percentage: false,
		y_dataset: [],
	},
	filename: '',
	canvas_content: {},
	chart_file: null,
	show_download_modal: false,
};

// components
Vue.component('download-modal', {
  template: '#download-modal'
});

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
		// isMobile: function () {
		//   var check = false;
		//   (function(a){
		//     if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) { check = true; }
		//   })(navigator.userAgent||navigator.vendor||window.opera);
		//   return check;
		// },
		preview_chart: function () {
			vm.chart_preview = true;
			// device handling
			// var width = window.innerWidth;
			// if (isMobile()) {
			//     document.getElementById('chart').setAttribute('width', 360);
			//     document.getElementById('chart').setAttribute('height', 360);
			// }
			// data handling
			vm.canvas_content.type = vm.chart.type;
			vm.canvas_content.data = {
				labels: vm.seperate_new_line(vm.chart.x_data),
			};

			vm.canvas_content.data.datasets = vm.chart.y_dataset.map(function(element){
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
			vm.canvas_content.options = {
				// responsive: false,
				title: {
		            display: true,
		            text: vm.chart.title
		        },
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: vm.chart.x_label
						},
						ticks: {
							// fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							autoSkip: false
						}
					}]
				},
				tooltips: {
					titleMarginBottom: 10,
					bodySpacing: 10,
					// titleFontSize: isMobile() ? ( width < 360 ? 12 : 14) : 18,
          			// bodyFontSize: isMobile() ? ( width < 360 ? 10 : 12) : 16,
					callbacks: {
						label: function(tooltipItems, data) { 
						    return ' ' + data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel + '%';
						}
					}
				}
			};

			// Y Axis handling
			if (vm.chart.y_label_2 !== '') {
				vm.canvas_content.options.scales.yAxes = [];
				if (vm.chart.y_label_1_percentage === true) {
					vm.canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1,
						},
						ticks: {
							// fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							callback: function(value) {
								return value + "%";
							}
						}
					});
				} else {
					vm.canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1
						},
						ticks: {
							// fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
						}
					});
				}

				if (vm.chart.y_label_2_percentage === true) {
					vm.canvas_content.options.scales.yAxes.unshift({
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
					vm.canvas_content.options.scales.yAxes.unshift({
						position: 'right',
						id: "y-axis-2",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_2
						},
						ticks: {
							// fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
						}
					});
				}
			} else {
				vm.canvas_content.options.scales.yAxes = [];
				if (vm.chart.y_label_1_percentage === true) {
					vm.canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1,
						},
						ticks: {
							// fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
							callback: function(value) {
								return value + "%";
							}
						}
					});
				} else {
					vm.canvas_content.options.scales.yAxes.unshift({
						position: 'left',
						id: "y-axis-1",
						scaleLabel: {
							display: true,
							labelString: vm.chart.y_label_1
						},
						ticks: {
							// fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
						}
					});
				}
			}

			var ctx = document.getElementById('chart').getContext('2d');
			var chart = new Chart(ctx,vm.canvas_content);
		},
		download_file: function () {
 			console.log('download');
 			// mobile chart adjustments
 			// vm.canvas_content.options.responsive = false;
 			// vm.canvas_content.options.scales.xAxes[0].ticks.fontSize = isMobile() ? ( width < 360 ? 8 : 10) : 12;
 			// vm.canvas_content.options.tooltips.titleFontSize = isMobile() ? ( width < 360 ? 12 : 14) : 18;
    //       	vm.canvas_content.options.tooltips.bodyFontSize = isMobile() ? ( width < 360 ? 10 : 12) : 16;
    //       	vm.canvas_content.options.scales.yAxes.map(function(element){
    //       		element.ticks.fontSize = isMobile() ? ( width < 360 ? 8 : 10) : 12;
    //       		return element;
    //       	});

			var chart_text = 
				'<!DOCTYPE html><html><head><title></title></head><body><canvas id="myChart" width="300" height="150"></canvas><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script><script type="text/javascript">var width=window.innerWidth;function isMobile(){var check=false; (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){check=true;}})(navigator.userAgent||navigator.vendor||window.opera); return check;}if (isMobile()){document.getElementById("myChart").setAttribute("width", 300); document.getElementById("myChart").setAttribute("height", 250); console.log(width);}var ctx=document.getElementById("myChart").getContext("2d");var chart=new Chart(ctx,{' + vm.canvas_content.toString() + ');</script></body></html>';

			var link = document.getElementById('download-btn');
			link.href = vm.render_file(chart_text);
			// window.open(link, "_blank");
		},
		render_file: function (text) {
			var file = new Blob([text], {type: 'text/plain'});

			// Manually revoke the object URL to avoid memory leaks
			if (vm.chart_file !== null) {
				window.URL.revokeObjectURL(chart_file);
			}

			vm.chart_file = window.URL.createObjectURL(file);
			return vm.chart_file;
		},
	},
});