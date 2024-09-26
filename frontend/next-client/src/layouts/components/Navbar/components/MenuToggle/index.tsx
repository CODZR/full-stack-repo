import { Box } from '@chakra-ui/react';

import CloseIcon from './assets/CloseIcon';
import MenuIcon from './assets/MenuIcon';

const MenuToggle = ({ toggle, isOpen }) => {
	return (
		<Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
			{isOpen ? <CloseIcon /> : <MenuIcon />}
		</Box>
	);
};

export default MenuToggle;
