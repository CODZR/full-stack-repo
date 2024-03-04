import RcDropdown from 'rc-dropdown';
import type { DropdownProps } from 'rc-dropdown/lib/Dropdown';

import styles from './index.module.less';

type PlaceMent = 'bottomRight' | 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom';

interface Props extends DropdownProps {
	animation?: string;
	wrapperClassName?: string;
	placement?: PlaceMent;
	disabled?: boolean;
	visable?: boolean;
	multiple?: boolean;
	onVisibleChange?: (visible: boolean) => void;
	onOverlayClick?: (e: NewClickEvent) => void;
}

const Dropdown = (props: Props) => {
	const {
		disabled,
		wrapperClassName,
		children,
		animation = 'slide-up',
		visible = false,
		multiple = false,
		onVisibleChange,
		onOverlayClick
	} = props;

	const [dropdownVisible, setDropdownVisible] = useState(visible);

	const onDisabledVisibleChange = (visible: boolean) => {
		if (disabled) return;

		onVisibleChange && onVisibleChange(visible);
		setDropdownVisible(visible);
	};

	const onDisabledOverlayClick = (e: NewClickEvent) => {
		if (disabled) return;
		onOverlayClick && onOverlayClick(e);
		setDropdownVisible(multiple);
	};

	return (
		<div className={cls(styles.dropdownWrapper, wrapperClassName, disabled ? styles.wrapperDisabled : '')}>
			<RcDropdown
				{...props}
				animation={animation}
				visible={dropdownVisible}
				onOverlayClick={onDisabledOverlayClick}
				onVisibleChange={onDisabledVisibleChange}
			>
				{children}
			</RcDropdown>
		</div>
	);
};

export default Dropdown;
