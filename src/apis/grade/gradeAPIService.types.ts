import APIService from '../../libs/core/api/APIService';
import { GetGradesResponseData } from './gradeAPIService';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:8000/admin-service/admin/grade';

class GradeAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async getGradesByClassId(classId: number) {
		const { data } = await this.get<GetGradesResponseData[]>(`class/${classId}`);
		return data;
	}
}

export const gradeApi: GradeAPIService = GradeAPIService.shared();
