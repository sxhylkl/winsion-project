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

//=====================================================
//判断对象是否为空
export function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

//=====================================================
//消息提示
export function messageAlert(_this,content,title) {
  _this.$alert(content, title, {
    confirmButtonText: '确定',
    callback: action => {}
  });
}

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











