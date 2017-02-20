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
    '-': 1,
    '=': 1,
    '%': 2,
    '*': 2,
    '/': 2,
    '^': 3,
    // '(': 0,
    // ')': 0,
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

  function compareOperator(op1, op2) {
    return priority[op1] - priority[op2];
  }

  function calcExpression(exp) {
    var opStack = new Stack(100),
        numStack = new Stack(200),
        exp = exp.replace(/s/g, '');
    exp += '`';
    if(exp[0] === '-') {
      exp = '0' + exp;
    }
    var c,
        op,
        num1,
        num2;
    for(var i=0; i<exp.length; i++) {
      c = exp[i];
      if(c in priority) {
        //如果是操作符
        while (c !== '(' && !opStack.isEmpty() && compareOperator(opStack.peek(), c) >=0 ) {
          op = opStack.pop();
          if(op !== '(' && op !== ')') {
            num2 = numStack.pop();
            num1 = numStack.pop();
            numStack.push(doop(op, num1, num2));
          }
        }
        if (c !== ')') opStack.push(c);
      } else {
        while(!(exp[i] in priority)) {
          i++;
          c += exp[i];
        }
        numStack.push(parseInt(c));
        i--;
      }
    }
    return numStack.length ? numStack.pop() : NAN;
  }

//   function calcExpression(exp) {
//     var opStack = new Stack(100),
//         numStack = new Stack(200),
//         exp = exp.replace(/s/g, '');
//     // exp += '`';
//     if(exp[0] === '-') {
//       exp = '0' + exp;
//     }
//     var c,
//         op,
//         num1,
//         num2;
//     for(var i=0; i<exp.length; i++) {
//       c = exp[i];
//       if(c === '(') {
//         opStack.push(c);
//       } else if (/\d/.test(c)) {
//         while(/\d/.test(exp[++i])) {
//           c += exp[i];
//         }
//         numStack.push(c);
//         i--;
//       }else if(c in priority) {
//         while (!opStack.isEmpty() && compareOperator(opStack.peek(), c) >=0) {
//           op = opStack.pop();
//           num2 = numStack.pop();
//           num1 = numStack.pop();
//           numStack.push(doop(op, num1, num2));
//         }
//         opStack.push(c);
//       } else if (c === ')') {
//         op = opStack.pop();
//         while(op !== '(') {
//           num2 = numStack.pop();
//           num1 = numStack.pop();
//           numStack.push(doop(op, num1, num2));
//           op = opStack.pop()
//         }
//       }
//     }
//     return numStack.length ? numStack.pop() : NAN;
//   }
//
//   return {
//     calcExpression: calcExpression
//   }
//
// })();

new Vue({
  el: '#app2',
  data: {
    exp: '1+2-3*(1+1)/2+4%2',
    error: '',
    result: ''
  },
  methods: {
    handleClick: function() {
      var _this = this;
      var exp = _this.exp.replace(/s+/,'');
      if(exp === ''){
        _this.error = '请输入内容！';
        // console.log(_this.error)
        return;
      }
      _this.result = calc.calcExpression(exp);
    }
  }
});
