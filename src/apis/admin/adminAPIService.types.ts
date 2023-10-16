import { APIResponse } from '../../libs/core/api';

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

export type CreateAdminResponse = APIResponse<CreateAdminResponseData>;

export interface GetAllAdminResponseData {
	adminId: number;
	adminEmail: string;
	adminName: string;
	adminProfileImg: string;
	adminAuthority: string;
	classInfoResponses: { classId: number; className: string; classCdoe: string }[];
}

export type GetAllAdminResponse = APIResponse<GetAllAdminResponseData[]>;

export interface UpdateAdminInfoParams {
	adminProfileImg?: string;
	adminName?: string;
	adminPassword?: string;
	isDeleted?: boolean;
}
