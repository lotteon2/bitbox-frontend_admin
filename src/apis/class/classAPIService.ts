import APIService from '../../libs/core/api/APIService';
import {
	CreateClassParams,
	CreateClassResponse,
	GetClassParams,
	GetClassReponse,
	UpdateClassParams,
	UpdateClassResponse,
} from './classAPIService.types';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:9999/admin/class';

class ClassAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createClass(params: CreateClassParams) {
		const { data } = await this.post<CreateClassResponse>('', params);
		return data;
	}

	async getClasses(params: GetClassParams) {
		const { data } = await this.get<GetClassReponse>(`?classId=${params.classId}`);
		return data;
	}

	// class 삭제, 수정
	async updateClasses(classId: number, params: UpdateClassParams) {
		const { data } = await this.get<UpdateClassResponse>(`${classId}`, params);
	}
}
export const classApi: ClassAPIService = ClassAPIService.shared();
