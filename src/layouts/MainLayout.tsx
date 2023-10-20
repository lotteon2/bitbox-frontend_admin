import React, { useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TopHeader from '../components/common/TopHeader';
import { useUserStore } from '../stores/user/user.store';
import { adminApi } from '../apis/admin/adminAPIService';

export default function MainLayout() {
	const navigate = useNavigate();
	const [isLogin, dispatchAuthority, isFirstLogin, dispatchProfileImg, dispatchName, dispatchEmail] = useUserStore(
		(state) => [
			state.isLogin,
			state.dispatchAuthority,
			state.isFirstLogin,
			state.dispatchProfileImg,
			state.dispatchName,
			state.dispatchEmail,
		],
	);

	const getMyInfo = useCallback(async () => {
		// TODO : 내 정보 초기화
		await adminApi.getMyAdminInfo().then((res) => {
			dispatchName(res.adminName);
			dispatchProfileImg(res.adminProfileImg);
			dispatchEmail(res.adminEmail);
			dispatchAuthority(res.adminAuthority);
		});
	}, [dispatchAuthority, dispatchEmail, dispatchName, dispatchProfileImg]);

	useEffect(() => {
		if (!isLogin) {
			if (!isFirstLogin) {
				navigate('/first');
			} else navigate('/login');
		} else {
			getMyInfo();
		}
	}, [isLogin, isFirstLogin, navigate, getMyInfo]);

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
