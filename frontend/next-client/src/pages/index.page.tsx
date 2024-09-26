'use client';

import { Spinner } from '@nextui-org/spinner';
import { useRouter } from 'next/router';

import { useOnceEffect } from '@/hooks/useHooks';
import DefaultLayout from '@/layouts/default';
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
			<Spinner />
		</DefaultLayout>
	);
}
