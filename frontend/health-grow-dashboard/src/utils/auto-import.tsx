export { isEmpty } from '@/utils/is';
export { jsonClone } from '@/utils/utils';

let hasOwn = Object.hasOwnProperty;

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
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			if (arg.length) {
				let inner = cls(...arg);
				if (inner) {
					classes.push(inner);
				}
			}
		} else if (argType === 'object') {
			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
				classes.push(arg.toString());
				continue;
			}

			for (let key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}

/**
 * @returns sessionStorage.getItem('vibe-focus-team')
 */
export const getFocusTeamId = () => sessionStorage.getItem('vibe-focus-team');
/**
 * @returns sessionStorage.getItem('vibe-csrf-tokenm')
 */
export const getCsrfToken = () => sessionStorage.getItem('vibe-csrf-token');

/**
 * @returns location.pathname.includes('/admin')
 */
export const isAdminPage = (pathname = '') => (pathname || location.pathname).includes('/admin');
