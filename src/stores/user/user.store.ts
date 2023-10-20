import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { UserState, UserStateDispatcher } from './user.types';
import { AUTHORITY } from '../../constants/AuthorityType';
import { classInfoResponse } from '../../apis/admin/adminAPIService.types';

const initialState: UserState = {
	isFirstLogin: true,
	isLogin: !!localStorage.getItem('accessToken'),
	name: '',
	authority: AUTHORITY.GENERAL,
	initialized: false,
	profileImg: '',
	email: '',
	myClasses: [],
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
		dispatchProfileImg: (value: string) => {
			set({ profileImg: value });
		},
		dispatchEmail: (value: string) => {
			set({ email: value });
		},
		dispatchMyClassees: (value: classInfoResponse[]) => {
			set({ myClasses: value });
		},
	})),
);
