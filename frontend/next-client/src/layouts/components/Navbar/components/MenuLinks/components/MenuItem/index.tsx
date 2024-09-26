import { Flex, Link } from '@chakra-ui/react';
import Image from 'next/image';

import ExternalSvg from '@/assets/images/external.svg';

interface Props {
	to: string;
	children: React.ReactNode;
	isLast?: boolean;
	isExternal?: boolean;
}

const MenuItem = (props: Props) => {
	const { children, isExternal, to = '/' } = props;

	return (
		<Link href={to} isExternal={isExternal} w="100%">
			<Flex gap={1} justify="center" marginLeft={1} w="max-content">
				{children}
				{isExternal && <Image alt="external svg" src={ExternalSvg} />}
			</Flex>
		</Link>
	);
};

export default MenuItem;
