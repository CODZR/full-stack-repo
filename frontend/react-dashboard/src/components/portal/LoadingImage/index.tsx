import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Spin } from 'antd';

import styles from './index.module.less';

interface Props {
	src: string;
	className?: string;
	alt?: string;
	wrapperHeight?: string;
	style?: UnknownObj;
	children?: React.ReactNode; // node like absolute icon
	scrollIntoView?: boolean;
}

const LoadingImage = (props: Props) => {
	const { src, className, alt, wrapperHeight, style, children, scrollIntoView = false } = props;
	const imageRef = useRef<HTMLImageElement>(null);

	const [imageLoading, setImageLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		if (scrollIntoView) {
			imageRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [scrollIntoView]);

	useEffect(() => {
		if (src) {
			setImageLoading(true);
		}
	}, [src]);

	const onLoaded = useCallback(() => {
		setImageError(false);
		setImageLoading(false);
	}, []);

	const onError = useCallback(() => {
		setImageError(true);
		setImageLoading(false);
	}, []);

	const imgStyle = useMemo(() => ({ ...style, height: wrapperHeight }), [style, wrapperHeight]);

	const ImageLoader = useMemo(() => {
		const onReloadImageClick = (e: NewClickEvent) => {
			e.stopPropagation();
			if (imageError && imageRef.current && src) {
				imageRef.current.src = src;
				setImageLoading(true);
				setImageError(false);
			}
		};

		return (
			<>
				<img
					alt={alt}
					className={cls(styles.loadingImage, className)}
					ref={imageRef}
					src={src}
					onError={onError}
					onLoad={onLoaded}
				/>
				<div className={styles.errorHandlerWrapper} onClick={onReloadImageClick}>
					<SvgIcon className={styles.warnIcon} name="policy-warn" />
					<div className={styles.errInfo}>Cannot load image</div>
					<div className={styles.link}>Reload</div>
				</div>
			</>
		);
	}, [alt, className, src, onError, onLoaded, imageError]);

	return (
		<div className={cls('loading-image', styles.imageWrapper, imageError && styles.errorLoaded)}>
			<Spin spinning={imageLoading}>
				<div style={imgStyle}>{ImageLoader}</div>
			</Spin>
			{!imageLoading && children}
		</div>
	);
};

export default memo(LoadingImage);
