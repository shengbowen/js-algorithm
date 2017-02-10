function Stack(size) {
  if(this == (window ? window : global))
    throw '必须使用new新建对象实例'
  this.stack = [];
  this.top = -1;
  this.STACK_SIZE = size || 5;
}

Stack.prototype.push = function(element) {
  if(this.top === this.STACK_SIZE - 1)
    throw Error('栈满');
  else
    this.stack[++this.top] = element;
}

Stack.prototype.pop = function() {
  if(this.top === -1)
    throw Error('栈空');
  else
    return this.stack[this.top--];
}

Stack.prototype.peek = function() {
  if(this.top === -1)
    throw Error('栈空');
  else
    return this.stack[this.top];
}

Stack.prototype.length = function() {
  return this.top + 1;
}

Stack.prototype.clear = function() {
  this.top = -1;
}


//es6 语法
class Stack {

  constructor(size) {
    this.stack = [];
    this.top = -1;
    this.STACK_SIZE = size || 5;
  }

  push(element) {
    if(this.top === this.STACK_SIZE - 1)
      throw Error('栈满');
    else
      this.stack[++this.top] = element;
  }

  pop() {
    if(this.top === -1)
      throw Error('栈空');
    else
      return this.stack[this.top--];
  }

  peek() {
    if(this.top === -1)
      throw Error('栈空');
    else
      return this.stack[this.top];
  }

  length() {
    return this.top + 1;
  }

  clear() {
    this.top = -1;
  }

}
