import React, { useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TopHeader from '../components/common/TopHeader';
import { useUserStore } from '../stores/user/user.store';
import { adminApi } from '../apis/admin/adminAPIService';
import { classInfoResponse } from '../apis/admin/adminAPIService.types';

export default function MainLayout() {
	const navigate = useNavigate();
	const [
		isLogin,
		dispatchAuthority,
		isFirstLogin,
		dispatchProfileImg,
		dispatchName,
		dispatchEmail,
		dispatchMyClassees,
		dispatchMyClassesOption,
	] = useUserStore((state) => [
		state.isLogin,
		state.dispatchAuthority,
		state.isFirstLogin,
		state.dispatchProfileImg,
		state.dispatchName,
		state.dispatchEmail,
		state.dispatchMyClassees,
		state.dispatchMyClassesOption,
	]);

	const getMyInfo = useCallback(async () => {
		await adminApi.getMyAdminInfo().then((res) => {
			dispatchName(res.adminName);
			dispatchProfileImg(res.adminProfileImg);
			dispatchEmail(res.adminEmail);
			dispatchAuthority(res.adminAuthority);
			dispatchMyClassees(res.classInfoResponses);
			const temp: { value: number; label: string }[] = [];
			res.classInfoResponses.forEach((it: classInfoResponse) => {
				temp.push({ value: it.classId, label: it.className });
			});
			dispatchMyClassesOption([...temp]);
		});
	}, [dispatchAuthority, dispatchEmail, dispatchMyClassees, dispatchMyClassesOption, dispatchName, dispatchProfileImg]);

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
