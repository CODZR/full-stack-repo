import React from 'react';

import HomeLogo from './components/HomeLogo';
import MenuLinks from './components/MenuLinks';
import MenuToggle from './components/MenuToggle';
import NavBarContainer from './components/NavbarContainer';

const NavBar = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer {...props}>
			<HomeLogo />
			<MenuToggle isOpen={isOpen} toggle={toggle} />
			<MenuLinks isOpen={isOpen} />
		</NavBarContainer>
	);
};

export default NavBar;
