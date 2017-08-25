// global variable
var data = {
	current_step: 1,
	chart_preview: false,
	table_preview: false,
	chart_type: 'bar',
	title: '',
	chart: {
		x_label: '',
		x_data: '',
		y_label_1: '',
		y_label_1_percentage: false,
		y_label_2: '',
		y_label_2_percentage: false,
		y_dataset: [],
	},
	table: {
		header_row: [],
		header_color: 'purple',
		left_number: true,
		header_data: '',
		body_data: [],
	},
	chord: {
		json_data: [],
		json_filename: '',
		json_status: 0,
		chord_filename: '',
	},
	// filename: '',
	canvas_content: {},
	saved_canvas_content: {},
	chart_data: {},
	chart_file: null,
	show_download: false,
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
		file_upload: function(files){
			var target_file;
			if (!files.length)
	                return;

	        // console.log(files);
	        var config = {
	        	header: true,
	        	skipEmptyLines: true,
	        	error: function(error){
	        		$('body').pgNotification(
	        			{
	        				message: '你上傳的檔案有誤，請再試一次。',
	        				type: 'danger'
	        			}
	        		).show();
	        	},
	        	complete: function(data){
	        		vm.chord.json_data = data.data;
	        		vm.chord.json_status = 1;
	        	}
	        };

	        target_file = files[0];
	        Papa.parse(target_file, config);
		},
		create_chord: function(){
			var json_link = document.getElementById('hidden-json-download');
			json_link.href = vm.render_file(JSON.stringify(vm.chord.json_data),'text/json');
			json_link.setAttribute('download',vm.chord.json_filename + '.json');
			json_link.click();


			var chord_text = 
				'<!DOCTYPE html>' +
				'<html>' + 
				'<head>' +  
				'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css" type="text/css" >' +
				'<link rel="stylesheet" href="https://cdn.jsdelivr.net/flexboxgrid/6.3.0/flexboxgrid.min.css" type="text/css" >' +
				'<meta charset="utf-8">' +
				'<meta name="viewport" content="width=device-width">' +
				'<title>QSearch Chord Chart</title>' +
				'<link rel="stylesheet" type="text/css" href="../assets/css/chord_chart.css">' +
				'</head>' +
				'<body>' +
				'<div class="row">' +
				'<div class="col-xs-12 center-xs">' +
				'<h2 id="title">各大媒體按讚群眾重疊度</h2>' +
				'<div id="legend">' +
				'<span class="legend middle-xs">電視</span>' +
				'<span class="legend middle-xs">日報</span>' +
				'<span class="legend middle-xs">雜誌</span>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="row middle-sm">' +						
				'<div class="chart col-xs-12 col-sm-9 last-sm"></div>' +
				'<div class="table col-xs-12 col-sm-3 center-xs start-sm">' + 
				'<h3></h3>' +
				'<div class="table-container row bottom-xs"></div>' +
				'</div>' +
				'</div>' +
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>' +
				'<script src="https://code.jquery.com/jquery-2.1.4.js"></script>' +
				'<script src="../assets/js/chord_chart.js"></script>' +
				'<script type="text/javascript">' +
				'$(function() {' +
				'$("#title").prepend(' + vm.title + ');' +
				'$.get("https://qsearchtech.github.io/archives/chord_data/' + vm.chord.json_filename + '.json", function(data) {' +
				'console.log(data);' +
				'if (data.length) {' +
				'data = data.map(function(d) {'	+
				'var id = d.id;' +
				'delete d.id;' +
				'var named = {name: getNameById[id]};' +
				'Object.keys(d).forEach(function(key) {named[getNameById[key]] = d[key];});' +
				'return named;});' +
				'drawChord(data);}});' +
				'$(".legend").each(function() {' +
				'var legend = $(' + '"<span class=' + '"legend-color"' + '></span>");' +
				'legend.css({background: getColorByType($(this).text())});' + 
				'$(this).prepend(legend);});});' +
				'</script><script src="https://qsearchtech.github.io/assets/js/local_message.js"></script></body></html>';

			var chord_link = document.getElementById('hidden-chord-download');
			chord_link.href = vm.render_file(chord_text,'text/plain');
			chord_link.setAttribute('download',vm.chord.chord_filename + '.html');
			chord_link.click();

		},
		add_dataset: function (){
			vm.chart.y_dataset.unshift(
				{
					label: '',
					color: 'purple',
					data: '',
					axis: 1,
				}
			);
		},
		add_table_row: function(){
			var row_data = {};
			row_data.array = [];
			row_data.raw = '';
			vm.table.body_data.unshift(row_data);
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
			vm.chart_preview = true;
			// vm.show_download = true;
			// device handling
			// var width = window.innerWidth;
			// if (isMobile()) {
			//     document.getElementById('chart').setAttribute('width', 360);
			//     document.getElementById('chart').setAttribute('height', 360);
			// }
			// data handling
			vm.canvas_content.type = vm.chart_type;
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
				responsive: false,
				title: {
		            display: true,
		            text: vm.title
		        },
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: vm.chart.x_label
						},
						ticks: {
							fontSize: 10,
							autoSkip: false
						}
					}]
				},
				tooltips: {
					titleMarginBottom: 10,
					bodySpacing: 10,
					titleFontSize: 14,
          			bodyFontSize: 12,
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
							fontSize: 10,
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
							fontSize: 10,
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
							fontSize: 10,
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
							fontSize: 10,
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
							fontSize: 10,
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
							fontSize: 10,
						}
					});
				}
			}

    		var cache = [];
			vm.chart_data = JSON.stringify(vm.canvas_content, function(key, value) {
			    if (typeof value === 'object' && value !== null) {
			        if (cache.indexOf(value) !== -1) {
			            // Circular reference found, discard key
			            return;
			        }
			        // Store value in our collection
			        cache.push(value);
			    }
			    return value;
			});
			cache = null; // Enable garbage collection

			console.log(vm.chart_data);

			vm.canvas_content.options.responsive = true;
			
			var ctx = document.getElementById('chart').getContext('2d');
			var chart = new Chart(ctx,vm.canvas_content);
		},
		download_chart: function () {
 			console.log('download');

			var chart_text = 
				'<!DOCTYPE html><html><head><title></title></head><body><canvas id="myChart" width="900" height="450"></canvas><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script><script type="text/javascript">var width=window.innerWidth;function isMobile(){var check=false;(function(a){if(/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(a.substr(0,4))){check=true;}})(navigator.userAgent||navigator.vendor||window.opera);return check;}if(isMobile()){document.getElementById(\"myChart\").setAttribute(\"width\",300);document.getElementById(\"myChart\").setAttribute(\"height\",250);console.log(width);}var ctx=document.getElementById(\"myChart\").getContext(\"2d\");var chart=new Chart(ctx,' + vm.chart_data + ');</script></body></html>';

			var link = document.getElementById('download-chart');
			link.href = vm.render_file(chart_text,'text/plain');
			// window.open(link, "_blank");
		},
		preview_table: function() {
			vm.table_preview = true;
			vm.table.header_row = vm.seperate_new_line(vm.table.header_data);

			if (vm.table.left_number === true) {
				vm.table.header_row.unshift('#');
			}

			for (var i = 0; i < vm.table.body_data.length; i++) {
				vm.table.body_data[i].array = vm.seperate_new_line(vm.table.body_data[i].raw);

				if (vm.table.left_number === true) {
					vm.table.body_data[i].array.unshift(i + 1);
				}
			}

			setTimeout(
				function(){
				var table_content = document.getElementById('table-content').innerHTML;
				var table_text = 
					'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous"><style>h5{padding-top:15px}table{color:#333;margin-top:20px;font-size:.8rem}table thead th.bg-purple{background-color:#E2DEEF;border:none}@media (max-width:576px){h5{font-size:1rem}table{font-size:.5rem}.table td,.table th{padding:.5rem}}</style></head><body><div class="container"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12" id="main-content"><h5 class="text-center p-t-20">' + vm.title + '</h5>' + table_content + '</div></div></div><script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script><script src="https://qsearchtech.github.io/archives/common.js"></script></body></html>';

				var link = document.getElementById('download-table');
				link.href = vm.render_file(table_text,'text/plain');
			}, 3000);
		},
		render_file: function (text,type) {
			var file = new Blob([text], {type: type});

			// Manually revoke the object URL to avoid memory leaks
			if (vm.chart_file !== null) {
				window.URL.revokeObjectURL(file);
			}

			vm.chart_file = window.URL.createObjectURL(file);
			return vm.chart_file;
		},
	},
});