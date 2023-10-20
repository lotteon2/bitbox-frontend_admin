import { useRef, useEffect } from 'react';
import { createQueryClient } from './libs/core/react-query/core';
import { useUserStore } from './stores/user/user.store';

export const useAppMount = () => {
	const queryClientRef = useRef(createQueryClient());
	// const [isLogin, dispatchIsLogin] = useUserStore((state) => [state.isLogin, state.dispatchIsLogin]);
	requestUserPermission();

	return {
		queryClientRef,
		useAppMount,
	};
};

export const requestUserPermission = () => {
	const { dispatchInitialized } = useUserStore.getState();
	dispatchInitialized(true);
};
