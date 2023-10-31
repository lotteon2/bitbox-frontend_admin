import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/user/user.store';

export default function LoginLayout() {
	const navigate = useNavigate();
	const [isLogin, isFirstLogin] = useUserStore((state) => [state.isLogin, state.isFirstLogin]);

	useEffect(() => {
		console.log(isLogin);
		if (isLogin && !isFirstLogin) {
			navigate('/');
		}
	}, [isLogin, navigate]);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Outlet />
		</div>
	);
}
