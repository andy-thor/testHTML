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
document.addEventListener('DOMContentLoaded', startAjax());

function startAjax() {
	var objXMLHttpRequest = new XMLHttpRequest();
	objXMLHttpRequest.onreadystatechange = function() {

		if(objXMLHttpRequest.readyState === 4) {
			alert("objXMLHttpRequest.readyState ===  4");
			if(objXMLHttpRequest.status === 200) {
				alert("and objXMLHttpRequest.status === 200");
				var data = JSON.parse(this.responseText);
				var repo = data["project-name"],
					developer = data["developer"],
					version = data["version"],
					lang = getLanguage(),
					idLang = 0,
					currentOS = getOS();

				var filename = "";
				var filesize = "";
				var urlDownload = "";
				alert("BEFORE LANG-OS -> " + currentOS);
				alert(JSON.stringify(data));
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
					alert("FILENAME: " + filename);
					filesize = data["latest-release"]["zipball"]["filesize"];
					urlDownload = data["latest-release"]["zipball"]["url"]
								  .replace("{developer}", developer)
								  .replace("{project-name}", repo)
								  .replace("{version}", version);
				}
				alert("BEFORE JQUERY");
				let textDownload = data["text"]["labels-spec"]["download"]
								   .replace("{project-name}", repo)
								   .replace("{version}", version);
				let test1 = data["text"]["labels-spec"]["filename"][idLang];
				let test2 = data["text"]["labels-spec"]["filesize"][idLang];

				alert(textDownload + "\n" +
					  urlDownload + "\n" +
					  data2 + "\n" +
					  test1 + "\n" +
					 );
				$("a.button-download").attr("href", urlDownload);
				$("a.button-download").html(textDownload);
				$(".body-spec p#file-name").html("<span class='bold-text'>" + data["text"]["labels-spec"]["filename"][idLang] + ":</span> " + filename);
				$(".body-spec p#file-size").html("<span class='bold-text size-bytes'>" + data["text"]["labels-spec"]["filesize"][idLang] + ":</span> " + filesize);
				$(".body-spec p#platform").html("<span class='bold-text'>" + data["text"]["labels-spec"]["platform"][idLang] + ":</span> " + currentOS);
				alert(data);
			} else {
				alert('Error Code: ' + objXMLHttpRequest.status);
			}
		}
	}

	objXMLHttpRequest.open('GET', '../resources/data.json');
	objXMLHttpRequest.send();
}
