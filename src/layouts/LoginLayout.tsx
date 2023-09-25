import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
	return (
		<div className="w-[1920px] h-[100%]">
			<Outlet />
		</div>
	);
}
