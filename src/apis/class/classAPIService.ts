import APIService from '../../libs/core/api/APIService';
import {
	CreateClassParams,
	CreateClassResponseData,
	GetClassResponseData,
	UpdateClassParams,
} from './classAPIService.types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin-service/admin/class`;

class ClassAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createClass(params: CreateClassParams) {
		const { data } = await this.post<CreateClassResponseData>('', params);
		return data;
	}

	async getClasses() {
		const { data } = await this.get<GetClassResponseData[]>('');
		return data;
	}

	// class 삭제, 수정
	async updateClasses(classId: number, params: UpdateClassParams) {
		const { data } = await this.patch<boolean>(`/${classId}`, params);
		return data;
	}
}
export const classApi: ClassAPIService = ClassAPIService.shared();
