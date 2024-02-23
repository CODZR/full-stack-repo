import lazyLoad from '@comp/portal/LazyLoad';

import { RouteObject } from '../interface';
import Page404 from '@/pages/ErrorPage/404';

// 错误页面模块
const errorRoutes: RouteObject[] = [
	{
		path: '/403',
		element: lazyLoad(lazy(() => import('@/pages/ErrorPage/403'))),
		meta: {
			title: '403页面',
			key: '403'
		}
	},
	{
		path: '/404',
		element: <Page404 />,
		meta: {
			title: '404页面',
			key: '404'
		}
	},
	{
		path: '/500',
		element: lazyLoad(lazy(() => import('@/pages/ErrorPage/500'))),
		meta: {
			title: '500页面',
			key: '500'
		}
	}
];

export default errorRoutes;
