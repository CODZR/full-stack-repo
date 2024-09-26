import Image from 'next/image';

import FaviconPng from '@/assets/images/favicon.png';

const HomeLogo = () => {
	return <Image alt="home page logo" src={FaviconPng} width={100} />;
};

export default HomeLogo;
