import { useState } from 'react';
import { authApi } from '../../apis/auth/authAPIService';

export const useLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const onFinish = async () => {
		console.log(email, password);
		await authApi.localLogin({ email, password }).then((res) => console.log(res));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return {
		email,
		setEmail,
		password,
		setPassword,
		onFinish,
		onFinishFailed,
	};
};
