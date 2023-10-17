import React, { useEffect } from 'react';
import { useUserStore } from './stores/user/user.store';

export const useAppMount = () => {
	useEffect(() => {
		requestUserPermission();
	}, []);
};

const requestUserPermission = () => {
	const { dispatchInitialized, isLogin } = useUserStore.getState();
	if (!isLogin) {
		// 로그인 페이지로 리다이렉트
		console.log('HRERE');
	} else {
		// 대시보드로 리다이렉트
	}
	dispatchInitialized(true);
};
