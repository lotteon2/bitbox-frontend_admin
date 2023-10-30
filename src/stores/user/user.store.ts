import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserState, UserStateDispatcher } from './user.types';
import { AUTHORITY } from '../../constants/AuthorityType';
import { classInfoResponse } from '../../apis/admin/adminAPIService.types';

const UserStorageKey = 'user-storage';

const initialState: UserState = {
	isFirstLogin: true,
	isLogin: !!localStorage.getItem('accessToken'),
	name: '',
	authority: AUTHORITY.GENERAL,
	initialized: false,
	profileImg: '',
	email: '',
	myClasses: [],
	myClassesOption: [],
};

export const useUserStore = create(
	persist<UserStateDispatcher>(
		(set) => ({
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
			dispatchMyClassesOption: (value: { value: number; label: string }[]) => {
				set({ myClassesOption: value });
			},
		}),
		{
			name: UserStorageKey,
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
