import { Flex } from '@chakra-ui/react';

const NavBarContainer = ({ children, ...props }) => {
	return (
		<Flex
			align="center"
			as="nav"
			bg="#fff"
			boxShadow="0 10px 20px #00000008"
			color="black"
			justify="space-between"
			p={4}
			position="sticky"
			top={0}
			w="100%"
			wrap="wrap"
			zIndex={999}
			{...props}
		>
			{children}
		</Flex>
	);
};

export default NavBarContainer;
