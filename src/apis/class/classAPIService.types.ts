import { APIResponse } from '../../libs/core/api';

export interface CreateClassParams {
	className: string;
	classCode: number;
}

export interface CreateClassResponseData {
	classId: number;
}

export interface GetClassResponseData {
	classId: number;
	className: string;
	classCode: number;
	createdAt: string;
	deleted: false;
	graduated: false;
}

// export type GetClassReponse = APIResponse<GetClassResponseData[]>;

export interface UpdateClassParams {
	className?: string;
	isGraduate?: boolean;
	isDeleted?: boolean;
}

// // boolean일지 추가될 지 아직 모름!
// export interface UpdateClassResponseData {}

// export type UpdateClassResponse = APIResponse<UpdateClassResponseData[]>;
