// global variable
var data = {
	current_step: 1,
	chart_preview: false,
	table_preview: false,
	chart_type: 'ranking',
	title: '近一週最令人憤怒貼文排行',
	chart: {
		x_label: '',
		x_data: '',
		y_label_1: '1',
		y_label_1_percentage: false,
		y_label_1_begin_at_zero: false,
		y_label_2: '',
		y_label_2_percentage: false,
		y_label_2_begin_at_zero: false,
		y_dataset: [],
		seperator: {
			x: '\\n',
			y: '\\n'
		},
		beizer: 0.5,
		show_lines: true,
		bulk_raw_data: ''
	},
	table: {
		header_row: [],
		header_color: 'purple',
		left_number: true,
		header_data: '',
		body_data: []
	},
	table_v2: {
		raw_data: '',
		header_data: [],
		body_data:[],
		has_header: true,
		header_color: 'purple',
		left_number: true
	},
	chord: {
		json_data: [],
		json_filename: '',
		json_status: 0,
		chord_filename: '',
	},
	ranking: {
		data: [{
			content: '前幾天聽到一件很有趣的事, 解法也很有趣. 網頁現在都是採用UTF-8 編碼, 但是在IE 呈現時, 卻是出現亂碼(自動偵測語系). 聽到的解法:',
			angry_cnt: 200,
			angry_score:200,
			like_cnt: 200,
			link: 'https://cssminifier.com/',
			image: 'https://i.imgur.com/WjdpB91.jpg'
		},{
			content: '前幾天聽到一件很有趣的事, 解法也很有趣. 網頁現在都是採用UTF-8 編碼, 但是在IE 呈現時, 卻是出現亂碼(自動偵測語系). 聽到的解法:',
			angry_cnt: 200,
			angry_score:200,
			like_cnt: 200,
			link: 'https://cssminifier.com/',
			image: 'https://i.imgur.com/WjdpB91.jpg'
		}],
		// content | angry_cnt | angry_score | like_cnt | link | image
		start_time: moment().format('ll'),
		end_time: moment().add(1, 'day').format('ll'),
		endtime_disabled: {
			from: null
		},
		dpkrconfig: {
			format: 'll',
			date: new Date()
		}
	},
	image_upload: {
		src: ''
	},
	// filename: '',
	canvas_content: {},
	saved_canvas_content: {},
	chart_data: {},
	chart_file: null,
	show_download: false
};


// components
Vue.component('download-modal', {
  template: '#download-modal'
});

Vue.component('draggable-table', {
    components: { draggable },
    template: '#draggable'
});

Vue.component('date-picker', VueBootstrapDatetimePicker.default);

var vm = new Vue({
	// options
	el: '#main',
	data: data,
	created: function () {

	},
	methods: {
		prev_image_upload: function(files, idx) {
			console.log('upload')
      console.log(files)

      var target_file = new FormData();
      target_file.append('image', files[0])
      target_file.append('mime', files[0].type)
      axios.post('https://api.imgur.com/3/image', target_file, {
      	'Content-Type': 'multipart/form-data',
      	headers: { 'Authorization': 'Client-ID 3ca6eb7d18fb904' }
      	
      }).then(response => {
      	var img_url = response.data.data.link
      	vm.ranking.data[idx].image = img_url;
      	$('body').pgNotification(
    			{
    				message: '上傳完畢',
    				type: 'success'
    			}
    		).show();
      }).catch(err => {
      	$('body').pgNotification(
    			{
    				message: '你上傳的檔案有誤，請再試一次。',
    				type: 'danger'
    			}
    		).show();
      })
    },
		file_upload: function(files){
			var target_file;
			if (!files.length)
	                return;

	        // console.log(files);
	        var config = {
	        	header: true,
	        	skipEmptyLines: true,
	        	dynamicTyping: true,
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
			console.log(JSON.stringify(vm.chord.json_data));

			var json_link = document.getElementById('hidden-json-download');
			json_link.href = vm.render_file(JSON.stringify(vm.chord.json_data),'text/json');
			json_link.setAttribute('download',vm.chord.json_filename + '.json');
			json_link.click();


			var chord_text = 
				'<!DOCTYPE html>\n' +
				'<html>\n' + 
				'<head>\n' +  
				'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css" type="text/css" >\n' +
				'<link rel="stylesheet" href="https://cdn.jsdelivr.net/flexboxgrid/6.3.0/flexboxgrid.min.css" type="text/css" >\n' +
				'<meta charset="utf-8">\n' +
				'<meta name="viewport" content="width=device-width">\n' +
				'<title>QSearch Chord Chart</title>\n' +
				'<link rel="stylesheet" type="text/css" href="../assets/css/chord_chart.css">\n' +
				'</head>\n' +
				'<body>\n' +
				'<div class="row">\n' +
				'<div class="col-xs-12 center-xs">\n' +
				'<h2 id="title">各大媒體按讚群眾重疊度</h2>\n' +
				'<div id="legend">\n' +
				'<span class="legend middle-xs">電視</span>\n' +
				'<span class="legend middle-xs">日報</span>\n' +
				'<span class="legend middle-xs">雜誌</span>\n' +
				'</div>\n' +
				'</div>\n' +
				'</div>\n' +
				'<div class="row middle-sm" id="chord">\n' +						
				'<div class="chart col-xs-12 col-sm-9 last-sm"></div>\n' +
				'<div class="table col-xs-12 col-sm-3 center-xs start-sm">\n' + 
				'<h3></h3>\n' +
				'<div class="table-container row bottom-xs"></div>\n' +
				'</div>\n' +
				'</div>\n' +
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>\n' +
				'<script src="https://code.jquery.com/jquery-2.1.4.js"></script>\n' +
				'<script src="../assets/js/chord_chart.js"></script>\n' +
				'<script type="text/javascript">\n' +
				'$(function() {\n' +
				'$("#title").prepend("' + vm.title.toString() + '");\n' +
				'$.get("https://qsearchtech.github.io/archives/chord_data/' + vm.chord.json_filename + '.json", function(data) {\n' +
				'console.log(data);\n' +
				'if (data.length) {\n' +
				'data = data.map(function(d) {\n'	+
				'var id = d.id.toString();\n' +
				'delete d.id;\n' +
				'var named = {name: getNameById[id]};\n' +
				'Object.keys(d).forEach(function(key) {named[getNameById[key]] = d[key];});\n' +
				'return named;});\n' +
				'drawChord(data);}});\n' +
				'$(".legend").each(function() {\n' +
				'var legend = $(' + '\'<span class="' + 'legend-color' + '"></span>\');\n' +
				'legend.css({background: getColorByType($(this).text())});\n' + 
				'$(this).prepend(legend);});});\n' +
				'</script></body></html>';

			var chord_link = document.getElementById('hidden-chord-download');
			chord_link.href = vm.render_file(chord_text,'text/plain');
			chord_link.setAttribute('download',vm.chord.chord_filename + '.html');
			chord_link.click();

		},
		add_dataset: function (){
			var new_data = {
				label: '',
				color: 'light_green',
				data: '',
				type: vm.chart_type,
				axis: 1,
			}

			if(vm.chart_type === "line") {
				new_data.fill = false;
			}

			vm.chart.y_dataset.unshift(new_data);
		},
		add_dataset_bulk: function () {
			var y_raws = vm.chart.bulk_raw_data.split(/\n/gm);
			for (var raw of y_raws) {
				var fulldata = raw.split(' ');
				var label = fulldata[0];
				var dataset = fulldata.slice(1);
				var new_data = {
					label: fulldata[0],
					color: 'light_green',
					data: dataset.join("\n"),
					type: vm.chart_type,
					axis: 1
				}
				vm.chart.y_dataset.push(new_data);
			}
		},
		add_rankingdata: function() {
			var new_rk_data = {
				content: '',
				angry_cnt: 0,
				angry_score: 0,
				like_cnt: 0,
				link: '',
				image: ''
			}

			// content | angry_cnt | angry_score | like_cnt | link | image
			vm.ranking.data.push(new_rk_data);
		},
		add_table_row: function(){
			var row_data = {};
			row_data.array = [];
			row_data.raw = '';
			vm.table.body_data.unshift(row_data);
		},
		detect_color: function (color) {
			switch(color) {
				case 'light_green':
					return {
						background: 'rgba(101, 206, 199, 1)',
						border: 'rgba(101, 206, 199, 1)',
					};

				case 'green':
					return {
						background: 'rgba(60, 183, 198, 1)',
						border: 'rgba(60, 183, 198, 1)'
					};

				case 'light_blue':
					return {
						background: 'rgba(59, 171, 217, 1)',
						border: 'rgba(59, 171, 217, 1)'
					};

				case 'blue':
					return {
						background: 'rgba(60, 126, 187, 1)',
						border: 'rgba(60, 126, 187, 1)'
					};

				case 'dark_blue':
					return {
						background: 'rgba(60, 94, 132, 1)',
						border: 'rgba(60, 94, 132, 1)'
					};
			}
		},
		selectedBgColor: function (color) {
			return vm.detect_color(color);
		},
		seperate_new_line: function (text, seperator) {
			if(!seperator) seperator = '\n'
			var re = new RegExp(seperator, 'gm')
			return text.split(re);
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
			// seperate x data with seperator.x
			vm.canvas_content.data = {
				labels: vm.seperate_new_line(vm.chart.x_data, vm.chart.seperator.x),
			};

			vm.canvas_content.data.datasets = vm.chart.y_dataset.map(function(element){
				console.log(element);
				var new_element = {};
				var color = vm.detect_color(element.color);

				new_element.label = element.label;
				new_element.backgroundColor = color.background;
				new_element.borderColor = color.border;
				new_element.type = element.type;

				// recognize mixed chart, change chart_type to bar chart to make it work properly
				if(element.type !== vm.chart_type) {
					vm.canvas_content.type = 'bar'
				}

				// seperate y datasets with seperator.y
				new_element.data = vm.parse_number(vm.seperate_new_line(element.data, vm.chart.seperator.y));

				// if chart type is line
				if(new_element.type === 'line' ) {
					new_element.fill = element.fill;
				}

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
							beginAtZero:vm.chart.y_label_1_begin_at_zero,
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
							beginAtZero:vm.chart.y_label_1_begin_at_zero,
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
							beginAtZero:vm.chart.y_label_2_begin_at_zero,
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
							beginAtZero:vm.chart.y_label_2_begin_at_zero,
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
							beginAtZero:vm.chart.y_label_1_begin_at_zero,
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
							beginAtZero:vm.chart.y_label_1_begin_at_zero,
							fontSize: 10,
						}
					});
				}
			}

			// options of line charts

			if(vm.chart_type === 'line') {

				vm.canvas_content.options.elements = {
          line: {
            tension: vm.chart.beizer,
          },
        }

        vm.canvas_content.options.showLines = vm.chart.show_lines
			
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
				'<!DOCTYPE html>\n' + 
				'<html>\n' +
				'<head>\n' + 
				'<title></title>\n' +
				'<style type="text/css">#myChart {width: 100%;}</style>\n' +
				'</head>\n' +
				'<body>\n' +
				'<canvas id="myChart" width="800" height="450"></canvas>\n' +
				'<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script>\n' +
				'<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>\n' +
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>\n' +
				'<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>\n' +
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>\n' +
				'<script type="text/javascript">\n' +
				'var width=window.innerWidth;\n' +
				'function isMobile(){var check=false;(function(a){if(/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(a.substr(0,4))){check=true;}})(navigator.userAgent||navigator.vendor||window.opera);return check;}\n' +
				'if(isMobile()){\n' +
				'document.getElementById(\"myChart\").setAttribute(\"width\",300);document.getElementById(\"myChart\").setAttribute(\"height\",250);console.log(width);}\n' +
				'var ctx=document.getElementById(\"myChart\").getContext(\"2d\");\n' +
				'var chart=new Chart(ctx,' + vm.chart_data + ');</script>\n' +
				'<script src="https://qsearchtech.github.io/assets/js/local_message.js"></script>\n' +
				'</body></html>';

			var link = document.getElementById('download-chart');
			link.href = vm.render_file(chart_text,'text/plain');
			// window.open(link, "_blank");
		},
		preview_table_v2: function() {
			if(!vm.table_v2.raw_data) return

			vm.table_preview = true;

			var table_rows = vm.table_v2.raw_data.split(/\n/gm);
			var table_header = table_rows[0].split(/,/gm);
			var table_body_text = table_rows.slice(1);
			var table_body = [];

			for(var [index, row] of table_body_text.entries()) {
				table_body.push(row.split(/,/gm));

				if(vm.table_v2.left_number) {
					table_body[index].unshift(index+1)
				}
			}	

			if(vm.table_v2.left_number) {
				table_header.unshift("#")
			}

			vm.table_v2.header_data = table_header;
			vm.table_v2.body_data = table_body;

			vm.table_download_preparation('table-v2-content');
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

			vm.table_download_preparation('table-content');
		},
		table_download_preparation: function(dom_id) {
			if(!dom_id) return

			setTimeout(
				function(){
				var table_content = document.getElementById(dom_id).innerHTML;
				var table_text = 
					'<!DOCTYPE html>\n' +
					'<html lang="en">\n' + 
					'<head>\n' + 
					'<meta charset="utf-8">\n' + 
					'<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n' + 
					'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">\n' +
					'<style>h5{padding-top:15px}table{color:#333;margin-top:20px;font-size:.8rem}table thead th.bg-purple{background-color:#E2DEEF;border:none}@media (max-width:576px){h5{font-size:1rem}table{font-size:.5rem}.table td,.table th{padding:.5rem}}</style>\n' +
					'</head>\n' +
					'<body>\n' +
					'<div class="container">\n' + 
					'<div class="row">\n' +
					'<div class="col-lg-12 col-md-12 col-sm-12" id="main-content">\n' +
					'<h5 class="text-center p-t-20">' + vm.title + '</h5>' + table_content + '</div></div></div>\n' + 
					'<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>\n' + 
					'<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>\n' +
					'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>\n' +
					'<script src="https://qsearchtech.github.io/assets/js/local_message.js"></script></body></html>';

				var link = document.getElementById('download-table');
				link.href = vm.render_file(table_text,'text/plain');
				$('body').pgNotification(
    			{
    				message: '可以下載囉！',
    				type: 'success'
    			}
    		).show();
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
    ranking_download_preparation: function(dom_id) {
    	if(!dom_id) return

			setTimeout(
				function(){
				var ranking_content = document.getElementById(dom_id).innerHTML;
				var ranking_text = 
					'<!DOCTYPE html>\n' +
					'<html lang="en">\n' + 
					'<head>\n' + 
					'<meta charset="utf-8">\n' + 
					'<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n' + 
					'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">\n' +
					'<link rel="stylesheet" type="text/css" href="https://qsearchtech.github.io/assets/css/ranking.css">'+
					// '<style>.ranking-idx .index,.ranking-title{text-align:center;background-color:#bb9fe3;color:#000}.ranking-title{padding:10px 20px;width:100%}.ranking-items{min-height:130px;border-bottom:1px solid #eee;padding-top:15px;padding-bottom:10px;display:-webkit-flex;display:flex;flex-direction:row}.ranking-content{flex:1;display:-webkit-flex;display:flex;flex-direction:column}.ranking-content .ranking-content-inner{flex:1;color:#000;padding:10px;font-weight:700;font-size:16px}.ranking-content .subitems{flex:0;height:30px;padding-left:10px}.ranking-content .subitems span{font-size:16px;padding-right:5px}.ranking-idx{height:100%;flex:none;width:80px;display:-webkit-flex;display:flex;-webkit-align-items:top;align-items:top;-webkit-justify-content:center;justify-content:center}.ranking-idx .index{margin:15px;font:20px;font-weight:700;line-height:30px;height:30px;width:30px;vertical-align:middle;border-radius:15px}.subitems{color:#59b4c0}.ranking-title .main{font-weight:700;font-size:25px;margin:0 15px}.ranking-title .date{font-weight:300;font-size:16px;margin:0 15px}.ranking-container{padding:5px;width:100%}.ranking-img{flex:none;width:200px;border-radius:5px;overflow:hidden}.ranking-img img{width:100%}@media screen and (max-width:576px){.ranking-content .subitems{flex:0;height:30px;padding-left:10px}.ranking-content .subitems span{font-size:12px;padding-right:5px}}</style>'+
					// '<style>h5{padding-top:15px}table{color:#333;margin-top:20px;font-size:.8rem}table thead th.bg-purple{background-color:#E2DEEF;border:none}@media (max-width:576px){h5{font-size:1rem}table{font-size:.5rem}.table td,.table th{padding:.5rem}}</style>\n' +
					'</head>\n' +
					'<body>\n' +
					'<div class="container">\n' + 
					'<div class="row">\n' +
					'<div class="col-lg-12 col-md-12 col-sm-12" id="main-content">\n' +
					ranking_content + '</div></div></div>\n' + 
					'<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>\n' + 
					'<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>\n' +
					'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>\n' +
					'<script src="https://qsearchtech.github.io/assets/js/ranking.js"></script>'+
					'<script src="https://qsearchtech.github.io/assets/js/local_message.js"></script></body></html>';

				var link = document.getElementById('download-ranking');
				link.href = vm.render_file(ranking_text,'text/plain');
				$('body').pgNotification(
    			{
    				message: '可以下載囉！',
    				type: 'success'
    			}
    		).show();
			}, 500);
    },
    startTimeSet: function() {
    	if(moment(vm.ranking.start_time, 'll').diff(moment(vm.ranking.end_time,'ll')) > 0) {
    		vm.ranking.end_time = moment(vm.ranking.start_time,'ll').add('1', 'day').format('ll')
    	}
    },
    endTimeSet: function() {
    	if(moment(vm.ranking.start_time, 'll').diff(moment(vm.ranking.end_time,'ll')) > 0) {
  			vm.ranking.end_time = moment(vm.ranking.start_time,'ll').add('1', 'day').format('ll')
  			$('body').pgNotification(
    			{
    				message: '日期範圍錯誤',
    				type: 'danger'
    			}
  			).show();
    	}
    }
	},
});