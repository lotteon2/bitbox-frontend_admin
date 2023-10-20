import APIService from '../../libs/core/api/APIService';
import {
	CreateAdminParams,
	CreateAdminResponseData,
	GetAdminInfoResponseData,
	UpdateAdminInfoParams,
} from './adminAPIService.types';

// TODO : 추후 BASE_URL 변경
const BASE_URL = 'http://localhost:8000/admin-service/admin';

class AdminAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createAdmin(classId: number, params: CreateAdminParams) {
		const { data } = await this.post<CreateAdminResponseData>(classId.toString(), params);
		return data;
	}

	async getAllAdmin() {
		const { data } = await this.get<GetAdminInfoResponseData[]>('');
		return data;
	}

	async updateAdmin(adminId: string, params: UpdateAdminInfoParams) {
		const { data } = await this.patch<boolean>(`/${adminId}`, params);
		return data;
	}

	async getMyAdminInfo() {
		const { data } = await this.get<GetAdminInfoResponseData>('/one');
		return data;
	}
}

export const adminApi: AdminAPIService = AdminAPIService.shared();
