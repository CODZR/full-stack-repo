import { Result } from 'antd';

import { ROUTE_PATH_MAP } from '@/models/global';

import './index.less';

const NotAuth = () => {
	const navigate = useStableNavigate();
	const goHome = () => {
		navigate(ROUTE_PATH_MAP.HOME);
	};

	return (
		<Result
			status="403"
			subTitle="Sorry, you are not authorized to access this page."
			title="403"
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotAuth;
