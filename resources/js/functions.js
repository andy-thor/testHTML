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

function generateButtonDownload() {
	var currentOS = getOS();
	var objDownSpec = new Object();
	var lang = getLanguage();

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
	generateButtonDownload();
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
