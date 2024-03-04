import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { Tooltip, TooltipProps } from 'antd';

import './styles.less';

export const PREFIX_CLS = 'antd';
export const PREFIX_CLS_ELLIPSIS = `${PREFIX_CLS}-ellipsis`;
export interface Props {
	/** 组件展示的最大宽度，默认为 '100%' */
	width?: string | number;
	/** 多行省略的行数 */
	lineClamp?: number;
	/** 若文本溢出，是否展示 tooltip */
	tooltip?: Partial<TooltipProps>;
	/** 行内样式*/
	style?: React.CSSProperties;
	/** 类名 */
	className?: string;
	children?: string | ReactNode;
}

const Ellipsis = (props: Props) => {
	const { width = '100%', lineClamp = 1, style = {}, children, className } = props;

	const contentRef = useRef<HTMLDivElement>(null);
	const copyContentRef = useRef<HTMLDivElement>(null);
	const [isOverflow, setIsOverflow] = useState(false);

	useLayoutEffect(() => {
		const calcOverflow = () => {
			if (!contentRef.current || !copyContentRef.current) {
				return false;
			}

			return (
				contentRef.current.clientWidth < copyContentRef.current.clientWidth ||
				contentRef.current.clientHeight < copyContentRef.current.clientHeight
			);
		};
		setIsOverflow(calcOverflow());
	}, [children, contentRef.current?.clientWidth]);

	const classNames = cls(
		{
			[`${PREFIX_CLS_ELLIPSIS}-overflow-content${lineClamp ? '-line-clamp' : ''}`]: true,
			[`${PREFIX_CLS_ELLIPSIS}-expanded-content`]: false
		},
		className
	);

	const renderStyle = useMemo(
		() => ({
			maxWidth: width,
			WebkitLineClamp: lineClamp,
			...style
		}),
		[lineClamp, style, width]
	);

	const render = (
		<div className={classNames} ref={contentRef} style={renderStyle}>
			{children}
		</div>
	);

	//用于判断文字是否超出容器宽度，判断是否需要显示展开按钮
	const renderCopy = React.cloneElement(render, {
		style: props.style,
		className: cls(`${PREFIX_CLS_ELLIPSIS}-content-copy`, className),
		ref: copyContentRef
	});

	return (
		<span className={`${PREFIX_CLS_ELLIPSIS}`}>
			{renderCopy}
			{props.tooltip && isOverflow ? (
				<Tooltip title={children} {...props.tooltip}>
					{render}
				</Tooltip>
			) : (
				render
			)}
		</span>
	);
};

export default Ellipsis;
