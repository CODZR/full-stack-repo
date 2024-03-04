import React, { Suspense } from 'react';
import { Spin } from 'antd';

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const spinStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%'
};
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense fallback={<Spin size="large" style={spinStyle} />}>
			<Comp />
		</Suspense>
	);
};

export default lazyLoad;
