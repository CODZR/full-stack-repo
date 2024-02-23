import type { CSSProperties, InputHTMLAttributes, KeyboardEventHandler, ReactNode, Ref } from 'react';
import RcInput from 'rc-input';
import type { BaseInputProps } from 'rc-input/lib/interface';

import styles from './index.module.less';

interface Props {
	className?: string;
	inputRef?: Ref<InputRef>;
	style?: CSSProperties;
	width?: number;
	maxLength?: number;
	showCount?: boolean;
	height?: number;
	placeholder?: string;
	value?: InputHTMLAttributes<HTMLInputElement>['value'];
	disabled?: boolean;
	allowClear?: boolean | { clearIcon?: ReactNode };
	prefix?: JSX.Element;
	suffix?: JSX.Element;
	onChange?: (e: NewInputEvent) => void;
	onBlur?: (e: NewInputEvent) => void;
	onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export default function Input(props: Props) {
	const {
		className,
		inputRef,
		placeholder = '',
		disabled,
		allowClear,
		width,
		height,
		prefix,
		suffix,
		style,
		...restProps
	} = props;

	// Allow clear
	let mergedAllowClear: BaseInputProps['allowClear'];
	if (typeof allowClear === 'object' && allowClear?.clearIcon) {
		mergedAllowClear = allowClear;
	} else if (allowClear) {
		mergedAllowClear = {
			clearIcon: <SvgIcon name="public-input-clean" style={{ width: 20, height: 20, cursor: 'pointer' }} />
		};
	}

	return (
		<div
			style={{ ...style, width, height }}
			className={cls(
				className,
				styles.inputWrapper,
				prefix && styles.withPrefix,
				disabled ? styles.disabled : ''
			)}
		>
			{disabled && <div className={styles.disabledMask} />}
			{prefix}
			<RcInput
				allowClear={mergedAllowClear}
				className={allowClear && styles.withClear}
				placeholder={placeholder}
				ref={inputRef}
				{...restProps}
			/>
			{suffix}
		</div>
	);
}
