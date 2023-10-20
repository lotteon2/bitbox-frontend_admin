import { useRef, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { createQueryClient } from './libs/core/react-query/core';
import { useUserStore } from './stores/user/user.store';
import useMovePage from './hooks/useMovePage';

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
