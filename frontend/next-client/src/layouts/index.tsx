import { useEffect, useState } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import Head from 'next/head';

import { Providers } from './components/ChakraProvider';
import Navbar from './components/Navbar';
import ToastContainer from '@/components/base/MyToast';
import CenterSpinner from './components/Navbar/components/CenterSpinner';

export const metadata = {
	title: 'Health grow client',
	description: 'Health grow website'
};

interface Props {
	showNavbar?: boolean;
	title?: string;
	description?: string;
	children?: JSX.Element;
}

export default function DefaultLayout(props: Props) {
	const { showNavbar = true, title, description, children } = props;

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<main>
			<Head>
				<title>{title || metadata.title}</title>
				<meta content={description || metadata.description} name="description" />
			</Head>
			<Providers>
				{mounted ? (
					<>
						{showNavbar && <Navbar />}
						<Box padding="32px 8px">{children}</Box>
					</>
				) : (
					<CenterSpinner />
				)}
			</Providers>
			<ToastContainer />
		</main>
	);
}
