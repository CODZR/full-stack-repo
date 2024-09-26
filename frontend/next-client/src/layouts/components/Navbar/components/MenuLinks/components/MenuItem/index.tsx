import { Flex, Link, Text } from '@chakra-ui/react';
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
		<Link href={to} isExternal={isExternal}>
			<Flex gap={1}>
				{children}
				{isExternal && <Image src={ExternalSvg} alt="external svg" />}
			</Flex>
		</Link>
	);
};

export default MenuItem;
