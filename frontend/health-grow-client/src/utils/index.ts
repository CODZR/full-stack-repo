const hasOwn = Object.hasOwnProperty;

/**
 * classnames 拼接className
 */
export function cls(...args) {
	let classes = [];

	for (let i = 0, len = args.length; i < len; i++) {
		let arg = args[i];
		if (!arg) continue;

		let argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			// @ts-ignore
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			if (arg.length) {
				let inner = cls(...arg);
				if (inner) {
					// @ts-ignore
					classes.push(inner);
				}
			}
		} else if (argType === 'object') {
			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
				// @ts-ignore
				classes.push(arg.toString());
				continue;
			}

			for (let key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					// @ts-ignore
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}
