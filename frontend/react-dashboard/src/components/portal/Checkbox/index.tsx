import { useDisableClickEvent } from '@/hooks/UIHooks';

import styles from './index.module.less';

interface Props {
	checked: boolean;
	disabled?: boolean;
	checkStyle?: string;
	defaultChecked?: boolean;
	name?: string;
	className?: string;
	children?: JSX.Element;
	onClick?: (e: NewClickEvent) => void;
	onChange?: (checked: boolean) => void;
}

const CHECK_STYLE = {
	TICK: 'tick',
	LINE: 'line'
};

const Checkbox = (props: Props) => {
	const {
		checked,
		disabled,
		checkStyle = CHECK_STYLE.TICK,
		defaultChecked = false,
		className,
		children,
		onClick,
		onChange
	} = props;

	useEffect(() => {
		if (onChange) {
			onChange(checked);
		}
	}, [checked, onChange]);

	const onDisabledCheckboxClick = useDisableClickEvent();

	return (
		<div
			className={cls('v-checkbox', className, styles.wrapper)}
			onClick={(e) => onDisabledCheckboxClick(e, disabled, onClick)}
		>
			<div
				className={cls(
					'box',
					styles.checkbox,
					checkStyle,
					defaultChecked ? 'checked' : '',
					disabled ? 'is-disabled' : '',
					checked ? 'checked' : ''
				)}
			/>
			{children && <span className={styles.label}>{children}</span>}
		</div>
	);
};

export default memo(Checkbox);
