import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import TopHeader from '../components/common/TopHeader';

export default function MainLayout() {
	return (
		<div className="w-full h-screen flex flex-row scrollbar-hide">
			<div className="w-[300px] h-full font-regular text-3xl">
				<Header />
			</div>
			<div className="w-full h-full">
				<TopHeader />
				<Outlet />
			</div>
		</div>
	);
}
