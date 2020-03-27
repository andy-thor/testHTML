function funcionRender() {
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
			if (xmlhttp.readyState == 4) {
				status = xmlhttp.status;
			}
			if (localTest.test(location.href) && xmlhttp.responseText) {
				status = 200;
			}
			if (xmlhttp.readyState == 4 && status == 200) {
				el.outerHTML = xmlhttp.responseText;
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

function includeHTML() {
  var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		alert("ID DEL DIV: " + elmnt.getAttribute("#id"));
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {elmnt.innerHTML = this.responseText;}
				if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
				/*remove the attribute, and call this function once more:*/
				elmnt.removeAttribute("w3-include-html");
				includeHTML();
			}
		}
		xhttp.open("GET", file, true);
		xhttp.send();
		/*exit the function:*/
		return;
		}
	}
};
