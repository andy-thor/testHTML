/*------errorh.js------*/
/** Functionality in this script is used to send JS errors back to the reported Server URL
    It Uses POST to send data.
    We are using plain JS here as the window on error needs to be before any error.
**/
var allError = {};

var jserr = function (url, limit) {
    var count = 1;
    limit = limit || 10; //internal limit to send max 10 errors
    window.onerror = function (errorMsg, script, lineNumber, column, errorObj) {
        var errData = {
            msg: errorMsg,
            script: script,
            ln: lineNumber,
            cl: column
        };

		if (alreadySeenError(errorMsg, script, lineNumber)) {
		  
		} else {
		  ((count <= limit) ? sendJsErr(url, errData) : false);
		  count++;
		}
        return true;
    };
    return true;
};

function alreadySeenError (errorMsg, script, lineNumber) {
  var errorKey = errorMsg + '--' + script + '--' + lineNumber;
  var exists = 0;
  for (var key in allError) {
	if (key == errorKey) {
	  exists = 1;
	  break;
	}
  }
  if (!exists) {
	allError[errorKey] = 1;
  }
  return exists;
}

var sendJsErr = function (url, data) {
    var xhr = ajaxObj();
    //encode data
    data = flattenObj(data);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    try {
        xhr.send(data);
    }
    catch(e) {
        return false;
    }
    return true;
};

var ajaxObj = function () {
   var xhr;
    if(typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();
    }
    else {
        var versions = ['MSXML2.XmlHttp.5.0', 'MSXML2.XmlHttp.4.0', 'MSXML2.XmlHttp.3.0', 'MSXML2.XmlHttp.2.0', 'Microsoft.XmlHttp']
        for(var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch(e){}
        }
    }
    return xhr;
};
 
var flattenObj = function (obj) {
    var encodedString = '';
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + obj[prop]);
        }
    }
    return encodedString;
};

/*------end------*/
