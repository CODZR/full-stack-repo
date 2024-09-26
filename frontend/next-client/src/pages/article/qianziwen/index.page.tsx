import { useState } from 'react';

import ZiCard from './components/ZiCard';
import MyModal from '@/components/base/MyModal';

import DefaultLayout from '@/layouts';
import { searchHanziAPI } from '@/services/hanzi';
import { cls } from '@/utils';
import { body, title } from './utils';

import styles from './index.module.less';

const QianziwenPage = () => {
	const qianziwenBody = Array.from(body);

	const [openSearchHanziDialog, setOpenSearchHanziDialog] = useState(false);
	const [wenziObj, setWenziObj] = useState({} as UnknownObj);

	const punctuationSet = new Set(['，', '。']);

	const showSearchDialog = (char) => {
		if (punctuationSet.has(char)) {
			return;
		}

		searchHanziAPI(char).then((data: UnknownObj) => {
			setWenziObj(data);
			setOpenSearchHanziDialog(true);
		});
	};

	const closeSearchHanziDialog = () => {
		setOpenSearchHanziDialog(false);
	};

	return (
		<DefaultLayout>
			<div className={styles.pageWrapper}>
				<p className={styles.title}>{title}</p>

				<div className={styles.body}>
					{qianziwenBody.map((char, idx) => (
						<p
							className={cls(styles.char, (idx + 1) % 5 === 0 ? styles.symbol : '')}
							key={idx}
							onClick={() => showSearchDialog(char)}
						>
							{char}
						</p>
					))}
				</div>

				<MyModal isOpen={openSearchHanziDialog} onClose={closeSearchHanziDialog}>
					<ZiCard wenzi={wenziObj} />
				</MyModal>
			</div>
		</DefaultLayout>
	);
};

export default QianziwenPage;
