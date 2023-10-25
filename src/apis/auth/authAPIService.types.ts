import { AUTHORITY } from '../../constants/AuthorityType';

export interface LoginParams {
	email: string;
	password: string;
}

export interface LoginResponseData {
	accessToken: string;
	authority: keyof typeof AUTHORITY;
	firstLogin: boolean;
}

export interface CreateInviteStudentParams {
	email: string;
	classId: number;
	classCode: string;
	className: string;
}

export interface GetAllInvitedStudentsResponseData {
	classCode: string;
	className: string;
	email: string;
}
