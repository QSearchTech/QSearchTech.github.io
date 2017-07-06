var chart, month;

var getNameById = {
  '242305665805605': 'ETtoday',
  '109249609124014': 'Yahoo新聞',
  '220050085932': 'TVBS',
  '125693144152226': '壹週刊',
  '394896373929368': '自由時報',
  '188311137478': '中時電子報',
  '127628276929': '天下雜誌',
  '186593071836': '商業周刊',
  '241284961029': '聯合新聞網',
  '110699089014688': '三立新聞',
  '148395741852581': '中央社',
  '158025223269': '今周刊',
  '232633627068': '蘋果日報',
  '352962731493606': '蘋果即時',
  '124616330906800': '東森新聞',
  '286487218798': '遠見雜誌'
};

var getColorByType = function(type) {
  switch (type) {
    case '電視':
      return '#e84949';
    case '日報':
      return '#69bbeb';
    case '雜誌':
      return '#f6d143';
    default:
      return '#000';
  }
};

var getTypeByName = function(name) {
  switch (name) {
    case 'TVBS':
    case '三立新聞':
    case '東森新聞':
      return '電視';
    case '壹週刊':
    case '天下雜誌':
    case '今周刊':
    case '商業周刊':
    case '遠見雜誌':
      return '雜誌';
    case '中央社':
    case 'Yahoo新聞':
    case '聯合新聞網':
    case '自由時報':
    case '中時電子報':
    case '蘋果日報':
    case 'ETtoday':
    case '蘋果即時':
      return '日報';
    default:
      return false;
  }
};

function isMobile() {
  var check = false;
  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) { check = true; }
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

$(function() {
  if (window.location.hash) {
    var hashs = window.location.hash.substring(1).split('.');
    month = hashs[0];
    var type = hashs[1];
    $.get('//relab.cc/qsearch-sheets/public/' + month + '/key', function(data) {
      if (data.length) {
        var sorted = [];
        data = data.map(function(d) {
          var name = getNameById[d.Id];
          d.Name = name
          d.Type = getTypeByName(name);
          return d;
        });
        for (var arr = ['雜誌', '日報', '電視'], i = arr.length - 1; i >= 0; i--) {
          sorted = sorted.concat(data
            .filter(function(d) {
              return d.Type === arr[i];
            })
            // .sort(function(a, b) { return d3.descending(parseInt(a.Size), parseInt(b.Size)) })
          );
        }
        drawChart(sorted, type);
      }
    });
  }
});

function transformBarChartData(data) {
  var transformInteractionData = function(d) {
    return (d['Like'] + d['Comment']) / d['Post'];
  };

  var transformShareData = function(d) {
    return d['Share'] / d['Post'];
  };

  var transformMinMax = function(arr) {
    return arr.map(function(d) {
      return d / d3.max(arr) * 100;
    });
  };

  return {
    labels: data.map(function(d) { return d['Name']; }),
    datasets: [
      {
        label: '貼文數',
        data: data.map(function(d) { return d['Post']; }),
        type: 'line',
        yAxisID: 'post',
        fill: false,
        lineTension: 0,
        borderWidth: 2,
        pointRadius: 3,
        pointBorderWidth: 6,
        backgroundColor: 'rgba(232,73,73, 0.8)',
        borderColor: 'rgba(232,73,73, 0)',
        pointBackgroundColor: 'rgba(232,73,73, 0.8)',
        pointBorderColor: 'rgba(232,73,73, 0.2)',
        borderDash: [10, 10],
      },
      {
        label: '平均互動力',
        data: transformMinMax(data.map(transformInteractionData)),
        yAxisID: 'score',
        backgroundColor: 'rgba(32,62,145, 0.8)',
        borderColor: 'rgba(32,62,145, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(32,62,145, 0.6)',
        hoverBorderColor: 'rgba(32,62,145, 0.8)'
      },
      {
        label: '平均傳播力',
        data: transformMinMax(data.map(transformShareData)),
        yAxisID: 'score',
        backgroundColor: 'rgba(115,182,255, 0.8)',
        borderColor: 'rgba(115,182,255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(115,182,255, 0.6)',
        hoverBorderColor: 'rgba(115,182,255, 0.8)'
      }
    ]
  };
}

function transformSizeData(data) {
  return {
    labels: data.map(function(d) { return d['Name']; }),
    datasets: [
      {
        label: '按讚人數',
        backgroundColor: data.map(function(d) { return getColorByType(d['Type']); }),
        borderColor: data.map(function(d) { return d3.rgb(getColorByType(d['Type'])).darker().toString(); }),
        borderWidth: 0,
        data: data.map(function(d) { return d['Size']; }),
      }
    ]
  };
}

function transformStrongSizeData(data) {
  return {
    labels: data.map(function(d) { return d['Name']; }),
    datasets: [
      {
        label: '鐵粉率',
        backgroundColor: data.map(function(d) { return getColorByType(d['Type']); }),
        borderColor: data.map(function(d) { return d3.rgb(getColorByType(d['Type'])).darker().toString(); }),
        borderWidth: 0,
        data: data.map(function(d) { return d['Strong'] / d['Size']; }),
      }
    ]
  };
}

var myBarChart;

function drawChart(data, type) {
  var title, width = $(window).width();

  var year = month.substr(0,4);
  var m = parseInt(month.substr(-2,2));
  if (isMobile()) {
    $('#chart').attr('width', width).attr('height', width * 2 / 3);
  }
  if (type === 'key-metric') {
    $('#title').text(year + '年' + m + '月各大媒體表現關鍵指標');
    [
      { class: 'legend-color', label: '平均互動力', color: 'rgba(32,62,145, 0.8)' },
      { class: 'legend-color', label: '平均傳播力', color: 'rgba(115,182,255, 0.8)' },
      { class: 'legend-dot', label: '貼文數', color: 'rgba(232,73,73, 0.8)' }
    ].forEach(function(legend) {
      $('#legend').append(
        $('<span class="legend"></span>').text(legend.label).prepend(
          $('<span class="' + legend.class + '"></span>').css({
            background: legend.color,
            borderColor: legend.color,
          })
        )
      );
    });
    myBarChart = new Chart($('#chart'), {
      type: 'bar',
      data: transformBarChartData(data),
      options: {
        legend: {
          display: false
        },
        tooltips: {
          titleFontSize: isMobile() ? ( width < 360 ? 12 : 14) : 18,
          bodyFontSize: isMobile() ? ( width < 360 ? 10 : 12) : 16,
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label;
              var value = tooltipItem.yLabel > 100 ? d3.format(',d')(tooltipItem.yLabel) : d3.format(',.2f')(tooltipItem.yLabel);
              return label + ': ' + value;
            }
          },
          cornerRadius: 3,
          titleMarginBottom: 8,
          xPadding: 8,
          yPadding: 8,
        },
        scales: {
          xAxes: [{
            categoryPercentage: 0.6,
            gridLines: {
              display: false
            },
            ticks: {
              autoSkip: false,
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: !isMobile(),
              labelString: '指標分數',
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            },
            id: 'score',
            position: 'left',
            ticks: {
              max: 100,
              stepSize: isMobile() ? 20 : 10,
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            }
          }, {
            id: 'post',
            scaleLabel: {
              display: !isMobile(),
              labelString: '貼文數',
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            },
            ticks: {
              max: 15000,
              stepSize: isMobile() ? 3000 : 1500,
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            },
            position: 'right',
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
  }

  if (type === 'like-size') {
    $('#title').text(year + '年' + m + '月各大媒體市讚排行榜');
    ['電視', '日報', '雜誌'].forEach(function(l) {
      $('#legend').append(
        $('<span class="legend"></span>').text(l).prepend(
          $('<span class="legend-color"></span>').css({
            background: getColorByType(l)
          })
        )
      );
    });

    myBarChart = new Chart($('#chart'), {
      type: 'horizontalBar',
      data: transformSizeData(data),
      options: {
        legend: {
          display: false
        },
        tooltips: {
        	titleFontSize: isMobile() ? ( width < 360 ? 12 : 14) : 18,
          bodyFontSize: isMobile() ? ( width < 360 ? 10 : 12) : 16,
          callbacks: {
            title: function(tooltipItem) {
              return tooltipItem[0].yLabel;
            },
            label: function(tooltipItem, a, b) {
              var text = '按讚人數: ';
              var value = d3.format(',d')(tooltipItem.xLabel);
              return text + value;
            }
          },
          cornerRadius: 3,
          titleMarginBottom: 8,
          xPadding: 8,
          yPadding: 8,
        },
        scales: {
          yAxes: [{
            categoryPercentage: 0.6,
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            },
            scaleLabel: {
              display: true,
              labelString: '媒體名稱',
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
              callback: function(value) {
                return d3.format(',d')(value);
              }
            },
            scaleLabel: {
              display: true,
              labelString: '按讚人數',
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            }
          }]
        }
      }
    });
  }

  if (type === 'strong-size') {
    $('#title').text(year + '年' + m + '月各大媒體鐵粉率');
    ['電視', '日報', '雜誌'].forEach(function(l) {
      $('#legend').append(
        $('<span class="legend"></span>').text(l).prepend(
          $('<span class="legend-color"></span>').css({
            background: getColorByType(l)
          })
        )
      );
    });

    myBarChart = new Chart($('#chart'), {
      type: 'horizontalBar',
      data: transformStrongSizeData(data),
      options: {
        legend: {
          display: false
        },
        tooltips: {
          titleFontSize: isMobile() ? ( width < 360 ? 12 : 14) : 20,
          bodyFontSize: isMobile() ? ( width < 360 ? 10 : 12) : 16,
          callbacks: {
            title: function(tooltipItem) {
              return tooltipItem[0].yLabel;
            },
            label: function(tooltipItem, a, b) {
              var text = '鐵粉率: ';
              var value = d3.format('.2p')(tooltipItem.xLabel);
              return text + value;
            }
          },
          cornerRadius: 3,
          titleMarginBottom: 12,
          xPadding: 8,
          yPadding: 8,
        },
        scales: {
          yAxes: [{
            categoryPercentage: 0.6,
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            },
            scaleLabel: {
              display: true,
              labelString: '媒體名稱',
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12,
              callback: function(value) {
                return d3.format('.2p')(value);
              }
            },
            scaleLabel: {
              display: true,
              labelString: '鐵粉率',
              fontSize: isMobile() ? ( width < 360 ? 8 : 10) : 12
            }
          }]
        }
      }
    });
  }
}
