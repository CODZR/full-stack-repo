// Flex.js
import React from 'react';

interface Props {
	justify?: string;
	align?: string;
	gap?: number;
	wrap?: string;
	direction?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

const Flex = (props: Props) => {
	const {
		direction = 'row',
		justify = 'flex-start',
		align = 'stretch',
		gap = 0,
		wrap,
		children,
		style
	} = props;

	const flexStyle = {
		display: 'flex',
		flexDirection: direction,
		justifyContent: justify,
		alignItems: align,
		wrap: wrap,
		gap: gap,
		...style // 允许自定义其他样式
	} as React.CSSProperties;

	return <div style={flexStyle}>{children}</div>;
};

export default Flex;
