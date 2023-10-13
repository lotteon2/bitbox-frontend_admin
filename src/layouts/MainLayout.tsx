import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import TopHeader from '../components/common/TopHeader';

export default function MainLayout() {
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
