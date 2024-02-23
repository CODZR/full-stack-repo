import { Header } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { setCollapsed } from '@/models/ui';

import styles from './index.module.less';

const LayoutHeader = () => {
	const dispatch = useDispatch();

	const collapsed = useSelector((state) => state.ui.collapsed);

	const onToggleCollapsed = () => {
		dispatch(setCollapsed(!collapsed));
	};

	return (
		<Header className={styles.layoutHeader}>
			<Button
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				type="text"
				style={{
					fontSize: '16px',
					width: 64,
					height: 64
				}}
				onClick={onToggleCollapsed}
			/>
		</Header>
	);
};

export default memo(LayoutHeader);
