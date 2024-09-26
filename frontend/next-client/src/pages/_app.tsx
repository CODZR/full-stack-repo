import { NextUIProvider } from '@nextui-org/system';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import '@/styles/globals.css';

import { fontMono, fontSans } from '@/config/fonts';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider>
				<Component {...pageProps} />
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily
};
