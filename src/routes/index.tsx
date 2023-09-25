import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import DashBoard from '../pages/DashBoard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <NotFound />,
		children: [{ index: true, path: '', element: <DashBoard /> }],
	},
	{
		path: '/multi',
		element: <MainLayout />,
		errorElement: <NotFound />,
		children: [{ index: true, path: '', element: <DashBoard /> }],
	},
	{
		path: '/etc',
		element: <MainLayout />,
		errorElement: <NotFound />,
		children: [
			{ path: 'attendance', element: <DashBoard /> },
			{ path: 'request', element: <DashBoard /> },
			{ path: 'score', element: <DashBoard /> },
		],
	},
]);

export default router;
