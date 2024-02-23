import { errorRoutes, logisticRoutes, toolRoutes } from './modules';

import { ROUTE_PATH_MAP } from '@/models/global';

export const routeList = [
	...logisticRoutes,
	...toolRoutes,
	...errorRoutes,
	{
		path: '/',
		element: <Navigate to={ROUTE_PATH_MAP.HOME} />
	},
	{
		path: '/logistic/login',
		element: <Navigate to="/logistic/board" />
	},
	{
		path: '*',
		element: <Navigate to="/404" />
	}
];

const VibeRouter = () => useRoutes(routeList);

export default VibeRouter;

export const menuRouteList = [...toolRoutes, ...logisticRoutes];
