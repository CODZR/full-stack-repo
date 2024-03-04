import { Menu } from 'antd';

import { getVisibleMenu } from '@/utils/route';

import { ROUTE_KEY_MAP } from '@/models/global';

import styles from './index.module.less';

import { menuRouteList } from '@/routers';

const LayoutMenu = () => {
	const navigate = useStableNavigate();
	const menuItems = useMemo(() => {
		return getVisibleMenu(menuRouteList);
	}, []);

	const onMenuClick = ({ keyPath }) => {
		console.log('keyPath: ', keyPath);
		const path = keyPath.reduce((res, key) => {
			return `/${key}${res}`;
		}, '');
		console.log('path: ', path);
		navigate(path);
	};

	return (
		<Menu
			defaultOpenKeys={[ROUTE_KEY_MAP.LOGISTIC]}
			defaultSelectedKeys={[ROUTE_KEY_MAP.HOME]}
			items={menuItems}
			mode="inline"
			rootClassName={styles.layoutMenu}
			theme="dark"
			onClick={onMenuClick}
		/>
	);
};

export default memo(LayoutMenu);
// LayoutMenu.whyDidYouRender = true;
