import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../apis/auth/authAPIService';
import { useUserStore } from '../../stores/user/user.store';
import { GetLoginResponseData } from '../../apis/auth/authAPIService.types';
import { Toast } from '../../components/common/Toast';

export const useLogin = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLogin, dispatchIsLogin, dispatchAuthority, isFirstLogin, dispatchIsFirstLogin] = useUserStore((state) => [
		state.isLogin,
		state.dispatchIsLogin,
		state.dispatchAuthority,
		state.isFirstLogin,
		state.dispatchIsFirstLogin,
	]);

	const onFinish = async () => {
		console.log(email, password);
		await authApi
			.localLogin({ email, password })
			.then((res: GetLoginResponseData) => {
				console.log(res);
				dispatchIsLogin(true);
				dispatchAuthority(res.authority);
				dispatchIsFirstLogin(res.firstLogin);
				if (!isFirstLogin) {
					navigate('/first');
				}
			})
			.catch((err) => {
				console.error(err);
				Toast(false, '아이디 비밀번호를 다시 확인해주세요');
			});
	};

	return {
		isLogin,
		email,
		setEmail,
		password,
		setPassword,
		onFinish,
	};
};
