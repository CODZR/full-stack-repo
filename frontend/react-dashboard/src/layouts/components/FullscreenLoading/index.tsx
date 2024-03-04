import styles from './index.module.less';

import VibeOneLogo from '@/assets/VibeOneLogo';

type Props = {
	className?: string;
};

export default function LoadingView({ className }: Props) {
	return (
		<div className={`${styles.LoadingViewContainer} ${className}`}>
			<VibeOneLogo />
		</div>
	);
}
