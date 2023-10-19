import { useRef, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { createQueryClient } from './libs/core/react-query/core';
import { useUserStore } from './stores/user/user.store';

export const useAppMount = () => {
	const queryClientRef = useRef(createQueryClient());

	// const navigate = useNavigate();
	// useEffect(() => {
	// 	requestUserPermission(navigate);
	// }, [navigate]);

	return {
		queryClientRef,
		useAppMount,
	};
};

export const requestUserPermission = (navigate: NavigateFunction) => {
	const { dispatchInitialized, isLogin } = useUserStore.getState();
	if (!isLogin) {
		// navigate('/login');
	} else {
		// 유저 정보 받아오기
	}
	dispatchInitialized(true);
};
