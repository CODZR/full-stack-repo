import Head from 'next/head';

import { Providers } from './components/ChakraProvider';
import ToastContainer from '@/components/base/MyToast';
import Navbar from './components/Navbar';

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
					{children}
				</>
			</Providers>
			<ToastContainer />
		</main>
	);
}
