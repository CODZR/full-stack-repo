import React, { useState } from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

enum buttonSchema {
	default = 'teal',
	primary = 'messenger',
	danger = 'red',
	success = 'green'
}

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
	const { schema, className, disabled = false, loading = false, children, onClick } = props;

	const [btnLoading, setBtnLoading] = useState(loading);

	// useEffect(() => {
	// 	setBtnLoading(loading);
	// }, [loading]);

	const btnTheme = buttonSchema[schema || 'default'];

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
			_hover={{ opacity: 0.8, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
			className={className}
			colorScheme={btnTheme}
			isLoading={btnLoading}
			opacity={isDisabled ? 0.8 : 1}
			variant={schema === 'default' ? 'outline' : 'solid'}
			onClick={onDisabledBtnClick}
		>
			{children}
		</Button>
	);
};

export default MyButton;
