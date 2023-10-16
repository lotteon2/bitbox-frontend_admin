import APIService from '../../libs/core/api/APIService';
import {
	CreateAdminParams,
	CreateAdminResponse,
	GetAllAdminResponseData,
	UpdateAdminInfoParams,
} from './adminAPIService.types';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:9999/admin';

class AdminAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createAdmin(classId: number, params: CreateAdminParams) {
		const { data } = await this.post<CreateAdminResponse>(classId.toString(), params);
		return data;
	}

	async getAllAdmin() {
		const { data } = await this.get<GetAllAdminResponseData[]>('');
		return data;
	}

	async updateAdmin(params: UpdateAdminInfoParams) {
		const { data } = await this.patch<boolean>('');
		return data;
	}
}

export const adminApi: AdminAPIService = AdminAPIService.shared();
