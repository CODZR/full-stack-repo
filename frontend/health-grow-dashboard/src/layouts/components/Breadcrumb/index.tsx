import { Breadcrumb } from 'antd';

import { capitalizeFirstLetter } from '@/utils';

import styles from './index.module.less';

const Breadcrumbs = () => {
	const { pathname } = useLocation();
	const pathSnippets = pathname.split('/').filter((i) => i);

	const breadcrumbItems = pathSnippets.map((path, idx) => {
		const url = `/${pathSnippets.slice(0, idx + 1).join('/')}`;

		return {
			key: path,
			title: capitalizeFirstLetter(path),
			href: url,
			className: url === pathname ? styles.active : ''
		};
	});

	return <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />;
};

export default Breadcrumbs;
