import { ROUTE_PATH_MAP } from '@/models/global';

import memoryRoutes from './modules/memory';
import Layout from '@/layout';
import HomePage from '@/pages/Home';

export const routeList = [
	...memoryRoutes,
	{
		path: '/',
		element: <Navigate to={ROUTE_PATH_MAP.HOME} />
	},
	{
		element: <Layout />,
		children: [
			{
				path: ROUTE_PATH_MAP.HOME,
				element: <HomePage />
			}
		]
	},
	{
		path: '*',
		element: <Navigate to={ROUTE_PATH_MAP.HOME} />
	}
];

const VibeRouter = () => useRoutes(routeList);

export default VibeRouter;
