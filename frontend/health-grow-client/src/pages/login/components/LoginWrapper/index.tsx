import { Container } from '@chakra-ui/react';

interface Props {
	children: JSX.Element;
}

const LoginWraper = ({ children }: Props) => {
	return (
		<Container centerContent>
			<Container
				alignItems="stretch"
				as="form"
				gap={4}
				h="100vh"
				justifyContent="center"
				maxW="sm"
				w={500}
				centerContent
			>
				{children}
			</Container>
		</Container>
	);
};

export default LoginWraper;
