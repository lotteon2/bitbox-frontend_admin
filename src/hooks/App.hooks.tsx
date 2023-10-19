import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/user/user.store';

export const requestUserPermission = (navigate: NavigateFunction) => {
	const { dispatchInitialized, isLogin } = useUserStore.getState();
	if (!isLogin) {
		navigate('/login');
	} else {
		// 유저 정보 받아오기
	}
	dispatchInitialized(true);
};

export const useAppMount = () => {
	const navigate = useNavigate();
	useEffect(() => {
		requestUserPermission(navigate);
	}, [navigate]);
};
