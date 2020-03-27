window.onload = function() {
	var elements = document.getElementsByTagName('*'),
		i;
	for (i in elements) {
		if (elements[i].hasAttribute && elements[i].hasAttribute('data-include')) {
			fragment(elements[i], elements[i].getAttribute('data-include'));
		}
	}
	function fragment(el, url) {
		var localTest = /^(?:file):/,
			xmlhttp = new XMLHttpRequest(),
			status = 0;

		xmlhttp.onreadystatechange = function() {
			/* if we are on a local protocol, and we have response text, we'll assume
 *  				things were sucessful */
 			if(this.readyState === 4 && this.status === 200) {
 				alert("TEXTOOOO:" + this.responseText);
 			}

			if (xmlhttp.readyState == 4) {
				status = xmlhttp.status;
				alert("STATUS: " + status);
			}
			alert("RESPONSE->: " + xmlhttp.responseText);
			if (localTest.test(location.href) && xmlhttp.responseText) {
				status = 200;
				alert("URL = " + url);
			}
			if (xmlhttp.readyState == 4 && status == 200) {
				el.outerHTML = xmlhttp.responseText;
				alert("ESCRITO: " + url);
			}
		}

		try {
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		} catch(err) {
			alert("ERROR EN URL: " + url);
			/* todo catch error */
		}
	}
}
