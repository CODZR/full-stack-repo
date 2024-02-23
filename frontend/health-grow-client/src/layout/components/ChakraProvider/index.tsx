// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

interface Props {
	children: JSX.Element;
}

export function Providers({ children }: Props) {
	return (
		<CacheProvider>
			<ChakraProvider>{children}</ChakraProvider>
		</CacheProvider>
	);
}
