import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TopHeader from '../components/common/TopHeader';
import { useUserStore } from '../stores/user/user.store';

export default function MainLayout() {
	const navigate = useNavigate();
	const [isLogin, isFirstLogin] = useUserStore((state) => [state.isLogin, state.isFirstLogin]);

	useEffect(() => {
		if (!isLogin) {
			if (!isFirstLogin) {
				navigate('/first');
			} else navigate('/login');
		}
	}, [isLogin, isFirstLogin, navigate]);

	return (
		<div className="w-full h-screen flex flex-row scrollbar-hide">
			<div className="w-[300px] sm:w-[200px] lg:w-[300px] h-full font-regular lg:text-3xl sm:text-sm">
				<Header />
			</div>
			<div className="w-full h-full">
				<TopHeader />
				<Outlet />
			</div>
		</div>
	);
}
