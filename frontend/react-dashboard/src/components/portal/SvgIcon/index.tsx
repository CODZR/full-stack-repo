interface Props {
	className?: string;
	name: string; // 图标的名称 ==> 必传
	color?: string; //图标的颜色 ==> 非必传
	prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
	style?: Record<string, any>; // 图标的样式 ==> 非必传
	onClick?: (event: NewClickEvent) => void;
}

const SvgIcon = (props: Props) => {
	const { className = '', name, color, prefix = 'icon', style, onClick } = props;
	const symbolId = `#${prefix}-${name}`;

	return (
		<svg aria-hidden="true" className={cls('svg-icon', className)} style={style} onClick={onClick}>
			<use fill={color} href={symbolId} />
		</svg>
	);
};

export default memo(SvgIcon);
