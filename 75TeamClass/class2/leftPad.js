var cache = [
	'',
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '       ',
  '        ',
  '         '
];

function leftPad (str, len, ch) {
	str = str + '';
	len = len - str.length;

	if (len <= 0) return str;

	if (!ch && ch !== 0) ch = ' ';

	ch = ch + '';

	if (ch === ' ' && len < 10) return cache[len] + str;

	var pad = '';

	while (true) {
		// add `ch` to `pad` if `len` is odd
		if (len & 1) pad += ch;

		len >>= 1;

		// "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
		if (len) ch += ch;
		else break;
	}

	return pad + str;
}