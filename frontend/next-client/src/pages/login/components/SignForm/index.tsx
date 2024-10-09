import {
	Center,
	FormControl,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	useBoolean
} from '@chakra-ui/react';

import ViewIcon from './assets/ViewIcon';
import ViewOffIcon from './assets/ViewOffIcon';

interface Props {
	register: any;
}

const SignForm = (props: Props) => {
	const { register } = props;

	const [show, setShow] = useBoolean();

	return (
		<FormControl id="password">
			<InputGroup>
				<Input {...register('password')} placeholder="Password" type={show ? 'text' : 'password'} />
				<InputRightElement
					color="gray.400"
					_hover={{
						cursor: 'pointer'
					}}
					onClick={setShow.toggle}
				>
					<Icon aria-label={show ? 'Hide password' : 'Show password'}>
						{show ? <ViewOffIcon w={16} h={16} /> : <ViewIcon w={16} h={16} />}
					</Icon>
				</InputRightElement>
			</InputGroup>
			<Center>
				{/* <ChakraLink as={NextRouterLink} color="blue.500" href="/recover-password" mt={2}>
			Forgot password?
		</ChakraLink> */}
			</Center>
		</FormControl>
	);
};

export default SignForm;
