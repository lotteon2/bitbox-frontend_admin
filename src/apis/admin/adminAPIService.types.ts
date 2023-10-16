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
	adminId: string;
	adminEmail: string;
	adminName: string;
	adminProfileImg: string;
	adminAuthority: string;
}

export type GetAllAdminResponse = APIResponse<GetAllAdminResponseData[]>;
