var devYear = 2019;
var latestVersion = "0.3.1";
var developerFullName = "Andrés Segovia";

function getLanguage() {
	lang_region = navigator.language;
	return lang = lang_region.substring(0, 2);
}

function generateTextCopyright() {
	var currentYear = new Date();
	var strTime = "";
	if (devYear === currentYear.getFullYear()) {
		strTimeLapse = devYear.toString();
	} else {
		strTimeLapse = devYear.toString() + "-" + currentYear.getFullYear().toString();
	}

	$("#owner").html("Copyright &copy; " + strTimeLapse + "<br>" + developerFullName);
}

function loadSpecDownload() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../resources/data.json", true);
	xhr.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			var data = JSON.parse(this.responseText);
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
		}
	};
	xhr.send();
}

function collapsibleButton() {
	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
		});
	}
}

function configureEffects() {
	showSlidesAutomatically();
	collapsibleButton();
}

function init() {
	configureEffects();
	generateTextCopyright();
	// generateButtonDownload();
	loadSpecDownload();
}

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}


/*
curl -s https://api.github.com/repos/andy-thor/StickMan/releases/latest \
| grep "stickman*exe" \
| cut -d : -f 2,3 \
| tr -d \" \
| echo -
# | wget -qi -
*/
