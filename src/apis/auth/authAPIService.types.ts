import { AUTHORITY } from '../../constants/AuthorityType';

export interface GetLoginParams {
	email: string;
	password: string;
}

export interface GetLoginResponseData {
	accessToken: string;
	authority: keyof typeof AUTHORITY;
	firstLogin: boolean;
}

export interface CreateInviteStudenParams {
	email: string;
	classId: number;
	classCode: string;
	className: string;
}
