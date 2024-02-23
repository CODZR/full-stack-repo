import { ReactNode, SyntheticEvent } from 'react';

import { Portal } from '@comp/base/portal';

import styles from './index.module.less';

export interface Props {
	title?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
	closeIcon?: ReactNode;
	style?: React.CSSProperties;
	className?: string;
	cancelText?: string;
	okText?: string;
	zIndex?: number;
	width?: number;
	height?: number;
	open: boolean;
	mask?: boolean;
	maskClosable?: boolean;
	closable?: boolean;
	confirmLoading?: boolean;
	okDisable?: boolean;
	onOk?: (...args: any[]) => any;
	onCancel?: (...args: any[]) => any; // 如果显示close icon则必须传入onCancel
	afterClose?: () => any;
}

const Modal = (props: Props) => {
	const {
		className,
		zIndex = 1001,
		title,
		header,
		footer,
		children,
		closeIcon,
		cancelText = 'Cancel',
		okText = 'Save',
		open,
		width,
		height,
		mask = true,
		maskClosable = true,
		closable = true,
		onCancel,
		onOk,
		afterClose,
		style,
		confirmLoading,
		okDisable
	} = props;

	const cancelHandler = (e: NewClickEvent) => {
		onCancel?.(e);
		afterClose?.();
	};

	const maskClickHandler = (e: SyntheticEvent) => {
		if (!maskClosable) {
			return;
		}
		onCancel?.(e);
		afterClose?.();
	};

	const saveHandler = async (e: NewClickEvent) => {
		try {
			await Promise.resolve(onOk?.(e));
			afterClose?.();
		} catch (err) {
			console.log('err: ', err);
		}
	};

	useEffect(() => {
		document.body.classList.add('is-clipped');
		return () => {
			document.body.classList.remove('is-clipped');
		};
	}, []);

	const overlayStyle = useMemo(() => ({ zIndex }), [zIndex]);
	const containerStyle = useMemo(() => ({ ...style, width, height }), [style, width, height]);

	return (
		<Portal>
			{open && (
				<div className={styles.dialogOverlay} style={overlayStyle}>
					{mask && <div className={styles.mask} onClick={maskClickHandler} />}
					<div className={cls(styles.dialogContainer, className)} style={containerStyle}>
						{header ?? (
							<div className={styles.header}>
								<div className={styles.title}>{title}</div>
								{closable && onCancel && (
									<span className={styles.closeBtn} onClick={cancelHandler}>
										{closeIcon || <SvgIcon name="public-close-18" />}
									</span>
								)}
							</div>
						)}
						<div className={styles.childrenWrapper}>{children}</div>
						{footer ?? (
							<div className={styles.footer}>
								<Button className={styles.cancelBtn} onClick={cancelHandler}>
									{cancelText}
								</Button>
								<Button
									className={styles.saveBtn}
									disabled={okDisable}
									loading={confirmLoading}
									type="primary"
									onClick={saveHandler}
								>
									{okText}
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</Portal>
	);
};

export default Modal;
