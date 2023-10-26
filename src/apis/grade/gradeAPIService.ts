import APIService from '../../libs/core/api/APIService';
import { GetGradesResponseDataForDashBoard, GetGradesResponseDataByExamId } from './gradeAPIService.types';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:8000/admin-service/admin/grade';

class GradeAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	// 대시 보드용
	async getGradesByClassId(classId: number) {
		const { data } = await this.get<GetGradesResponseDataForDashBoard[]>(`class/${classId}`);
		return data;
	}

	async getGradesByExamId(examId: number) {
		const { data } = await this.get<GetGradesResponseDataByExamId[]>(`/exam/${examId}`);
		return data;
	}
}

export const gradeApi: GradeAPIService = GradeAPIService.shared();
