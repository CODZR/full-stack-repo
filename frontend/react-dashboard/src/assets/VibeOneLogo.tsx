type Props = {
	className?: string;
};

const iconStyle = { width: '100%', height: 60 };

const VibeOneLogo = ({ className }: Props) => {
	const isAdminLogo = isAdminPage();

	return (
		<>
			<SvgIcon
				className={className}
				name={`layout-loading-${isAdminLogo ? 'admin' : 'one'}`}
				style={iconStyle}
			/>
		</>
	);
};

export default VibeOneLogo;
