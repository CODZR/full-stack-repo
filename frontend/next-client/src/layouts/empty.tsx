import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

export const metadata = {
	title: 'Health grow client',
	description: 'Health grow website'
};

interface Props {
	title?: string;
	description?: string;
	children?: JSX.Element;
}

export default function EmptyLayout(props: Props) {
	const { title, description, children } = props;

	return (
		<main>
			<Head>
				<title>{title || metadata.title}</title>
				<meta content={description || metadata.description} name="description" />
			</Head>
			{children}
			<ToastContainer />
		</main>
	);
}
