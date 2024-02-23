interface Props {
	checked: boolean;
}

export default function RadioView(props: Props) {
	const { checked } = props;

	return (
		<SvgIcon
			name={checked ? 'public-radio-on' : 'public-radio-off'}
			style={{ width: '32px', height: '32px' }}
		/>
	);
}
