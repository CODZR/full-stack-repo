import styles from './index.module.less';

interface Props {
	activeKey: string;
	tabsArr: string[];
	setTabKey: (value: string) => void;
}

const PageTabs = (props: Props) => {
	const { activeKey, tabsArr, setTabKey } = props;

	const onTabClick = useCallback(
		(tabKey: string) => {
			setTabKey(tabKey);
		},
		[setTabKey]
	);

	return (
		<ul className={styles.pageTabsWrapper}>
			{tabsArr.map((tabKey) => {
				return (
					<li
						className={cls(styles.tabItem, activeKey === tabKey ? styles.active : null)}
						key={tabKey}
						title={tabKey}
						onClick={() => onTabClick(tabKey)}
					>
						{tabKey}
					</li>
				);
			})}
		</ul>
	);
};

export default memo(PageTabs);
