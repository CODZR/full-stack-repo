import { Flex } from '@chakra-ui/react';

const NavBarContainer = ({ children, ...props }) => {
	return (
		<Flex
			align="center"
			as="nav"
			bg="#fff"
			boxShadow="0 10px 20px #00000008"
			color={['white', 'white', 'primary.700', 'primary.700']}
			justify="space-between"
			position="sticky"
			top={0}
			zIndex={999}
			p={4}
			w="100%"
			wrap="wrap"
			{...props}
		>
			{children}
		</Flex>
	);
};

export default NavBarContainer;
