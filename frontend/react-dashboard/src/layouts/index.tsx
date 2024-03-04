/* eslint-disable max-lines */

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

import Breadcrumbs from './components/Breadcrumb';
import LayoutHeader from './components/Header';
import LayoutMenu from './components/Menu';
import MobileLayout from './MobileLayout';

import { StableNavigateContextProvider } from '@/hooks/useStableNavigate';

import { isMobileDevice } from '@/utils';

import styles from './index.module.less';

const LayoutIndex = () => {
	const collapsed = useSelector((state) => state.ui.collapsed);

	if (isMobileDevice()) {
		return <MobileLayout />;
	}

	return (
		<StableNavigateContextProvider>
			<section className={styles.layoutWrapper}>
				<Layout>
					<Sider collapsed={collapsed} theme="dark" trigger={null} width={240}>
						<LayoutMenu />
					</Sider>
					<Layout rootClassName={styles.contentWrapper}>
						<LayoutHeader />
						<Content className={styles.layoutContent}>
							<Breadcrumbs />
							<div className={styles.outletWrapper}>
								<Outlet />
							</div>
						</Content>
					</Layout>
				</Layout>
			</section>
		</StableNavigateContextProvider>
	);
};

export default LayoutIndex;
