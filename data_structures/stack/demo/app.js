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

new Vue({
  el: '#app1',
  data: {
    str1: '',
    error: ''
  },
  methods: {
    handleClick: function() {
      var _this = this;
      var str = _this.str1.replace(/s+/,'');
      if(str === ''){
        _this.error = '请输入内容！';
        // console.log(_this.error)
        return;
      }
      _this.error = checkClose(str) ? '' : '没有闭合！';
    }
  }
});


/**
 * 栈的应用2  表达式求值
   //分配两个栈，ops为运算符栈，nums为数字栈
  ops = new Stack, nums = new Stack
  //从表达式中读取字符 直至结束
  while read c in expression != EOF:
      //若为左括号，入运算符栈
      if c is '(':
          ops.push(c)
      //若为数字，入数字栈
      else if c is a number:
          nums.push(c)
      //若为操作符
      else if c is an operator:
          //若运算符栈的栈顶元素比c的优先级高或一样高，则进行单次运算
          while ops.top() is equal or precedence over c:
              op = ops.pop()
              opn2 = nums.pop()
              opn1 = nums.pop()
              //进行单次运算，并把运算数入数字栈
              nums.push( cal(op,opn1,opn2) )
      //若为右括号
      else if c is ')':
          //除非栈顶元素为左括号，否则运算符栈出栈并将计算结果入数字栈
          op = ops.pop()
          while op != '(':
              opn2 = nums.pop()
              opn1 = nums.pop()
              nums.push( cal(op,opn1,opn2) )
              op = ops.pop()
  //返回数字栈的栈顶元素
  return nums.top()
 */

var calc = (function(){
  var priority = {
    '+': 1,
    '=': 1,
    '%': 2,
    '*': 2,
    '/': 2,
    '^': 3,
    '(': 0,
    ')': 0,
    '`': -1
  };

  function doop(op, num1, num2) {
    switch(op) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      case '%':
        return num1 % num2;
      case '^':
        return Math.pow(num1, num2);
      default:
        return 0;
    }
  }

})();
