import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
	useBoolean,
	FormControl,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Center
} from '@chakra-ui/react';

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
						{show ? <ViewOffIcon /> : <ViewIcon />}
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
