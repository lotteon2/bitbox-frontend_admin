import { GetClassResponseData } from '../class/classAPIService.types';

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
	examName: string;
	perfectScroe: number;
	classes: GetClassResponseData;
	examId: number;
	perfectScore: number;
	deleted: boolean;
	grades: [];
}
