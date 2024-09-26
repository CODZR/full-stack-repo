import ExternalSvg from '@/assets/images/external.svg';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';

import MenuItem from './components/MenuItem';
import Image from 'next/image';

const MenuLinks = ({ isOpen }) => {
	return (
		<Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
			<Stack
				align="center"
				direction={['column', 'row', 'row', 'row']}
				justify={['center', 'space-between', 'flex-end', 'flex-end']}
				pt={[4, 4, 0, 0]}
				spacing={8}
			>
				<MenuItem to="/">Home</MenuItem>
				<MenuItem to="/weather">Weather</MenuItem>
				<MenuItem to="/qianziwen">Qian Ziwen</MenuItem>
				<MenuItem to="https://test.dzrlab.top/blog/food/" isExternal>
					Diet
				</MenuItem>
				<MenuItem to="/login" isLast>
					<Button
						bg={['white', 'white', 'primary.500', 'primary.500']}
						color={['primary.500', 'primary.500', 'white', 'white']}
						rounded="md"
						_hover={{
							bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600']
						}}
					>
						Login
					</Button>
				</MenuItem>
			</Stack>
		</Box>
	);
};

export default MenuLinks;
