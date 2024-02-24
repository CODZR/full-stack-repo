'use client';

import { useOnceEffect } from '@/hooks/useHooks';
import Layout from '@/layout';
import { ROUTE_PATH_MAP } from '@/models/global/constants';
import { useRouter } from 'next/router';

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
