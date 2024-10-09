import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

import MenuItem from './components/MenuItem';

import { IS_LOGIN_KEY } from '@/models/global/constants';

const MenuLinks = ({ isOpen }) => {
	const isLogined = !!window.localStorage.getItem(IS_LOGIN_KEY);

	const handleSignClick = () => {
		if (isLogined) {
			window.localStorage.removeItem(IS_LOGIN_KEY);
		}
	};

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
				<MenuItem to="/weather/">Weather</MenuItem>
				<MenuItem to="/article/qianziwen/">Qian Ziwen</MenuItem>
				<MenuItem to="https://test.dzrlab.top/blog/food/" isExternal>
					Diet
				</MenuItem>
				<MenuItem to="/login/" isLast>
					<Button
						bg="primary.500"
						color="white"
						rounded="md"
						_hover={{
							bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600']
						}}
						onClick={handleSignClick}
					>
						{isLogined ? 'Sign out' : 'Sign in'}
					</Button>
				</MenuItem>
			</Stack>
		</Box>
	);
};

export default MenuLinks;
