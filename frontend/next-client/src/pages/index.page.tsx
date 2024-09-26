'use client';

import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useOnceEffect } from '@/hooks/useHooks';
import DefaultLayout from '@/layouts';
import { ROUTE_PATH_MAP } from '@/models/global/constants';

export default function Home() {
	const router = useRouter();

	useOnceEffect(() => {
		if (location.pathname === ROUTE_PATH_MAP.HOME) {
			setTimeout(() => {
				router.push(ROUTE_PATH_MAP.LOGIN);
			}, 300);
		} else {
			router.push(location.pathname);
		}
	});

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
