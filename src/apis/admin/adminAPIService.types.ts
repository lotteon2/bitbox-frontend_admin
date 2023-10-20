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

export type classInfoResponse = {
	classId: number;
	className: string;
	classCode: string;
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
