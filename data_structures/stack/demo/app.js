/*
    闭合检查
    //新建一个Stack s
    s = new stack()
    //读取字符直至读完
    while read to c != EOF:
      //如果字符是开放括号 如 '(' '[' '{'等， 入栈
      if c is opening:
          s.push( c )
      //如果字符是结束括号 如 ')' ']' '}'
      else if c is closing:
          //若栈为空或者栈顶元素与开放括号不匹配 则报错
          if s is empty or f s.pop() is not correspond to c:
              return error!
    //若最后栈不为空，报错
    if s is not empty:
      return error!
    //如果没有返回报错，则返回正常
    return ok
*/
function checkClose(str) {

  var openStack = new Stack(100),
      brackets = {
        ')': '(',
        ']': '[',
        '}': '{',
      },
      close = '}])',
      open = '({[';

  for(var i = 0, len = str.length; i < len; i++) {
    if (open.indexOf(str[i]) !== -1 ) {
      openStack.push(str[i])
    }
    else if (close.indexOf(str[i]) !== -1) {
      if (openStack.isEmpty() || (openStack.pop() !== brackets[str[i]])) {
        console.log('没有闭合')
        return false;
      }
    }
  }
  if (!openStack.isEmpty()) {
    console.log('没有闭合')
    return false;
  }
  return true;
}
