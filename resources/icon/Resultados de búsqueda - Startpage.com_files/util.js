// Get minimal required data for ads - script deliverd by Delhi
var elp = (function () {
  var payload = {};
  var cache = false;
  var _request = function (url, data, callback) {
    try {
      // Must encode data. object should be one level
      if (data && typeof (data) === 'object') {
        data = flattenObject(data);
        var y = '', e = encodeURIComponent;
        for (x in data) {
          y += '&' + e(x) + '=' + e(data[x]);
        }
        data = y.slice(1) + (!cache ? '&nc=' + new Date().getTime() : '');
      }
      x = new (this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
      //always do GET as this is for internal purposes and we are using htaccess redirection.
      x.open('GET', url + '?' + data, true);
      /*x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');*/
      x.onreadystatechange = function () {
        x.readyState > 3 && callback && callback(x.responseText, x);
      };
      x.send(data);
    } catch (e) {
      window.console && console.log(e);
    }
  };
  //set all payload to be sent here
  var _setPayLoad = function () {
    var doc = document;
    var win = window;
    var date = new Date();

    var e = win.document;
    var f = ("CSS1Compat" == e.compatMode ? e.documentElement : e.body);
    var langInput = document.querySelector('input[name="language"]');

    payload = {
      "ct": date.getTime(), //dt : client timestamp
      "tzo": -date.getTimezoneOffset(), //u_tz: client timezone offset
      "uw": win.screen.width, //u_w : screen size. This doesn't change on window resize
      "uh": win.screen.height, //u_h
      "bw": win.innerWidth ? win.innerWidth : f.clientWidth, //biw
      "bh": win.innerHeight ? win.innerHeight : f.clientHeight, //bih
      "ln": langInput && langInput.value,
    };
  };
  var flattenObject = function (ob) {
    var toReturn = {};
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if ((typeof ob[i]) == 'object') {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

  // takes properties from two JSON objects, merges and creates a new object
  // with the merged keys (mimics the behavior of Object.assign)
  // Keys from the second object get preferences in case of conflict
  var objConcat = function(objOne, objTwo) {
    var toReturn = {};

    // for-in loops are loop over the enumerable properties of object prototype also
    // using Object.keys instead
    Object.keys(objOne).forEach(function(key) {
      toReturn[key] = objOne[key];
    });

    Object.keys(objTwo).forEach(function(key) {
      toReturn[key] = objTwo[key];
    });

    return toReturn;
  }

  return {
    send: function (url, data, callback) {
      if ((arguments[1] && typeof (arguments[1]) === 'object')) {
        _setPayLoad();
        data = objConcat(payload, data);
      } else {
        _setPayLoad();
        data = payload;
      }
      _request(url, data, arguments[2]);
    }
  };
})();
