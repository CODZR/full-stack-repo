import React, { useState } from 'react';
import type { ButtonProps } from '@nextui-org/button';
import { Button } from '@nextui-org/button';

interface Props extends ButtonProps {
	width?: number | string;
	schema?: 'default' | 'primary' | 'danger' | 'success';
	style?: Record<string, any>;
	hoverBackground?: boolean;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	children: React.ReactNode;
	onClick?: (e: NewClickEvent) => Promise<void> | void;
}

const MyButton = (props: Props) => {
	const { className, disabled = false, loading = false, children, onClick } = props;

	const [btnLoading, setBtnLoading] = useState(loading);

	// useEffect(() => {
	// 	setBtnLoading(loading);
	// }, [loading]);

	const onDisabledBtnClick = async (e: NewClickEvent) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			if (onClick) {
				try {
					setBtnLoading(true);
					await Promise.resolve(onClick(e));
				} finally {
					setBtnLoading(false);
				}
			}
		}
	};

	const isDisabled = disabled || loading;

	return (
		<Button
			{...props}
			className={className}
			disabled={isDisabled}
			isLoading={btnLoading}
			onClick={onDisabledBtnClick}
		>
			{children}
		</Button>
	);
};

export default MyButton;
