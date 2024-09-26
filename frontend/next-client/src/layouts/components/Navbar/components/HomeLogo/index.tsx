import Image from 'next/image';
import FaviconPng from '@/assets/images/favicon.png';

const HomeLogo = () => {
	return <Image width={100} src={FaviconPng} alt="home page logo" />;
};

export default HomeLogo;
