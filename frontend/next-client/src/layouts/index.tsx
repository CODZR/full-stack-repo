import { Box } from '@chakra-ui/react';
import Head from 'next/head';

import { Providers } from './components/ChakraProvider';
import Navbar from './components/Navbar';
import ToastContainer from '@/components/base/MyToast';

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

	return (
		<main>
			<Head>
				<title>{title || metadata.title}</title>
				<meta content={description || metadata.description} name="description" />
			</Head>
			<Providers>
				<>
					{showNavbar && <Navbar />}
					<Box padding="32px 8px">{children}</Box>
				</>
			</Providers>
			<ToastContainer />
		</main>
	);
}
