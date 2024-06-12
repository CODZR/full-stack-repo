import { ROUTE_PATH_MAP } from '@/models/global';
import styles from './index.module.less';

const LayoutHeader = () => {
	const routeArr = Object.keys(ROUTE_PATH_MAP).map((key) => ({
		label: key,
		path: ROUTE_PATH_MAP[key]
	}));

	return (
		<div className={styles.layoutHeaderWrapper}>
			<div className={styles.linkRow}>
				{routeArr.map((route) => (
					<a key={route.label} href={route.path}>
						{route.label}
					</a>
				))}
			</div>
		</div>
	);
};

export default LayoutHeader;
