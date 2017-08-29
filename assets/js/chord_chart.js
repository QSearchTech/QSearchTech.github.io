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
      return '#2b8b85';
    case '日報':
      return '#65cec7';
    case '雜誌':
      return '#c9c9cd';
    default:
      return '#000';
  }
};

function isMobile() {
  var check = false;
  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) { check = true; }
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
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

// var month;

// var loadWithId = function(data) {
//   $.get('//relab.cc/qsearch-sheets/public/' + month + '/unique', function(uni) {
//     data = data.map(function(d) {
//       var id = d.id;
//       delete d.id;
//       var named = {
//         name: getNameById[id],
//         '獨家粉絲': uni[id]
//       };
//       Object.keys(d).forEach(function(key) {
//         named[getNameById[key]] = d[key];
//       });
//       return named;
//     });
//     drawChord(data);
//   });
// };



// var postToDb = function(target) {
//   $.post('./db/index.php/clicks', { target: month + '-' + target });
// };

var indexByName = d3.map(),
    nameByIndex = d3.map();

var outerRadius = 960 / 2,
    innerRadius = outerRadius - outerRadius / 4;
var pageSize = {};
var uniqueFans = {};

function generateMatrix(data) {
  var n = 0,
      matrix = [];
  var sumObj = function(obj) {
    var sum = 0;
    for (index in obj) {
      if (index !== 'name' && index !== '獨家粉絲') {
        sum += parseInt(obj[index]);
      }
    }

    return sum;
  };
  // Compute a unique index for each package name.
  var sorted = [];
  for (var arr = ['雜誌', '日報', '電視'], i = arr.length - 1; i >= 0; i--) {
    sorted = sorted.concat(data
      .filter(function(d) {
        return getTypeByName(d.name) === arr[i];
      })
      .map(function(d) {
        for (index in d) {
          if (index === d.name) {
            pageSize[d.name] = parseInt(d[index]);
            d[index] = 0;
          }
          if (index === '獨家粉絲') {
            uniqueFans[d.name] = parseInt(d[index]);
          }
        }
        return d;
      })
      .sort(function(a, b) { return d3.descending(sumObj(a), sumObj(b)); })
    );
  }
  sorted
    .forEach(function(d) {
      if (!indexByName.has(d = d.name)) {
        nameByIndex.set(n, d);
        indexByName.set(d, n++);
      }
    });
  sorted.forEach(function(d) {
    var source = indexByName.get(d.name),
        row = matrix[source];
    if (!row && typeof(source) !== 'undefined') {
      row = matrix[source] = [];
      for (var i = -1; ++i < n;) row[i] = 0;
    }

    Object.keys(d).forEach(function(key) {
      if (typeof(indexByName.get(key)) !== 'undefined') {
        row[indexByName.get(key)] = parseInt(d[key]);
      }
    });
  });
  return matrix;
}

function drawChord(data) {
  var matrix = generateMatrix(data);
  console.log(matrix);

  var fill = function(index) {
    return getColorByType(getTypeByName(nameByIndex.get(index)));
  };

  var chord = d3.layout.chord()
      .padding(0.05)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

  var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + 10);

  var boxsize = '0 0 ' + outerRadius * 2 + ' ' + outerRadius * 2;

  var svg = d3.select(".chart").append("svg")
      .attr('viewPort', boxsize)
      .attr('viewBox', boxsize)
      .attr('preserveAspectRatio', 'xMinYMin meet')
    .append("g")
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

  chord.matrix(matrix);
  var current = -1;

  var g = svg.selectAll(".group")
      .data(chord.groups)
    .enter().append("g")
      .attr("class", "group");

  g.append("path")
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", arc)
      .style("cursor", "pointer")
      .on("click", function(g, i) {
        toggleState(g, i);
        // postToDb(nameByIndex.get(i));
      });

  var percentage = d3.format(".2%");

  svg.selectAll(".chord")
      .data(chord.chords)
    .enter().append("path")
      .attr("class", "chord")
      .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(0.38); })
      .style("fill", function(d) { return fill(d.source.index); })
      .attr("d", d3.svg.chord().radius(innerRadius));

  g.append("text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("class", "label")
      .attr("dy", "0.35em")
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (innerRadius + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .style("font-size", isMobile() ? '1.4em' : '1.2em')
      .style("fill", '#666')
      .text(function(d) {
        return nameByIndex.get(d.index);
      })
      .style("cursor", "pointer")
      .on("click", function(g, i) {
        toggleState(g, i);
        // postToDb(nameByIndex.get(i));
      })
      .each(function(a, b) {
        if (b === 0) {
          toggleState(a, b);
        }
      });

  d3.select(self.frameElement).style("height", outerRadius * 2 + "px");

  // Returns an event handler for fading a given chord group.
  function toggleState(g, i) {
    if (current === i) {
      current = -1;
      svg.selectAll(".chord")
      .transition()
        .style("opacity", 1);
      $('.table h3').empty();
      $('.td').empty();
      svg.selectAll("text")
        .transition()
        .style("opacity", 1);
      $('.table-container .row .td').css({
        'border-bottom': 'none'
      });
    } else {
      current = i;
      svg.selectAll(".chord")
          .filter(function(d) { return d.source.index != i && d.target.index != i; })
        .transition()
          .style("opacity", 0.1);

      svg.selectAll("text")
        .filter(function(d) {
          return d.index !== i;
        })
        .transition()
        .style("opacity", 0.5);
      svg.selectAll("text")
        .filter(function(d) {
          return d.index === i;
        })
        .transition()
        .style("opacity", 1);

      $('.table h3').text(nameByIndex.get(i) + ' 重疊度').css('border-color', getColorByType(getTypeByName(nameByIndex.get(i))));

      var table = [];
      var row = $([
        '<div class="tr col-xs-3 col-sm-12">',
          '<div class="row">',
            '<div class="td col-xs-12 col-sm"></div>',
            '<div class="td col-xs-12 col-sm"></div>',
          '</div>',
        '</div>'
      ].join(''));
      var circle = $('<span class="circle"/>').css({
        width: '1em',
        height: '1em',
        'margin-left': '-0.25em',
        display: 'inline-block',
      });

      // var name = $('<span/>').text('獨家粉絲').css({
      //   'font-weight': 'bold'
      // });
      // row.find('.td').eq(0).html([circle, name]);
      // row.find('.td').eq(1)
      //   .text(percentage(uniqueFans[nameByIndex.get(g.index)] / pageSize[nameByIndex.get(g.index)]))
      //   .css({
      //     'border-bottom': '0px solid grey',
      //   });
      // table.push(row);

      svg.selectAll(".chord")
        .filter(function(d) {
          return d.source.index == i || d.target.index == i;
        })
        .each(function(d) {
          var sourceId = hoverSource(d, i).index;
          var percent = matrix[g.index][sourceId] / pageSize[nameByIndex.get(g.index)];
          var row = $([
            '<div class="tr col-xs-3 col-sm-12">',
              '<div class="row">',
                '<div class="td col-xs-12 col-sm"></div>',
                '<div class="td col-xs-12 col-sm"></div>',
              '</div>',
            '</div>'
          ].join('')).attr('data-value', matrix[g.index][sourceId]);

          var circle = $('<span class="circle"/>').css({
            'border-radius': '50%',
            width: '0.5em',
            height: '0.5em',
            'margin-right': '0.5em',
            background: getColorByType(getTypeByName(nameByIndex.get(sourceId))),
            display: 'inline-block',
          });

          var name = $('<span/>').text(nameByIndex.get(sourceId));

          row.find('.td').eq(0).html([circle, name]);
          row.find('.td').eq(1).text(percentage(percent)).css({
            'border-bottom': '0px solid grey',
          });
          table.push(row);
        })
      .transition()
        .style("stroke", function(d) { return d3.rgb(fill(hoverSource(d, i).index)).darker(0.38); })
        .style("fill", function(d) { return fill(hoverSource(d, i).index); })
        .style("opacity", 1);

      $('.table-container').empty().append(table.sort(function(a, b) {
        return d3.descending($(a).data('value'), $(b).data('value'));
      }));
    }
  }
}

function hoverTarget(d, i) {
  if (d.target.index > i) {
    return d.source;
  } else {
    return d.target;
  }
}

function hoverSource(d, i) {
  if (d.target.index > i) {
    return d.target;
  } else {
    return d.source;
  }
}
