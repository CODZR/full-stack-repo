import LayoutHeader from './components/LayoutHeader';

import styles from './index.module.less';

const Layout = () => {
	return (
		<div className={styles.layoutWrapper}>
			<LayoutHeader />
			<div className={styles.contentWrapper}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
