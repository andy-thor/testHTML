//alert("DENTRO DE FILE AJAX2.JS");

/*
alert("ALERT");
function modDownloadSection() {
	alert("ADENTROO");
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "../data.json", true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let data = JSON.parse(this.responseText);
			console.log("")
		}
	}
}
*/

var objXMLHttpRequest = new XMLHttpRequest();
objXMLHttpRequest.onreadystatechange = function() {
	if(objXMLHttpRequest.readyState === 4) {
		if(objXMLHttpRequest.status === 200) {
			  alert(objXMLHttpRequest.responseText);
		} else {
			  alert('Error Code: ' + objXMLHttpRequest.status);
			  alert('Error Message: ' + objXMLHttpRequest.statusText);
		}
	}
}
var el = document.querySelector('#AASSSD');
$("#AASSSD").val("CONTENT");
alert("El: " + el);

var el2 = document.getElementById("AASSSD");
alert("El2: " + el2);

objXMLHttpRequest.open('GET', '../resources/data.json');
objXMLHttpRequest.send();
