import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Center,
	Container,
	FormControl,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Link as ChakraLink,
	Toast,
	useBoolean
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Image from 'next/image';
import NextRouterLink from 'next/link';
import { useRouter } from 'next/router';

import '@/assets/css/global.css';

import Logo from '@/assets/images/fastapi-logo.svg';
import { Body_login_login_access_token as AccessToken } from '@/client/models/Body_login_login_access_token';
import Layout from '@/layout';

import styles from './index.module.less';

const Login: React.FC = () => {
	const router = useRouter();
	const toast = useToast();

	const [show, setShow] = useBoolean();
	const [progressPercent, setProgressPercent] = useState(0);
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [animationStyle, setAnimationStyle] = useState<any>({});

	const timerId = useRef<any>(null);
	const nextPercent = useRef(0);
	const verifyBoxRef = useRef<any>(null);

	const { register, handleSubmit } = useForm<AccessToken>({
		defaultValues: {
			username: 'admin',
			password: 'admin123456'
		}
	});

	const setupProgress = (increment: boolean) => {
		if (progressPercent === 100) {
			return;
		}

		timerId.current = setTimeout(() => {
			setProgressPercent((percent) => {
				const step = increment ? 1 : -2;
				nextPercent.current = percent + step;

				if (nextPercent.current < 0) {
					nextPercent.current = 0;
				} else if (nextPercent.current > 100) {
					nextPercent.current = 100;
				}
				return nextPercent.current;
			});

			if (nextPercent.current === 0 || nextPercent.current === 100) {
				clearInterval(timerId.current);
				setDisableSubmit(nextPercent.current === 0 ? true : false);
			} else {
				setupProgress(increment);
			}
		}, 25);
	};

	const onVerifyMouseDown = () => {
		const animationTime = 2500 * (1 - progressPercent / 100);
		verifyBoxRef.current.style.animation = `${animationTime}ms ease 0s 1 normal none running textColorInvert`;
		clearInterval(timerId.current);
		setupProgress(true);
	};

	const onVerifyMouseUp = () => {
		if (progressPercent === 100) {
			verifyBoxRef.current.style.color = '#fff';
			return;
		}

		const animationTime = 2500 * (progressPercent / 100);
		verifyBoxRef.current.style.animation = `${animationTime}ms ease 0s 1 normal none running textColorIReverse`;
		clearInterval(timerId.current);
		setupProgress(false);
	};

	const onSubmit: SubmitHandler<AccessToken> = async (data) => {
		if (disableSubmit) return;

		if (data.username === 'admin' && data.password === 'admin123456') {
			toast({ status: 'success', title: 'Welcome to health grow system.' });
			router.push('/article/qianziwen');
		} else {
			toast({ status: 'error', title: 'Wrong username or password.' });
		}
		// const response = await LoginService.loginAccessToken({
		// 	formData: data
		// });
		// localStorage.setItem('access_token', response.access_token);
	};

	return (
		<Layout>
			<Container centerContent>
				<Container
					alignItems="stretch"
					as="form"
					gap={4}
					w={500}
					h="100vh"
					justifyContent="center"
					maxW="sm"
					centerContent
					onSubmit={handleSubmit(onSubmit)}
				>
					<Image priority width={352} height={65} alt="FastAPI logo" src={Logo} />
					<FormControl mt={8} id="email">
						<Input {...register('username')} placeholder="Email" type="text" />
					</FormControl>
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
					<div className={styles.verifyWrapper} onMouseDown={onVerifyMouseDown} onMouseUp={onVerifyMouseUp}>
						<div className={styles.verifyTrigger} style={{ width: progressPercent + '%' }} />
						<div ref={verifyBoxRef} className={styles.verifyBox}>
							Press &amp; Hold until verified
						</div>
					</div>
					<Button
						_focus={{ bg: 'ui.main' }}
						_hover={{ opacity: 0.8, cursor: disableSubmit ? 'not-allowed' : 'pointer' }}
						opacity={disableSubmit ? 0.8 : 1}
						bg="ui.main"
						color="white"
						disabled={disableSubmit}
						type="submit"
					>
						Log In
					</Button>
				</Container>
			</Container>
		</Layout>
	);
};

export default Login;
