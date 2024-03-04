import { Tooltip as AntdTooltip } from 'antd';
import type { TooltipPropsWithOverlay } from 'antd/lib/tooltip';

import styles from './index.module.less';

interface Props extends TooltipPropsWithOverlay {
	show?: boolean;
	overlayClassName?: string;
	children: React.ReactNode;
}

export default function Tooltip(props: Props) {
	const { show = true, overlayClassName, children } = props;

	return (
		<>
			{show ? (
				<AntdTooltip {...props} overlayClassName={overlayClassName}>
					<span className={styles.tooltipChildrenWrapper}>{children}</span>
				</AntdTooltip>
			) : (
				<>{children}</>
			)}
		</>
	);
}
