import { AUTHORITY } from '../../constants/AuthorityType';

export interface UserState {
	isLogin: boolean;
	name: string;
	id: string;
	authority: keyof typeof AUTHORITY;
	initialized: boolean;
}

export interface UserStateDispatcher extends UserState {
	dispatchIsLogin: (value: boolean) => void;
	dispatchName: (value: string) => void;
	dispatchId: (value: string) => void;
	dispatchAuthority: (value: keyof typeof AUTHORITY) => void;
	dispatchInitialized: (value: boolean) => void;
}
