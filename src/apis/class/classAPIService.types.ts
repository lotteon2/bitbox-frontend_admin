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
	classCode: string;
	createdAt: string;
	deleted: false;
	graduated: false;
	adminInfos: { adminEmail: string; adminName: string; adminProfileImg: string }[];
}

export interface UpdateClassParams {
	className?: string;
	isGraduate?: boolean;
	isDeleted?: boolean;
}
