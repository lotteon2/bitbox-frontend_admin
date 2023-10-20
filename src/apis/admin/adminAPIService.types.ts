import { AUTHORITY } from '../../constants/AuthorityType';

export interface CreateAdminParams {
	adminEmail: string;
	adminProfile?: string;
	adminAuthority: string;
	adminName: string;
}

// TODO : 타입 변경 확실치않음
export interface CreateAdminResponseData {
	uuid: string;
}

export interface GetAdminInfoResponseData {
	adminId: string;
	adminEmail: string;
	adminName: string;
	adminProfileImg: string;
	adminAuthority: keyof typeof AUTHORITY;
	classInfoResponses: { classId: number; className: string; classCdoe: string }[];
}

export interface UpdateAdminInfoParams {
	adminProfileImg?: string;
	adminName?: string;
	adminPassword?: string;
	isDeleted?: boolean;
}
