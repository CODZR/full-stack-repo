import styles from './index.module.less';

import EmptyImg from '@/assets/img/empty.jpg';

interface Props {
	title: string;
	content: string;
	btnText: React.ReactNode;
	btnEvent: (e: NewClickEvent) => void;
}

const Empty = (props: Props) => {
	const { title, content, btnText, btnEvent } = props;

	return (
		<div className={styles.empty}>
			<img alt="empty data" src={EmptyImg} />
			<span className="title">{title}</span>
			<span>{content}</span>
			<div className={styles.button} onClick={btnEvent}>
				{btnText}
			</div>
		</div>
	);
};

export default Empty;
