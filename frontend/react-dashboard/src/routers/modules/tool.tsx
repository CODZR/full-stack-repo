import { ROUTE_KEY_MAP, ROUTE_PATH_MAP } from '@/models/global';

import { RouteObject } from '../interface';
import LayoutIndex from '@/layouts';
import EasyQuote from '@/pages/tools/EasyQuote';
import Supply from '@/pages/tools/Supply';

export const menuChildren = [
	{
		path: ROUTE_PATH_MAP.TOOL,
		element: <Navigate to={ROUTE_PATH_MAP.EASY_QUOTE} />,
		hidden: true
	},
	{
		path: ROUTE_PATH_MAP.EASY_QUOTE,
		element: <EasyQuote />,
		meta: {
			key: ROUTE_KEY_MAP.EASY_QUOTE,
			title: 'Easy Quote',
			icon: 'sidebar-css-show'
		}
	},
	{
		path: ROUTE_PATH_MAP.SUPPLY,
		element: <Supply />,
		meta: {
			key: ROUTE_KEY_MAP.SUPPLY,
			title: 'Supply',
			icon: 'sidebar-css-show'
		}
	}
];

// 首页模块
const toolRoutes: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: menuChildren,
		meta: {
			key: ROUTE_KEY_MAP.TOOL,
			title: 'Logistic tools',
			icon: 'sidebar-tools'
		}
	}
];

export default toolRoutes;
