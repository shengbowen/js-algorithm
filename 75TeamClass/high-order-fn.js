function batch(fn) {
	return function(target, ...args) {
		if (target.length >= 0) {
			return Array.from(target).map(item => fn.apply(this, [item, ...args]));
		} else {
			return fn.apply(this, [target, ...args]);
		}
	}
}

function queriable(fn) {
	return function(selector, ...args) {
		if (typeof selector === 'string') {
			selector = document.querySelectorAll(selector);
		}
		return fn.apply(this, [selector, ...args]);
	}
}

function pack(map) {
	return function(el, obj) {
		for (let key in map) {
			return map[key].call(this, el, obj[key]);
		}
	}
}

function methodize(fn, prop) {
	return function(...args) {
		fn.apply(null, [prop ? this[prop] : this, ...args]);
		return this;
	}
}

function setColor(el, color) {
	el.style.color = color;
}

function setFontSize(el, fontSize){
  el.style.fontSize = fontSize;
}

function setText(el, text){
  el.innerHTML = text;
}

let css = pack({color: setColor, fontSize: setFontSize});
css = queriable(batch(css));

let text = queriable(batch(setText));

function E(selector) {
	this._selector = selector;
}

E.prototype.css = methodize(css, '_selector');
E.prototype.text = methodize(text, '_selector');

function $(selector) {
	return new E(selector);
}

$('ul > li:nth-child(2n+1)').css({color: 'red'}).text('abc');