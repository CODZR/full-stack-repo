'use client';

import { Spinner } from '@chakra-ui/react';

import DefaultLayout from '@/layouts';
import { IS_LOGIN_KEY, ROUTE_PATH_MAP } from '@/models/global/constants';
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		if (location.pathname === ROUTE_PATH_MAP.HOME) {
			const isLogined = window.localStorage.getItem(IS_LOGIN_KEY);
			setTimeout(() => {
				if (isLogined) {
					location.replace(ROUTE_PATH_MAP.QIAN_ZI_WEN);
				} else {
					location.replace(ROUTE_PATH_MAP.LOGIN);
				}
			}, 300);
		} else {
			location.replace(location.pathname);
		}
	}, []);

	return (
		<DefaultLayout>
			<Spinner
				color="blue.500"
				emptyColor="gray.200"
				left="50%"
				position="fixed"
				size="xl"
				speed="0.65s"
				thickness="4px"
				top="50%"
				transform="translate(-50%, -50%)"
			/>
		</DefaultLayout>
	);
}
