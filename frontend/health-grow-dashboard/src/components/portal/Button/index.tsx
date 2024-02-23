import type { ButtonProps } from 'antd';
import { Button as AntdButton } from 'antd';

import styles from './index.module.less';

const Button = (props: ButtonProps) => {
	const { children } = props;
	// const { type, style, disabled = false, loading = false, children, onClick } = props;

	// const [btnLoading, setBtnLoading] = useState(loading);

	// useEffect(() => {
	// 	setBtnLoading(loading);
	// }, [loading]);

	// const typeClass = typeClassEnum[type || 'default'];
	// const btnStyle = useMemo(() => ({ width, ...style }), [style, width]);

	// const onDisabledBtnClick = useCallback(
	// 	async (e: NewClickEvent) => {
	// 		if (disabled) {
	// 			e.preventDefault();
	// 			e.stopPropagation();
	// 		} else {
	// 			if (onClick) {
	// 				try {
	// 					setBtnLoading(true);
	// 					await Promise.resolve(onClick(e));
	// 				} finally {
	// 					setBtnLoading(false);
	// 				}
	// 			}
	// 		}
	// 	},
	// 	[disabled, onClick]
	// );

	// const isDisabled = disabled || loading;

	return <AntdButton {...props}>{children}</AntdButton>;
};

export default Button;

const typeClassEnum = {
	default: styles.isDefault,
	primary: styles.isPrimary,
	danger: styles.isDanger,
	text: styles.isText,
	hoverText: styles.isHoverText,
	success: styles.isSuccess
};
