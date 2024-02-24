import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Center, Container, FormControl, Input } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import '@/assets/css/global.css';

import Logo from '@/assets/images/fastapi-logo.svg';
import { Body_login_login_access_token as AccessToken } from '@/client/models/Body_login_login_access_token';
import Layout from '@/layout';

import styles from './index.module.less';
import SignForm from './components/SignForm';
import VerifyProgress from './components/VerifyProgress';
import { MyButton } from '@/components';
import LoginWrapper from './components/LoginWrapper';

const Login: React.FC = () => {
	const router = useRouter();
	const toast = useToast();

	const [disableSubmit, setDisableSubmit] = useState(true);

	const { register, handleSubmit } = useForm<AccessToken>({
		defaultValues: {
			username: 'admin',
			password: 'admin123456'
		}
	});

	const onSubmit: SubmitHandler<AccessToken> = async (data) => {
		if (disableSubmit) return;

		return new Promise((resolve, reject) => {
			// fake submission
			setTimeout(() => {
				if (data.username === 'admin' && data.password === 'admin123456') {
					resolve(true);
					toast({ status: 'success', title: 'Welcome to health grow system.' });
					router.push('/article/qianziwen');
				} else {
					toast({ status: 'error', title: 'Wrong username or password.' });
					reject('Wrong username or password.');
				}
			}, 1200);
		});
		// const response = await LoginService.loginAccessToken({
		// 	formData: data
		// });
		// localStorage.setItem('access_token', response.access_token);
	};

	return (
		<Layout>
			<LoginWrapper>
				<>
					<Image priority width={352} height={65} alt="FastAPI logo" src={Logo} />
					<FormControl mt={8} id="email">
						<Input {...register('username')} placeholder="Email" type="text" />
					</FormControl>
					<SignForm register={register} />
					<VerifyProgress setDisableSubmit={setDisableSubmit} />
					<MyButton disabled={disableSubmit} schema="primary" type="submit" onClick={handleSubmit(onSubmit)}>
						Log In
					</MyButton>
				</>
			</LoginWrapper>
		</Layout>
	);
};

export default Login;
