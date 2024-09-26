import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { useRouter } from 'next/router';

import LoginWrapper from './components/LoginWrapper';
import SignForm from './components/SignForm';
import VerifyProgress from './components/VerifyProgress';

import '@/assets/css/global.css';

import Logo from '@/assets/images/fastapi-logo.svg';
import { Body_login_login_access_token as AccessToken } from '@/client/models/Body_login_login_access_token';
import EmptyLayout from '@/layouts/empty';

const Login: React.FC = () => {
	const router = useRouter();

	const [disableSubmit, setDisableSubmit] = useState(true);

	const { register, handleSubmit } = useForm<AccessToken>({
		defaultValues: {
			username: 'admin',
			password: 'admin123456'
		}
	});

	const onSubmit = async (data: AccessToken) => {
		if (disableSubmit) return;

		return new Promise((resolve, reject) => {
			// fake submission
			setTimeout(() => {
				if (data.username === 'admin' && data.password === 'admin123456') {
					resolve(true);
					toast('Welcome, have a nice day.'); // 这个可以替换为 NextUI 的 Toast 组件
					setTimeout(() => {
						router.push('/article/qianziwen');
					}, 800);
				} else {
					toast('Wrong username or password.'); // 这个可以替换为 NextUI 的 Toast 组件
					reject('Wrong username or password.');
				}
			}, 800);
		});
	};

	return (
		<EmptyLayout>
			<LoginWrapper>
				<>
					<Image alt="FastAPI logo" height={65} src={Logo} width={352} priority />
					<Input {...register('username')} placeholder="Email" type="text" fullWidth />
					<SignForm register={register} />
					<VerifyProgress setDisableSubmit={setDisableSubmit} />
					<Button color="primary" disabled={disableSubmit} onClick={handleSubmit(onSubmit)}>
						Log In
					</Button>
				</>
			</LoginWrapper>
		</EmptyLayout>
	);
};

export default Login;
