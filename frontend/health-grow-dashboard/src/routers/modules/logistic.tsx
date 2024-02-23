import { ROUTE_KEY_MAP, ROUTE_PATH_MAP } from '@/models/global';

import { RouteObject } from '../interface';
import LayoutIndex from '@/layouts';
import TaskPage from '@/pages/Task';

export const menuChildren = [
	{
		path: ROUTE_PATH_MAP.LOGISTIC,
		element: <Navigate to={ROUTE_PATH_MAP.HOME} />,
		hidden: true
	},
	{
		path: ROUTE_PATH_MAP.ORDER,
		element: <TaskPage />,
		meta: {
			title: 'Order',
			key: ROUTE_KEY_MAP.ORDER,
			icon: 'sidebar-order'
		}
	},
	{
		path: ROUTE_PATH_MAP.TASK,
		element: <TaskPage />,
		meta: {
			title: 'WH Task',
			key: ROUTE_KEY_MAP.TASK,
			icon: 'sidebar-task'
		}
	}
];

// 首页模块
const logisticRoutes: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: menuChildren,
		meta: {
			title: 'Logistic',
			key: ROUTE_KEY_MAP.LOGISTIC,
			icon: 'sidebar-logistic'
		}
	}
];

export default logisticRoutes;
