import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { UserState, UserStateDispatcher } from './user.types';
import { AUTHORITY } from '../../constants/AuthorityType';

const initialState: UserState = {
	isFirstLogin: true,
	isLogin: !!localStorage.getItem('accessToken'),
	name: '',
	authority: AUTHORITY.GENERAL,
	initialized: false,
};

export const useUserStore = create(
	immer<UserStateDispatcher>((set) => ({
		...initialState,
		dispatchIsFirstLogin: (value: boolean) => {
			set({ isFirstLogin: value });
		},
		dispatchIsLogin: (value: boolean) => {
			set({ isLogin: value });
		},
		dispatchName: (value: string) => {
			set({ name: value });
		},
		dispatchAuthority: (value: keyof typeof AUTHORITY) => {
			set({ authority: value });
		},
		dispatchInitialized: (value: boolean) => {
			set({ initialized: value });
		},
	})),
);
