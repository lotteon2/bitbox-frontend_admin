import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/common/Toast';
import { adminApi } from '../../apis/admin/adminAPIService';
import { useUserStore } from '../../stores/user/user.store';

export const useFirstLogin = () => {
	const navigate = useNavigate();

	const [password, setPassword] = useState<string>('');
	const [checkPassword, setCheckPassword] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [isFirstLogin, dispatchIsFirstLogin] = useUserStore((state) => [
		state.isFirstLogin,
		state.dispatchIsFirstLogin,
	]);

	const onFinish = async () => {
		console.log(password, checkPassword);
		if (password !== checkPassword) {
			Toast(false, '입력한 두 비밀번호가 달라요.');
		} else {
			await adminApi
				.updateMyAdminInfo({
					adminPassword: password,
				})
				.then((res) => {
					dispatchIsFirstLogin(false);
					navigate('/');
					Toast(true, '비밀번호가 수정되었어요.');
				});
		}
	};

	useEffect(() => {
		if (!password || !checkPassword) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [password, checkPassword]);

	return {
		password,
		setPassword,
		checkPassword,
		setCheckPassword,
		onFinish,
		isDisabled,
		isFirstLogin,
	};
};
