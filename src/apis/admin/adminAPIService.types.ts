import { AUTHORITY } from '../../constants/AuthorityType';

export interface CreateAdminParams {
	adminEmail: string;
	adminProfile?: string;
	adminAuthority: string;
	adminName: string;
}

export interface CreateAdminResponseData {
	uuid: string;
}

export type classInfoResponse = {
	classId: number;
	className: string;
	classCode: string;
	exams: {
		examId: number;
		examName: string;
		perfectScore: string;
	}[];
};

export interface GetAdminInfoResponseData {
	adminId: string;
	adminEmail: string;
	adminName: string;
	adminProfileImg: string;
	adminAuthority: keyof typeof AUTHORITY;
	classInfoResponses: classInfoResponse[];
}

export interface UpdateAdminInfoParams {
	adminProfileImg?: string;
	adminName?: string;
	adminPassword?: string;
	isDeleted?: boolean;
}
