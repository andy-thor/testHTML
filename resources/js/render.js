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
	var z, i, e, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if (elmnt.id === "head") {
						//$('head').html(this.responseText);
						var head = document.getElementsByTagName("head");
						head.outerHTML = this.responseText;
						elmnt.outerHTML = "";
					} else {
						elmnt.outerHTML = this.responseText;
					}
				} else if (this.status == 404) {elmnt.outerHTML = "Page not found.";}
				/*remove the attribute, and call this function once more:*/
				elmnt.removeAttribute("w3-include-html");
				includeHTML();
			}
			xhttp.open("GET", file, true);
			xhttp.send();
		/*exit the function:*/
		return;
		}
	}
};

/*
var str = '<a href="http://www.com">item to replace</a>'; //it can be anything
var Obj = document.getElementById('TargetObject'); //any element to be fully replaced
if(Obj.outerHTML) { //if outerHTML is supported
    Obj.outerHTML=str; ///it's simple replacement of whole element with contents of str var
}
else { //if outerHTML is not supported, there is a weird but crossbrowsered trick
    var tmpObj=document.createElement("div");
    tmpObj.innerHTML='<!--THIS DATA SHOULD BE REPLACED-->';
    ObjParent=Obj.parentNode; //Okey, element should be parented
    ObjParent.replaceChild(tmpObj,Obj); //here we placing our temporary data instead of our target, so we can find it then and replace it into whatever we want to replace to
    ObjParent.innerHTML=ObjParent.innerHTML.replace('<div><!--THIS DATA SHOULD BE REPLACED--></div>',str);
}
*/
