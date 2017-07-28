var iframe_array = document.getElementsByTagName('iframe');

for (var x = 0; x < iframe_array.length; x++){ 
	var iframe_id = 'iframe_'+ x; 
	var url = iframe_array[x].getAttribute("data-src") + '?id=' + iframe_id; iframe_array[x].setAttribute('id',iframe_id); iframe_array[x].setAttribute('src',url);
} 

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"; 
var eventer = window[eventMethod]; 
var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"; 

eventer(messageEvent, function (e) { 
	if (e.origin !== 'https://qsearchtech.github.io') 
		return; 
	document.getElementById(e.data.id).style.height = (e.data.height + 20) + "px";
});