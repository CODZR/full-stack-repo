'use client';

import { useRouter } from 'next/router';

import { useOnceEffect } from '@/hooks/useHooks';
import Layout from '@/layout';
import { ROUTE_PATH_MAP } from '@/models/global/constants';

export default function Home() {
	const router = useRouter();

	useOnceEffect(() => {
		router.push(ROUTE_PATH_MAP.LOGIN);
	});

	return (
		<Layout>
			<p>hello world</p>
		</Layout>
	);
}
