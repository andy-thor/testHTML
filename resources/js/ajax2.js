//alert("DENTRO DE FILE AJAX2.JS");
document.querySelector('#AASSSD').addEventListener('load', modDownloadSection);

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
