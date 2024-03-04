import React, { useMemo } from 'react';

import styles from './index.module.less';

interface Props {
	className?: string;
	closable?: boolean;
	closeIcon?: React.ReactNode;
	icon?: React.ReactNode;
	children?: JSX.Element | string;
	onClose?: (e: NewClickEvent) => void;
}

const Tag = (props: Props) => {
	const { closable = false, className, children, closeIcon, onClose } = props;

	const [visible, setVisible] = useState(true);

	const handleClick = (e: NewClickEvent) => {
		onClose && typeof onClose === 'function' && onClose(e);
		setVisible(false);
	};

	const closeView = useMemo(() => {
		return closeIcon ? closeIcon : <SvgIcon name="portal-tag-close" />;
	}, [closeIcon]);

	return visible ? (
		<span className={cls(className, styles.tagWrapper)}>
			{children}
			{closable && (
				<span className={styles.closeIcon} onClick={handleClick}>
					{closeView}
				</span>
			)}
		</span>
	) : null;
};

export default Tag;
