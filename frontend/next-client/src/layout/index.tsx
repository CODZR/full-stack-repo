import Head from 'next/head';

import { Providers } from './components/ChakraProvider';
import ToastContainer from '@/components/base/MyToast';
import { useRef, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useOnceEffect } from '@/hooks/useHooks';
import { ROUTE_PATH_MAP } from '@/models/global/constants';

export const metadata = {
	title: 'Health grow client',
	description: 'Health grow website'
};

interface Props {
	title?: string;
	description?: string;
	children?: JSX.Element;
}

export default function RootLayout(props: Props) {
	const { title, description, children } = props;

	return (
		<main>
			<Head>
				<title>{title || metadata.title}</title>
				<meta content={description || metadata.description} name="description" />
			</Head>
			<Providers>{children}</Providers>
			<ToastContainer />
		</main>
	);
}
