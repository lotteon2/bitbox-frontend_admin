import { classInfoResponse } from '../../apis/admin/adminAPIService.types';
import { AUTHORITY } from '../../constants/AuthorityType';

export interface UserState {
	isLogin: boolean;
	isFirstLogin: boolean;
	name: string;
	authority: keyof typeof AUTHORITY;
	initialized: boolean;
	profileImg: string;
	email: string;
	myClasses: classInfoResponse[];
	myClassesOption: { value: number; label: string }[];
}

export interface UserStateDispatcher extends UserState {
	dispatchIsFirstLogin: (value: boolean) => void;
	dispatchIsLogin: (value: boolean) => void;
	dispatchName: (value: string) => void;
	dispatchAuthority: (value: keyof typeof AUTHORITY) => void;
	dispatchInitialized: (value: boolean) => void;
	dispatchProfileImg: (value: string) => void;
	dispatchEmail: (value: string) => void;
	dispatchMyClassees: (value: classInfoResponse[]) => void;
	dispatchMyClassesOption: (value: { value: number; label: string }[]) => void;
}
