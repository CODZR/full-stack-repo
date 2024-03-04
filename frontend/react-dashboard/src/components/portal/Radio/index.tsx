import styles from './index.module.less';

interface Props {
	title: string;
	checked: boolean;
	className?: string;
	onClick?: (e: NewClickEvent) => void;
	disabled?: boolean;
}

const Radio = (props: Props) => {
	const { title, checked, className, onClick, disabled } = props;

	function onDisabledClick(e: NewClickEvent) {
		if (disabled) return;
		onClick?.(e);
	}

	return (
		<span
			className={cls(className, styles.radioWrapper, disabled ? styles.disabled : '')}
			onClick={onDisabledClick}
		>
			<span className={cls(styles.radioBtn, checked ? styles.checked : null)} />
			<span>{title}</span>
		</span>
	);
};

export default Radio;
