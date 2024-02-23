import styles from './index.module.less';

interface Props {
	label: string;
	value?: string;
}

export default function DeviceProfileItem(props: Props) {
	const { label, value } = props;

	return (
		<div className={styles.container}>
			<div className={styles.label}>{label}</div>

			<div className={styles.value}>{value}</div>
		</div>
	);
}
