export interface CreateExamParams {
	classId: number;
	examName: string;
	perfectScore: number;
}

export interface CreateExamResponseData {
	examId: number;
}

export interface UpdateExamParams {
	examName?: string;
	perfectScore?: number;
	isDeleted?: boolean;
}

export interface GetExamResponseData {
	examId: number;
	examName: string;
	avg: number;
	className: string;
	perfectScore: number;
}
