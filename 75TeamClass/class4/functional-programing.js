/**
	高阶函数，函数式编程示例	
*/


function __matchArgs__(fn) {
	return function(...args) {
		if (args.length !== fn.length) {
			throw new Error('参数不匹配');
		}
		return fn.apply(this, args);
	}
}


/*
	jquery 常用模式，参数既可以是string也可以object
*/
function setStyle(el, property, value) {
	if (typeof el === 'string') {
		el = document.querySelector(el);
	}

	if (typeof property === 'object') {
		for (var key in property) {
			setStyle(el, key, property[key]);
		}
	} else {
		el.style[property] = value;
	}
}


/*
	深拷贝
*/
function deepCopy(desc, src) {
	if (!src || typeof src !== "object") {
		return desc;
	}

	for (let key in src) {
		if (src.hasOwnProperty(key)) {
			if (typeof src[key] === 'object') {
				desc[key] = (Object.prototype.toString.call(src[key]) === '[object] Array') ? [] : {};
				deepCopy(desc[key], src[key]);
			} else {
				desc[key] = src[key];
			}
		}
	}
	return desc;
}

function merge(des, ...objs) {
	return [des, ...objs].reduce((a, b) => deepCopy(a, b));
	//return objs.reduce((a, b) => deepCopy(a,b), des)
}


/*
	过程抽象，提升函数纯度
*/
function setColor(el, color) {
	el.style.color = color;
}

function setColors(els, color) {
	Array.from(els).map(el => setColor(el, color))
} // 无过程抽象，一个函数内部，调用另一个函数

function __muti__(fn) {
	return function(arrayLike, ...args) {
		return Array.from(arrayLike).map(item => fn(item, ...args));
	}
} // 使用过程抽象， 更加通用

let setColors = __muti__(setColor);

setColors(document.querySelectorAll('li'), 'green');


/*
	为函数执行，添加执行前和执行后 动作
*/
function __watch__(fn) {
	return function f(...args) {
		let blocked = false;
		if (f.before) {
			blocked = f.before(this, ...args);
		}
		if (!blocked) {
			let ret = fn.apply(this, args);
			if (f.after) {
				f.after(this, ret, ...args);
			}
			return ret;
		}
	}
}

$ = __watch__($);

$.after = function(thisObj, retVal) {
	if (retVal.css) {
		let _origin = retVal.css;
		retVal.css = __watch__(retVal.css);
		retVal.css.before = function(target, ...args) {
			requestAnimationFrame(() => _origin.apply(target, args));
		}
		return true;
	}
}

/*
	reduce 改造不定 参数
*/
function reduce(fn) {
	return function(...args) {
		return args.reduce(fn.bind(this));
	}
}

var add = reduce((a, b) => a + b);
add(1, 2, 3, 4);

// add asynchronous support
function __reduce__(fn, async) {
	if (async) {
		return function(...args) {
			return args.reduce((a, b) => {
				return Promise.resolve(a).then( v => fn.call(this, v, b));
			})
		}
	} else {
		return function(...args) {
			return args.reduce(fn.bind(this));
		}
	}
}

function asyncAdd(x, y) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`${x} + ${y} = ${x+y}`);
			resolve(x+y);			
		},  1000)
	});
}

asyncAdd = __reduce__(asyncAdd, true);
asyncAdd(1, 2, 3, 4, 5).then(v => console.log(v));


/*
	函数异步化和串行执行
*/
function __delay__(time, fn) {
	return function() {
		var args = [].slice.call(arguments),
				callback;

		if (fn.length !== args.length) {
			callback = args[args.length - 1];
			args.length--;
		}

		setTimeout(() => {
			var ret = fn.apply(this, args);
			callback && callback(ret);
			return ret;
		}, time);
	}
}

function output(msg){
  console.log(msg);
}

output = __delay__(1500, output);

function __pipe__(...fnList) {
	return fnList.reduceRight(function(a, b) {
		return function() {
			b(a);
		}
	})
}

var outputOneByOne = __pipe__(output.bind(null, 'message 1'),
                              output.bind(null, 'message 2'),
                              output.bind(null, 'message 3'),
                              output.bind(null, 'message 4'));

outputOneByOne();


/*
	reduce and pipe
*/
function __reduce__(...fnList) {
	return function(...args) {
		if (fnList.length <= 0) return;
		fnList[0] = fnList[0].apply(this, args);

		return fnList.reduce((a, b) => b.call(this, a));
	}
}

function __pipe__(...fnList) {
	return function(...args) {
		var fn = fnList.reduceRight((a, b) => (...args) => b.apply(this, [...args, a]));
		return fn.apply(this, args);
	}
}

function add(x, y){
  return x + y;
}

function double(x){
  return 2 * x;
}

var foo = __reduce__(add, double, double, double);

console.log(foo(1, 2));

function taskA(x, next){
  console.log(`task a: ${x}`);
  next();
}

function taskB(next){
  console.log('task b');
  next();
}

function taskC(){
  console.log('task c');
}

var foo2 = __pipe__(taskA, taskB, taskC);

foo2(10);


/*
	throttle 避免重复点击
	wait 秒内 只执行一次
*/
function throttle(fn, wait) {
	var timer;
	return function(...args) {
		if (!timer) {
			setTimeout(() => timer = null, wait);
			fn.apply(this, args);
		}
	}
}

/*
	debounce 避免连续触发
	小于wait秒，永不执行函数
*/

function debounce(fn, wait) {
	var timer;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(this, args), wait)
	}
}







