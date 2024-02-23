// import { getAvatarColor, getInitials } from '@/utils';

// import styles from './index.module.less';

// interface Props {
// 	className?: string;
// 	fontSize?: number;
// 	user?: {
// 		userId: string;
// 		displayName: string;
// 		avatarUrl: string;
// 		status?: string;
// 	};
// }

// export default function AvatarView(props: Props) {
// 	const { className, fontSize, user } = props;
// 	const pending = user?.status === 'pending';

// 	const [showInitial, setShowInitial] = useState(!user.avatarUrl);

// 	if (!user) {
// 		return null;
// 	}

// 	const avatarColor = getAvatarColor(user.userId);
// 	const initials = getInitials(user.displayName);
// 	const borderStyle = !pending ? 'solid' : 'dashed';
// 	const backgroundColor = !pending ? avatarColor : 'white';
// 	const borderColor = !pending ? avatarColor : '#000000';

// 	const onImgError = () => {
// 		setShowInitial(true);
// 	};

// 	return (
// 		<div className={cls(styles.avatarContainer, className || null)}>
// 			{showInitial ? (
// 				<div className={styles.avatar} style={{ backgroundColor, fontSize, borderStyle, borderColor }}>
// 					{initials}
// 				</div>
// 			) : (
// 				<img className={styles.avatar} src={user.avatarUrl} onError={onImgError} />
// 			)}
// 		</div>
// 	);
// }
