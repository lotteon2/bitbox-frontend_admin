import APIService from '../../libs/core/api/APIService';
import {
	CreateClassParams,
	CreateClassResponseData,
	GetClassResponseData,
	UpdateClassParams,
} from './classAPIService.types';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:8000/admin-service/admin/class';

class ClassAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createClass(params: CreateClassParams) {
		const { data } = await this.post<CreateClassResponseData>('', params);
		return data;
	}

	async getClasses(classId: number) {
		const { data } = await this.get<GetClassResponseData[]>(`?classId=${classId}`);
		return data;
	}

	// class 삭제, 수정
	async updateClasses(classId: number, params: UpdateClassParams) {
		const { data } = await this.patch<boolean>(`/${classId}`, params);
		return data;
	}
}
export const classApi: ClassAPIService = ClassAPIService.shared();
