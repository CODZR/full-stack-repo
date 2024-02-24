import { useState, useRef } from 'react';
import styles from './index.module.less';

interface Props {
	setDisableSubmit: rcSetFn<boolean>;
}

const VerifyProgress = (props: Props) => {
	const { setDisableSubmit } = props;

	const [progressPercent, setProgressPercent] = useState(0);

	const timerId = useRef<any>(null);
	const nextPercent = useRef(0);
	const verifyBoxRef = useRef(null as HTMLDivElement);

	const setupProgress = (increment: boolean) => {
		if (progressPercent === 100) return;

		const calNextPercent = (percent: number) => {
			const step = increment ? 1 : -2;
			nextPercent.current = percent + step;

			if (nextPercent.current < 0) {
				nextPercent.current = 0;
			} else if (nextPercent.current > 100) {
				nextPercent.current = 100;
			}
			return nextPercent.current;
		};

		// 循环的setTimeout替代低性能的setInterval
		timerId.current = setTimeout(() => {
			setProgressPercent((percent) => calNextPercent(percent));

			if (nextPercent.current === 0 || nextPercent.current === 100) {
				clearInterval(timerId.current);
				setDisableSubmit(nextPercent.current === 0 ? true : false);
				if (nextPercent.current === 100) {
					onVerified();
				}
			} else {
				setupProgress(increment);
			}
		}, 25);
	};

	const onVerified = () => {
		verifyBoxRef.current.style.color = '#fff';
		verifyBoxRef.current.innerText = 'Verified';
	};

	const onVerifyMouseDown = () => {
		const animationTime = 2500 * (1 - progressPercent / 100);
		verifyBoxRef.current.style.animation = `${animationTime}ms ease 0s 1 normal none running textColorInvert`;
		clearInterval(timerId.current);
		setupProgress(true);
	};

	const onVerifyMouseUp = () => {
		if (progressPercent === 100) return;

		const animationTime = 1250 * (progressPercent / 100);
		verifyBoxRef.current.style.animation = `${animationTime}ms ease 0s 1 normal none running textColorIReverse`;
		clearInterval(timerId.current);
		setupProgress(false);
	};

	return (
		<div className={styles.verifyWrapper} onMouseDown={onVerifyMouseDown} onMouseUp={onVerifyMouseUp}>
			<div className={styles.verifyTrigger} style={{ width: progressPercent + '%' }} />
			<div ref={verifyBoxRef} className={styles.verifyBox}>
				Press &amp; Hold until verified
			</div>
		</div>
	);
};

export default VerifyProgress;
