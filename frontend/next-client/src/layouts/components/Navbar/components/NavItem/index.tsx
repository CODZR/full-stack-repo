import React from 'react';
import { Flex, Icon, Link, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';

import NavHoverBox from './components/NavHoverBox';

interface Props {
	icon: React.FC<typeof Icon>;
	title: string;
	description: string;
	active?: boolean;
	navSize: 'small' | 'large';
}

export default function NavItem(props: Props) {
	const { icon, title, description, active, navSize } = props;

	return (
		<Flex alignItems={navSize == 'small' ? 'center' : 'flex-start'} flexDir="column" mt={30} w="100%">
			<Menu placement="right">
				<Link
					_hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
					backgroundColor={active && '#AEC8CA'}
					borderRadius={8}
					p={3}
					w={navSize == 'large' && '100%'}
				>
					<MenuButton w="100%">
						<Flex>
							<Icon as={icon} color={active ? '#82AAAD' : 'gray.500'} fontSize="xl" />
							<Text display={navSize == 'small' ? 'none' : 'flex'} ml={5}>
								{title}
							</Text>
						</Flex>
					</MenuButton>
				</Link>
				<MenuList border="none" h={200} ml={5} py={0} w={200}>
					<NavHoverBox description={description} icon={icon} title={title} />
				</MenuList>
			</Menu>
		</Flex>
	);
}
