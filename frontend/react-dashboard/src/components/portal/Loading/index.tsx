import { Spin } from 'antd';

import './index.module.less';

const Loading = ({ tip = 'Loading' }: { tip?: string }) => {
	return <Spin className="request-loading" size="large" tip={tip} />;
};

export default Loading;
