import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import DashBoard from '../pages/DashBoard/DashBoard';
import Student from '../pages/multi/Student/Student';
import Manager from '../pages/multi/Manager/Manager';
import Class from '../pages/multi/Class/Class';
import Attendance from '../pages/etc/Attendance/Attendance';
import Score from '../pages/etc/Score/Score';
import LoginLayout from '../layouts/LoginLayout';
import Login from '../pages/Login/Login';
import Exam from '../pages/etc/Exam/Exam';
import FirstLogin from '../pages/FirstLogin/FirstLogin';
import Request from '../pages/etc/Request/Request';

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
		children: [
			{ path: 'student', element: <Student /> },
			{ path: 'manager', element: <Manager /> },
			{ path: 'class', element: <Class /> },
		],
	},
	{
		path: '/etc',
		element: <MainLayout />,
		errorElement: <NotFound />,
		children: [
			{ path: 'attendance', element: <Attendance /> },
			{ path: 'request', element: <Request /> },
			{ path: 'score', element: <Score /> },
			{ path: 'exam', element: <Exam /> },
		],
	},
	{
		path: '/login',
		element: <LoginLayout />,
		errorElement: <NotFound />,
		children: [{ index: true, path: '', element: <Login /> }],
	},
	{
		path: '/first',
		element: <LoginLayout />,
		errorElement: <NotFound />,
		children: [{ index: true, path: '', element: <FirstLogin /> }],
	},
]);

export default router;
