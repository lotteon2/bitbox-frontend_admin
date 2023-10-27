import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../apis/auth/authAPIService';
import { useUserStore } from '../../stores/user/user.store';
import { LoginResponseData } from '../../apis/auth/authAPIService.types';
import { Toast } from '../../components/common/Toast';
import { useLoginMutation } from '../../mutations/useLoginMutation';

export const useLogin = () => {
	const navigate = useNavigate();
	const { mutateAsync } = useLoginMutation();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLogin, dispatchIsLogin, dispatchAuthority, dispatchIsFirstLogin] = useUserStore((state) => [
		state.isLogin,
		state.dispatchIsLogin,
		state.dispatchAuthority,
		state.dispatchIsFirstLogin,
	]);

	const onFinish = async () => {
		console.log(email, password);
		fetch('https://bitbox.kro.kr/authentication-service/auth/admin', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				// 'Content-Type': 'application/json',
				'application/x-www-form-urlencoded': 'charset=UTF-8',
			},
			credentials: 'include',
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => {
				console.log(origin);
				console.log(res.headers.get('set-cookie')); // undefined
				console.log(document.cookie); // nope
				return res.json();
			})
			.then((json) => {
				console.log(json);
			});

		// // refresh 요청
		// const response = await axios.post(
		// 	BASE_URL + "/authentication-service/auth/refresh",
		// 	{},
		// 	{
		// 	  headers: {
		// 		Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		// 	  },
		// 	}
		//   );

		// fetch('https://bitbox.kro.kr/authentication-service/auth/refresh', {
		// 	method: 'POST',

		// 	headers: {
		// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		// 	},

		// 	credentials: 'include',
		// 	body: JSON.stringify({
		// 		email,
		// 		password,
		// 	}),
		// })
		// 	.then((res) => {
		// 		console.log(origin);
		// 		console.log(res.headers.get('set-cookie')); // undefined
		// 		console.log(document.cookie); // nope
		// 		return res.json();
		// 	})
		// 	.then((json) => {
		// 		console.log(json);
		// 	});

		await mutateAsync({ email, password })
			.then((res: LoginResponseData) => {
				console.log(res);
				dispatchIsLogin(true);
				dispatchAuthority(res.authority);
				dispatchIsFirstLogin(res.firstLogin);
				localStorage.setItem('accessToken', res.accessToken);
				Toast(true, '로그인에 성공하였어요!');
				// if (res.firstLogin) {
				// 	navigate('/first');
				// }
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
