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
function startAjax() {
	var objXMLHttpRequest = new XMLHttpRequest();
	objXMLHttpRequest.onreadystatechange = function() {
		if(objXMLHttpRequest.readyState === 4) {
			if(objXMLHttpRequest.status === 200) {
				var data = JSON.parse(this.responseText);
				var repo = data["project-name"],
					developer = data["developer"],
					version = data["version"],
					lang = getLanguage(),
					idLang = 0,
					currentOS = getOS();

				var filename = null;
				var filesize = null;
				var urlDownload = null;

				if (lang == "es") idLang = 1;
				if (currentOS == "Windows") {
					filename = data["latest-release"]["exe"]["filename"].format(repo.toLowerCase(), version);
					filesize = data["latest-release"]["exe"]["filesize"];
					urlDownload = data["latest-release"]["exe"]["url"].format(developer, repo, version, filename);
				} else {
					filename = data["latest-release"]["zipball"]["filename"].format(repo, version);
					filesize = data["latest-release"]["zipball"]["filesize"];
					urlDownload = data["latest-release"]["zipball"]["url"].format(developer, repo, version);
				}

				$("a.button-download").attr("href", urlDownload);
				$("a.button-download").html(data["text"]["labels-spec"]["download"].format(repo, version));
				$(".body-spec p#file-name").html("<span class='bold-text'>"+ data["text"]["labels-spec"]["filename"][idLang] + ":</span> " + filename);
				$(".body-spec p#file-size").html("<span class='bold-text size-bytes'>" + data["text"]["labels-spec"]["filesize"][idLang] + ":</span> " + filesize);
				$(".body-spec p#platform").html("<span class='bold-text'>" + data["text"]["labels-spec"]["platform"][idLang] + ":</span> " + currentOS);
				alert(data);
			} else {
				// alert('Error Code: ' + objXMLHttpRequest.status);
			}
		}
	}

	objXMLHttpRequest.open('GET', '../resources/data.json');
	objXMLHttpRequest.send();










	var objDownSpec = new Object();

	if (currentOS === "Windows") {
		objDownSpec.fileName = "stickman-0.3.1.exe";
		objDownSpec.fileSize = "1.9 MB";
		objDownSpec.urlDownload = "https://github.com/Andy-thor/StickMan/releases/download/v0.3.1/stickman-0.3.1.exe";
	} else {
		objDownSpec.fileName = "StickMan-master.zip";
		objDownSpec.fileSize = "483 kB";
		objDownSpec.urlDownload = "https://codeload.github.com/Andy-thor/StickMan/zip/master";
	}
	var objDownLabel = new Object();
	if (lang == "es") {
		objDownLabel.name = "Nombre de archivo";
		objDownLabel.size = "Tamaño de archivo";
		objDownLabel.textDownload = "Descargar StickMan V" + latestVersion;
		objDownLabel.platform = "Plataforma soportada";
	} else {
		objDownLabel.name = "Filename";
		objDownLabel.size = "File size";
		objDownLabel.platform = "Supported platform";
		objDownLabel.textDownload = "Download StickMan V" + latestVersion;
	}

	$("a.button-download").attr("href", objDownSpec.urlDownload);
	$("a.button-download").html(objDownLabel.textDownload);
	$(".body-spec p#file-name").html("<span class='bold-text'>"+ objDownLabel.name + ":</span> " + objDownSpec.fileName);
	$(".body-spec p#file-size").html("<span class='bold-text size-bytes'>" + objDownLabel.size + ":</span> " + objDownSpec.fileSize);
	$(".body-spec p#platform").html("<span class='bold-text'>" + objDownLabel.platform + ":</span> " + currentOS);
}
