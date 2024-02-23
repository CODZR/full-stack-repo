import { searchParentRoute } from '@/utils';

import styles from './index.module.less';

import { menuRouteList } from '@/routers';

const PageTitle = () => {
	const { pathname } = useLocation();

	const rootRoute = useMemo(() => {
		return searchParentRoute(pathname, menuRouteList) || {};
	}, [pathname]);
	const pageTitle = rootRoute.meta?.title;

	return <span className={styles.title}>{pageTitle}</span>;
};

export default memo(PageTitle);
