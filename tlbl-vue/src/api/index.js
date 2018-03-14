//======================================================
//常用计算方法，避免错误格式的出现
//加法
export function floatSup(arg1, arg2, arg3) {
  var r1, r2, r3;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  try {
    r3 = arg3.toString().split(".")[1].length
  } catch (e) {
    r3 = 0
  }
  var m = Math.pow(10, Math.max(r1, r2, r3));
  var m1 = Math.pow(10, Math.max(r1, r2) - r1);
  var m2 = Math.pow(10, Math.max(r1, r2) - r2);
  var m3 = Math.pow(10, Math.max(r1, r3) - r3);

  var r1_integer = Number(arg1.toString().replace(".", "")) * m1;
  var r2_integer = Number(arg2.toString().replace(".", "")) * m2;
  var r3_integer = Number(arg3.toString().replace(".", "")) * m3;

  return (r1_integer + r2_integer + r3_integer) / m;
}
//减法
export function floatSub(arg1, arg2) {
  var r1, r2, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  var m = Math.pow(10, Math.max(r1, r2));
  var m1 = Math.pow(10, Math.max(r1, r2) - r1);
  var m2 = Math.pow(10, Math.max(r1, r2) - r2);

  var r1_integer = Number(arg1.toString().replace(".", "")) * m1;

  var r2_integer = Number(arg2.toString().replace(".", "")) * m2;

  n = (r1 >= r2) ? r1 : r2;
  return Number(((r1_integer - r2_integer) / m).toFixed(n));
}
//乘
export function floatMul(arg1=1, arg2=1) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除
export function floatDiv(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {
  }

  r1 = Number(arg1.toString().replace(".", ""));

  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

//======================================================
//格式化时间
export function handleGetTime(time, type) {
  if (time == '946656000000') {
    return '--:--';
  }
  let myTime = parseInt(time);
  let myDate = new Date(myTime);
  let year = myDate.getFullYear();//获取年份
  let month = myDate.getMonth() + 1;//获取月份
  let day = myDate.getDate();//获取日期
  let hour = myDate.getHours();//获取小时数(0-23)
  let minutes = myDate.getMinutes();//获取分钟数(0-59)
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (type == "hh") {
    return `${hour}`;
  } else if (type == "mm") {
    return `${minutes}`;
  } else if (type == "time") {
    return `${hour}:${minutes}`;
  } else if (type == "date") {
    return `${year}-${month}-${day}`;
  } else if (type == "all") {
    return `${year}-${month}-${day} ${hour}:${minutes}`;
  }
}
//向上取整10分钟
export function getTime(time) {

  let year = handleGetTime(time, 'date');
  let hour = handleGetTime(time, 'hh');
  let minute = handleGetTime(time, 'mm');
  if (minute.substring(0, 1) == "0" && minute.substring(1, 2) !== "0") {
    minute = 10;
  } else if (parseInt(minute) / 10 < 5 && parseInt(minute) / 10 > 1) {
    minute = (parseInt(minute.substring(0, 1)) + 1) * 10;
  } else if (parseInt(minute) / 10 >= 5) {
    minute = "00";
    hour = parseInt(hour) + 1;
    if (hour < 10) {
      hour = "0" + hour
    }
  }
  //safari浏览器不能识别时间中间的空格,否则会被解析成NAN，所以要加T,加上z是表示当前时间为标准时间
  return new Date(year + 'T' + hour + ':' + minute + "Z").getTime() - 8 * 60 * 60 * 1000;
}

//======================================================
//页面与安卓或ios的交互
export const u = navigator.userAgent;
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default function interactiveBridge(sendName, receiveName, sendData, receiveCallback) {
  if (isiOS) {
    //ios终端
    function setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }

    setupWebViewJavascriptBridge(function (bridge) {
      //注册任务
      bridge.registerHandler(receiveName, function (data, responseCallback) {
        receiveCallback(data);
      });
      //发布任务
      bridge.callHandler(sendName, sendData, function (response) {
      })
    })
  } else {
    //android终端
    //发布任务
    (function () {
      try {
        javascript:android[sendName](JSON.stringify(sendData));
      } catch (e) {
      }
    })();
    /*这个方法用于接收code*/
    window[receiveName] = function (data) {
      receiveCallback(data);
    };
  }
}

//=====================================================
//判断对象是否为空
export function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

//=====================================================
//document.cookie获取当前网站的所有cookie
export function getCookie(name) {
  var arr = document.cookie.split('; ');
  for (var i = 0; i < arr.length; i++) {
    var arr1 = arr[i].split('=');
    if (arr1[0] == name) {
      return arr1[1];
    }
  }
  return '';
}

//=====================================================
//获取url上的数据
export function getUrlData(_this, name) {
  if (name == 'jwt') {
    return _this.$route.query.jwt ? _this.$route.query.jwt : ''
  }
  return _this.$route.query[name]
}

//=====================================================
//保存数据
export function setLocalStorage(_this) {
  const state = _this.$store.state
  window.localStorage.setItem('_TIE_LU_BAN_LV_', JSON.stringify({state}))
}
//取出数据
export function getLocalStorage(state, prop) {
  const localData = window.localStorage.getItem('_TIE_LU_BAN_LV_')
  if (localData) {
    const data = JSON.parse(localData)
    return {
      ...data.state[prop]
    }
  }
  return state
}

//======================================================================
//判断当前版本号是否大于等于实现功能的版本号
export function isRunByVersion(currentVersion, standardVersion) {
  const currentArr = currentVersion.split('.')
  const standardArr = standardVersion.split('.')
  return (currentArr[0] > standardArr[0])
    || (currentArr[0] == standardArr[0] && currentArr[1] > standardArr[1])
    || (currentArr[0] == standardArr[0] && currentArr[1] == standardArr[1] && (currentArr[2] ? currentArr[2] : 0) >= (standardArr[2] ? standardArr[2] : 0))
}

//========================================================================
//当前服务标准信息
const standardData = {
  "1de76e8dac3c4ec5af2cdd06f2a5977b": {
    "car": {"pickup": "price_bjx.html#101", "take": "price_bjx.html#201"},
    "smallLuggage": {"pickup": "price_bjx.html#102", "take": "price_bjx.html#102"},
    "luggage": {"pickup": "price_bjx.html#102", "take": "price_bjx.html#102"},
    "incarriage": {"pickup": "price_bjx.html#104", "take": "price_bjx.html#203"},
    "rider": {"pickup": "price_bjx.html#103", "take": "price_bjx.html#202"},
    "cancelService": {"pickup": "price_bjx.html#302", "take": "price_bjx.html#302"},
    "phone": {"pickup": "010-51933911", "take": "010-51861531"},
  },
  "5c41d92d20724a97b56afe7f434f876b": {
    "car": {"pickup": "price_zz.html#103", "take": "price_zz.html#103"},
    "smallLuggage": {"pickup": "price_zz.html#102", "take": "price_zz.html#102"},
    "luggage": {"pickup": "price_zz.html#102", "take": "price_zz.html#102"},
    "incarriage": {"pickup": "price_zz.html#101", "take": "price_zz.html#101"},
    "rider": {"pickup": "price_zz.html#103", "take": "price_zz.html#103"},
    "cancelService": {"pickup": "price_zz.html#104", "take": "price_zz.html#104"},
    "phone": {"pickup": "0371-63314987", "take": "0371-63314987"},
  },
  "fa6300b05d09447aba2f4a998b0577c5": {
    "car": {"pickup": "price_hhd.html", "take": "price_hhd.html"},
    "smallLuggage": {"pickup": "price_hhd.html", "take": "price_hhd.html"},
    "luggage": {"pickup": "price_hhd.html", "take": "price_hhd.html"},
    "incarriage": {"pickup": "price_hhd.html", "take": "price_hhd.html"},
    "rider": {"pickup": "price_hhd.html", "take": "price_hhd.html"},
    "cancelService": {"pickup": "price_hhd.html", "take": "price_hhd.html"},
    "phone": {"pickup": "", "take": ""},
  },
  "3f9a4bee66aa467587506a3c33c39b0c": {
    "car": {"pickup": "price_hh.html", "take": "price_hh.html"},
    "smallLuggage": {"pickup": "price_hh.html", "take": "price_hh.html"},
    "luggage": {"pickup": "price_hh.html", "take": "price_hh.html"},
    "incarriage": {"pickup": "price_hh.html", "take": "price_hh.html"},
    "rider": {"pickup": "price_hh.html", "take": "price_hh.html"},
    "cancelService": {"pickup": "price_hh.html", "take": "price_hh.html"},
    "phone": {"pickup": "", "take": ""},
  },
}
//获取当前商品的服务标准
export function getStandard(stationId = '1de76e8dac3c4ec5af2cdd06f2a5977b', type, transferType) {
  if (type == 'phone') {
    return standardData[stationId][type][transferType]
  }
  return `http://cdn.tlbl.winsion.net/service/transfer/introduction/${standardData[stationId][type][transferType]}`
}


