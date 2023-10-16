import APIService from '../../libs/core/api/APIService';
import { CreateAdminParams, CreateAdminResponse, GetAllAdminResponseData } from './adminAPIService.types';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:9999/admin';

class AdminAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createAdmin(params: CreateAdminParams) {
		const { data } = await this.post<CreateAdminResponse>('', params);
		return data;
	}

	async getAllAdmin() {
		const { data } = await this.get<GetAllAdminResponseData[]>('');
		return data;
	}
}

export const adminApi: AdminAPIService = AdminAPIService.shared();
