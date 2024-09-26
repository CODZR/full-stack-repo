import { Card } from '@nextui-org/card';

import { Flex } from '@/components';

interface Props {
	children: JSX.Element;
}

const LoginWrapper = ({ children }: Props) => {
	return (
		<Flex align="center" justify="center" style={{ height: '100vh' }}>
			<Card className="login-card" style={{ width: '500px', padding: '20px' }}>
				{children}
			</Card>
		</Flex>
	);
};

export default LoginWrapper;
