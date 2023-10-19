import APIService from '../../libs/core/api/APIService';
import {
	CreateExamParams,
	CreateExamResponseData,
	GetExamResponseData,
	UpdateExamParams,
} from './examAPIService.typex';

const BASE_URL = 'http://localhost:9999/admin/exam';

class ExamAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createExam(params: CreateExamParams) {
		const { data } = await this.post<CreateExamResponseData>('', params);
		return data;
	}

	async updateExam(examId: number, params: UpdateExamParams) {
		const { data } = await this.patch<boolean>(`${examId}`, params);
		return data;
	}

	async getExamsByClassId(classId: number) {
		const { data } = await this.get<GetExamResponseData[]>(`${classId}`);
		return data;
	}
}

export const examApi: ExamAPIService = ExamAPIService.shared();
