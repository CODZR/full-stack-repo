import Head from 'next/head';

import { Providers } from './components/ChakraProvider';
import ToastContainer from '@/components/MyToast';

export const metadata = {
	title: 'Health grow client',
	description: 'Health grow website'
};

interface Props {
	title?: string;
	description?: string;
	children: JSX.Element;
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
