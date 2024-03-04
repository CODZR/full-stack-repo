import styles from './index.module.less';

export default function MobileLayout() {
	const isAdminRoute = isAdminPage();

	return (
		<div className={styles.mobileLayout}>
			<div className={styles.logo}>
				<SvgIcon name={`layout-vibe${isAdminRoute ? '-admin' : ''}-black`} />
			</div>
			<p>Device Not Supported</p>
			<span>
				<b>Vibe Logistic{isAdminRoute ? ' Admin' : ''}</b> cannot be viewed on your phone at this moment.
				Please visit this page from desktop, laptop or iPad.
			</span>
		</div>
	);
}
