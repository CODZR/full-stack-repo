import { useState } from 'react';
import { Input } from '@nextui-org/input';
import Image from 'next/image';

import EyeSvg from '@/assets/images/eye.svg';
import EyeOffSvg from '@/assets/images/eye-off.svg';

interface Props {
	register: any;
}

const SignForm = (props: Props) => {
	const { register } = props;
	const [show, setShow] = useState(false);

	return (
		<Input
			{...register('password')}
			css={{ width: '100%' }}
			label="Password"
			placeholder="Password"
			endContent={
				<>
					{show ? (
						<Image alt="eye off svg" src={EyeOffSvg} onClick={() => setShow(true)} />
					) : (
						<Image alt="eye svg" src={EyeSvg} onClick={() => setShow(false)} />
					)}
				</>
			}
			type={show ? 'text' : 'password'}
		/>
	);
};

export default SignForm;
