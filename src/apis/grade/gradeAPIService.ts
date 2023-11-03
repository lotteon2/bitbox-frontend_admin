import APIService from '../../libs/core/api/APIService';
import {
	GetGradesResponseDataForDashBoard,
	GetGradesResponseDataByExamId,
	UpdateGradeByGradeIdParams,
} from './gradeAPIService.types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin-service/admin/grade`;

class GradeAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async getGradesByClassId(classId: number) {
		const { data } = await this.get<GetGradesResponseDataForDashBoard[]>(`class/${classId}`);
		return data;
	}

	async getGradesByExamId(examId: number) {
		const { data } = await this.get<GetGradesResponseDataByExamId[]>(`/exam/${examId}`);
		return data;
	}

	async updateGradeByGradeId(gradeId: number, params: UpdateGradeByGradeIdParams) {
		const { data } = await this.patch(`${gradeId}`, params);
		return data;
	}
}

export const gradeApi: GradeAPIService = GradeAPIService.shared();
