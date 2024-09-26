import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormControl, Input, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import LoginWrapper from './components/LoginWrapper';
import SignForm from './components/SignForm';
import VerifyProgress from './components/VerifyProgress';
import { MyButton } from '@/components';

import '@/assets/css/global.css';

import Logo from '@/assets/images/fastapi-logo.svg';
import { Body_login_login_access_token as AccessToken } from '@/client/models/Body_login_login_access_token';
import DefaultLayout from '@/layouts';

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
					toast({ status: 'success', title: 'Welcome, have a nice day.' });
					setTimeout(() => {
						router.push('/article/qianziwen');
					}, 800);
				} else {
					toast({ status: 'error', title: 'Wrong username or password.' });
					reject('Wrong username or password.');
				}
			}, 800);
		});
		// const response = await LoginService.loginAccessToken({
		// 	formData: data
		// });
		// localStorage.setItem('access_token', response.access_token);
	};

	return (
		<DefaultLayout showNavbar={false}>
			<LoginWrapper>
				<>
					<Image alt="FastAPI logo" height={65} src={Logo} width={352} priority />
					<FormControl id="email" mt={8}>
						<Input {...register('username')} placeholder="Email" type="text" />
					</FormControl>
					<SignForm register={register} />
					<VerifyProgress setDisableSubmit={setDisableSubmit} />
					<MyButton disabled={disableSubmit} schema="primary" type="submit" onClick={handleSubmit(onSubmit)}>
						Log In
					</MyButton>
				</>
			</LoginWrapper>
		</DefaultLayout>
	);
};

export default Login;
