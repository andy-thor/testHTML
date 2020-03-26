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

function loadJSON(path) {
	var objXMLHttpRequest = new XMLHttpRequest();
	objXMLHttpRequest.onreadystatechange = function() {
		if(objXMLHttpRequest.readyState === 4) {
			if(objXMLHttpRequest.status === 200) {
				return JSON.parse(this.responseText);
			} else {
				console.log('Error Code: ' + objXMLHttpRequest.status);
				return null;
			}
		}
	}
	objXMLHttpRequest.open('GET', path);
	objXMLHttpRequest.send();
}

function loadSpecDownload() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../data.json");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				alert("SUCCESS");
				console.log(JSON.parse(this.responseText));
			} else {
				console.log('Error Code: ' + xhr.status);
				return null;
			}
		}
		var data = JSON.parse(this.responseText);
		alert("DATA: "+ JSON.stringify(data));
		if (data) {
			var repo = data["project-name"],
				developer = data["developer"],
				version = data["version"],
				lang = getLanguage(),
				idLang = 0,
				currentOS = getOS();

			var filename = "";
			var filesize = "";
			var urlDownload = "";
			console.log(data);
			if (lang === "es") {
				idLang = 1;
			}
			var project_name = data["project-name"];
			if (currentOS == "Windows") {
				var project_name_lower = repo.toLowerCase();
				filename = data["latest-release"]["exe"]["filename"]
						   .replace("{project-name}", repo.toLowerCase())
						   .replace("{version}", version);
				filesize = data["latest-release"]["exe"]["filesize"];
				urlDownload = data["latest-release"]["exe"]["url"]
							  .replace("{developer}", developer)
							  .replace("{project-name}", repo)
							  .replace("{version}", version)
							  .replace("{filename}", filename);
			} else {
				filename = data["latest-release"]["zipball"]["filename"]
						   .replace("{project-name}", repo)
						   .replace("{version}", version);
				filesize = data["latest-release"]["zipball"]["filesize"];
				urlDownload = data["latest-release"]["zipball"]["url"]
							  .replace("{developer}", developer)
							  .replace("{project-name}", repo)
							  .replace("{version}", version);
			}
			
			var textDownload = data["text"]["labels-spec"]["download"][idLang]
							   .replace("{project-name}", repo)
							   .replace("{version}", version);
			$("a.button-download").attr("href", urlDownload);
			$("a.button-download").html(textDownload);
			$(".body-spec p#file-name").html("<span class='bold-text'>" + data["text"]["labels-spec"]["filename"][idLang] + ":</span> " + filename);
			$(".body-spec p#file-size").html("<span class='bold-text size-bytes'>" + data["text"]["labels-spec"]["filesize"][idLang] + ":</span> " + filesize);
			$(".body-spec p#platform").html("<span class='bold-text'>" + data["text"]["labels-spec"]["platform"][idLang] + ":</span> " + currentOS);
		} else {
			console.log("Error loading file");
		}
	};
	xhr.send();
}
