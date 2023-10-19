import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
	return (
		<div className="w-[1920px] h-screen flex justify-center items-center">
			<Outlet />
		</div>
	);
}
