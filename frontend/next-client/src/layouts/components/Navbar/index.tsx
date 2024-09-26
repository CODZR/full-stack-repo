import React, { useState } from 'react';
import { FiBriefcase, FiCalendar, FiDollarSign, FiHome, FiMenu, FiSettings, FiUser } from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
import { Avatar, Divider, Flex, Heading, IconButton, Text } from '@chakra-ui/react';

import NavItem from './components/NavItem';

export default function Sidebar() {
	const [navSize, changeNavSize] = useState('large' as 'small' | 'large');

	return (
		<Flex
			borderRadius={navSize == 'small' ? '15px' : '30px'}
			boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
			flexDir="column"
			h="95vh"
			justifyContent="space-between"
			left="5"
			marginTop="2.5vh"
			pos="sticky"
			w={navSize == 'small' ? '75px' : '200px'}
		>
			<Flex
				alignItems={navSize == 'small' ? 'center' : 'flex-start'}
				as="nav"
				flexDir="column"
				p="5%"
				w="100%"
			>
				<IconButton
					aria-label="change nav size"
					_hover={{ background: 'none' }}
					background="none"
					icon={<FiMenu />}
					mt={5}
					onClick={() => {
						if (navSize == 'small') changeNavSize('large');
						else changeNavSize('small');
					}}
				/>
				<NavItem
					description="This is the description for the dashboard."
					icon={FiHome}
					navSize={navSize}
					title="Dashboard"
				/>
				<NavItem icon={FiCalendar} navSize={navSize} title="Calendar" active />
				<NavItem icon={FiUser} navSize={navSize} title="Clients" />
				<NavItem icon={IoPawOutline} navSize={navSize} title="Animals" />
				<NavItem icon={FiDollarSign} navSize={navSize} title="Stocks" />
				<NavItem icon={FiBriefcase} navSize={navSize} title="Reports" />
				<NavItem icon={FiSettings} navSize={navSize} title="Settings" />
			</Flex>

			<Flex alignItems={navSize == 'small' ? 'center' : 'flex-start'} flexDir="column" mb={4} p="5%" w="100%">
				<Divider display={navSize == 'small' ? 'none' : 'flex'} />
				<Flex align="center" mt={4}>
					<Avatar size="sm" src="avatar-1.jpg" />
					<Flex display={navSize == 'small' ? 'none' : 'flex'} flexDir="column" ml={4}>
						<Heading as="h3" size="sm">
							Sylwia Weller
						</Heading>
						<Text color="gray">Admin</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
