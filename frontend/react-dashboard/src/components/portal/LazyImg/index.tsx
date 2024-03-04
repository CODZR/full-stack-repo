interface ImgProps {
	src: string;
	alt?: string;
	className?: string;
}

/**
 * url base: @/assets/img/
 */
export default function LazyImg(props: ImgProps) {
	const { src, alt, className } = props;
	const url = new URL(`/src/assets/img/${src}`, import.meta.url).href;

	return <img alt={alt} className={className} src={url} />;
}
