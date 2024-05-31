import { ROUTE_PATH_MAP } from '@/models/global';
import HomePage from '@/pages/Home';

export const routeList = [
	{
		path: '/',
		element: <Navigate to={ROUTE_PATH_MAP.HOME} />
	},
	{
		path: ROUTE_PATH_MAP.HOME,
		element: <HomePage />
	},
	{
		path: '*',
		element: <Navigate to="/404" />
	}
];

const VibeRouter = () => useRoutes(routeList);

export default VibeRouter;
