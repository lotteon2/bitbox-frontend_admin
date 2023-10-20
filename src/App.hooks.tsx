import { useRef } from 'react';
import { createQueryClient } from './libs/core/react-query/core';
import { useUserStore } from './stores/user/user.store';

export const useAppMount = () => {
	const queryClientRef = useRef(createQueryClient());
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
