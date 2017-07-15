/**
	为字符串左部填充  
*/
function leftpad (str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}



function leftPad(n, len){
    len = len || 2;
    n = n + '';
    var diff = len - n.length;
    if (diff > 0) {
        n = new Array(diff + 1).join('0') + n;
    }
    return n;
}
