import { Result } from 'antd';

import { ROUTE_PATH_MAP } from '@/models/global';

import './index.less';

const NotFound = () => {
	const navigate = useStableNavigate();

	const goHome = () => {
		navigate(ROUTE_PATH_MAP.HOME);
	};

	return (
		<Result
			status="404"
			subTitle="Sorry, the page you visited does not exist."
			title="404"
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotFound;
