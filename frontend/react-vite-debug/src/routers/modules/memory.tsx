import { ROUTE_KEY_MAP, ROUTE_PATH_MAP } from '@/models/global';

import Layout from '@/layout';
import Memory1 from '@/pages/memory/Memory1';
import Memory2 from '@/pages/memory/Memory2';
import Memory3 from '@/pages/memory/Memory3';

export const menuChildren = [
	{
		path: ROUTE_PATH_MAP.MEMORY_1,
		element: <Memory1 />,
		meta: {
			key: ROUTE_KEY_MAP.MEMORY_1,
			title: 'Memory 1'
		}
	},
	{
		path: ROUTE_PATH_MAP.MEMORY_2,
		element: <Memory2 />,
		meta: {
			key: ROUTE_KEY_MAP.MEMORY_2,
			title: 'Memory 2'
		}
	},
	{
		path: ROUTE_PATH_MAP.MEMORY_3,
		element: <Memory3 />,
		meta: {
			key: ROUTE_KEY_MAP.MEMORY_3,
			title: 'Memory 3'
		}
	}
];

// 首页模块
const memoryRoutes = [
	{
		element: <Layout />,
		children: menuChildren,
		meta: {
			title: 'memory',
			icon: 'sidebar-memory'
		}
	}
];

export default memoryRoutes;
