import React, { useEffect, useState } from 'react';

import LoadingPage from '../components/FullscreenLoading';

import { isMobileDevice } from '@/utils/utils';

import { ROUTE_PATH_MAP } from '@/models/global';

import styles from './index.module.less';

import MobileLayout from '../MobileLayout';

const whiteRouteArr = [ROUTE_PATH_MAP.WORKSPAE_DELETE] as string[];

const BlankLayout = () => {
	const { pathname } = useLocation();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		document.title = 'Vibe Logistic';
	}, []);

	useOnceEffect(() => {
		if (whiteRouteArr.some((path) => pathname.includes(path))) {
			setLoading(false);
			return;
		}
	});

	if (isMobileDevice()) {
		return <MobileLayout />;
	}

	return (
		<div className={styles.blankLayout}>
			<div className={styles.adminLogo}>
				<SvgIcon name="layout-vibe-admin-black" />
			</div>
			{loading ? <LoadingPage /> : <Outlet />}
		</div>
	);
};

export default BlankLayout;
