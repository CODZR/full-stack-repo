import { ROUTE_KEY_MAP } from '@/models/global';

import { menuRouteList } from '@/routers';
import { RouteObject } from '@/routers/interface';

export type MenuItem = {
	label: React.ReactNode;
	key: ROUTE_KEY_MAP;
	icon?: React.ReactNode;
	children?: MenuItem[];
	type?: 'group';
};

const formatRoute2MenuItem = (route: RouteObject) => {
	const meta = route.meta;
	const menuItem = {
		key: meta.key || '',
		label: meta.title || '',
		path: route.path,
		hidden: route.hidden,
		icon: <SvgIcon name={meta.icon} />
	} as MenuItem;

	if (route.children?.length > 0) {
		menuItem.children = route.children
			.filter((child) => !child.hidden)
			.map((child) => formatRoute2MenuItem(child));
	}

	return menuItem;
};

/**
 * get visble menu routes
 */
export const getVisibleMenu = (routeArr: RouteObject[]) => {
	const visibleRoutes = [];

	const arrLen = routeArr.length;
	for (let i = 0; i < arrLen; i++) {
		const route = routeArr[i];
		if (!route.hidden) {
			visibleRoutes.push(formatRoute2MenuItem(route));
		}
	}

	return visibleRoutes;
};

/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 * @param {string} child 需要递归的字段名
 */
export const flattenRoutes = (arr: RouteObject[]) =>
	arr.reduce((prev: RouteObject[], item: RouteObject) => {
		if (Array.isArray(item.children)) {
			prev.push(item);
		}
		return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item);
	}, []);

/**
 * 根据路径获取路由的name和key
 * @param {string} path 路由
 */
/**
 * 根据路径获取路由的name和key
 * @param {string} path 路由
 */
export const getKeyName = (path: string = '/403') => {
	const truePath = path.split('?')[0];
	const curRoute = flattenRoutes(menuRouteList).filter((item: { path: string | string[] }) =>
		item.path.includes(truePath)
	);
	if (!curRoute[0]) return { title: '暂无权限', tabKey: '403' };
	const { name, key, component } = curRoute[0];

	return { title: name, tabKey: key, component };
};

/**
 * 同步执行操作，Currying
 * @param {*} action 要执行的操作
 * @param {function} cb 下一步操作回调
 */
export const asyncAction = (action: unknown | void) => {
	const wait = new Promise((resolve) => {
		resolve(action);
	});

	return (cb: () => void) => {
		wait.then(() => setTimeout(() => cb()));
	};
};

// /**
//  * 页签关闭操作回调
//  * @param {object} history 路由history对象。不能new新实例，不然参数无法传递
//  * @param {string} returnUrl 返回地址
//  * @param {function} cb 回调操作，可选
//  */
// export const closeTabAction = (history: CommonObjectType, returnUrl: string = '/', cb?: () => {}) => {
// 	const { curTab } = store.getState().global.tab;
// 	const { href } = window.location;
// 	const pathname = href.split('#')[1];
// 	// 删除tab
// 	const tabArr = curTab.slice(); // curTab 是不可变对象. slice() 方法返回一个数组副本
// 	const delIndex = tabArr.findIndex((item: string) => item === pathname);
// 	tabArr.splice(delIndex, 1);

// 	// 如果要返回的页面被关闭了，再加进去
// 	if (!tabArr.includes(returnUrl)) {
// 		tabArr.push(returnUrl);
// 	}
// 	// 批量更新store, 同步更新ui, 避免多次绘制 UI
// 	// React Redux：调度多个操作时的性能注意事项. batch 已经够用, 对于高消耗的reducer操作，可以使用 以下更好的方案
// 	batch(() => {
// 		// 储存新的tabs数组
// 		store.dispatch(setTabs(tabArr));
// 		// 刷新tab
// 		store.dispatch(setReloadPath(returnUrl));
// 		// 停止刷新tab
// 		setTimeout(() => {
// 			store.dispatch(setReloadPath('null'));
// 		}, 500);
// 	});
// 	if (typeof cb === 'function') {
// 		cb();
// 	} else {
// 		history.push({
// 			pathname: returnUrl
// 		});
// 	}
// };

// /**
//  * 获取地址栏 ?参数，返回键值对对象
//  */
// export const getQuery = (): CommonObjectType<string> => {
// 	const { href } = window.location;
// 	const query = href.split('?');
// 	if (!query[1]) return {};

// 	const queryArr = decodeURI(query[1]).split('&');
// 	const queryObj = queryArr.reduce((prev, next) => {
// 		const item = next.split('=');

// 		return { ...prev, [item[0]]: item[1] };
// 	}, {});

// 	return queryObj;
// };
