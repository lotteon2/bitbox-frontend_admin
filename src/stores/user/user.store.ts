import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { UserState, UserStateDispatcher } from './user.types';
import { AUTHORITY } from '../../constants/AuthorityType';

const initialState: UserState = {
	isLogin: true,
	name: '',
	id: '',
	authority: AUTHORITY.GENERAL,
	initialized: false,
};

export const useUserStore = create(
	immer<UserStateDispatcher>((set) => ({
		...initialState,
		dispatchIsLogin: (value: boolean) => {
			set({ isLogin: value });
		},
		dispatchName: (value: string) => {
			set({ name: value });
		},
		dispatchId: (value: string) => {
			set({ id: value });
		},
		dispatchAuthority: (value: keyof typeof AUTHORITY) => {
			set({ authority: value });
		},
		dispatchInitialized: (value: boolean) => {
			set({ initialized: value });
		},
	})),
);
