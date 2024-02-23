import styles from './index.module.less';

interface Props {
	items: DropdownItem[];
	width?: number;
	className?: string;
	dropdownItemClassName?: string;
}

export default function DropdownOverlay(props: Props) {
	const { items = [], width, className, dropdownItemClassName } = props;

	const overlayStyle = { width };

	const onDisabledClick = (e: NewClickEvent, callback, disabled: boolean = false) => {
		if (disabled) return;

		callback?.(e);
	};

	return (
		<div className={cls(styles.dropdownWrapper, className)} style={overlayStyle}>
			{items.map((item) => {
				if (item.type === 'divider') {
					return <div className={styles.divider} key={item.key} />;
				}

				return (
					<div
						key={item.key}
						className={cls(
							dropdownItemClassName,
							styles.dropdownItem,
							item?.disabled ? styles.drowdownItemDisabled : ''
						)}
						onClick={(e) => onDisabledClick(e, item.click, item?.disabled)}
					>
						{item?.render ? item.render() : item.label}
					</div>
				);
			})}
		</div>
	);
}

export type DropdownItem = {
	key: string | number;
	type?: string;
	label?: string;
	disabled?: boolean;
	render?: () => JSX.Element;
	click?: (e: NewClickEvent) => void;
};
