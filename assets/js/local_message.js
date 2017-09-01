function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var data = {};

if (document.getElementsByTagName('canvas').length > 0) {
	// chart
	data = {
		id: getParameterByName('id'),
		height: $("#myChart").height(),
	};
} else {
	// table
	data = {
		id: getParameterByName('id'),
		height: $("#main-content").height(),
	};
}
console.log(data);
parent.postMessage(data,'*');