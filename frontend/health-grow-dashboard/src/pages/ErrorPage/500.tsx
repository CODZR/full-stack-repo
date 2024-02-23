import { Button, Result } from 'antd';

import { ROUTE_PATH_MAP } from '@/models/global';

import './index.less';

const NotNetwork = () => {
	const navigate = useStableNavigate();
	const goHome = () => {
		navigate(ROUTE_PATH_MAP.HOME);
	};

	return (
		<Result
			status="500"
			subTitle="Sorry, something went wrong."
			title="500"
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotNetwork;
