import { message as antdMessage } from 'antd';

import './index.less';

const message = {
	success: (content, duration?: number) => {
		antdMessage.success({ content, duration, icon: <SvgIcon name="ui-success" /> });
	},
	error: (content, duration?: number) => {
		antdMessage.error({ content, duration, icon: <SvgIcon name="ui-error" /> });
	},
	info: (content, duration?: number) => {
		antdMessage.info({ content, duration, icon: <SvgIcon name="ui-info" /> });
	},
	warning: (content, duration?: number) => {
		antdMessage.warning({ content, duration, icon: <SvgIcon name="ui-warning" /> });
	}
};

export default message;
