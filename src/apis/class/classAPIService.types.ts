interface ApiResponse<T> {
	isSuccess: boolean;
	code: number;
	message: string;
	result: T;
}

export interface CreateClassParams {
	className: string;
	classCode: string;
}

export interface CreateClassResponseData {
	classId: number;
}

export type CreateClassResponse = ApiResponse<CreateClassResponseData>;

export interface GetClassParams {
	classId: number;
}

export interface GetClassResponseData {
	classId: number;
	className: string;
	classCode: string;
	createdAt: string;
	deleted: false;
	graduated: false;
}

export type GetClassReponse = ApiResponse<GetClassResponseData[]>;

export interface UpdateClassParams {
	className?: string;
	isGraduate?: boolean;
	isDeleted?: boolean;
}

// boolean일지 추가될 지 아직 모름!
export interface UpdateClassResponseData {}

export type UpdateClassResponse = ApiResponse<UpdateClassResponseData[]>;
