import APIService from '../../libs/core/api/APIService';
import {
	CreateAdminParams,
	CreateAdminResponseData,
	GetAdminInfoResponseData,
	UpdateAdminInfoParams,
} from './adminAPIService.types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/admin-service/admin`;

class AdminAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async createAdmin(classId: number, params: CreateAdminParams) {
		const { data } = await this.post<CreateAdminResponseData>(classId.toString(), params);
		return data;
	}

	async getAllAdmin(classId: number) {
		const { data } = await this.get<GetAdminInfoResponseData[]>(`/${classId}`);
		return data;
	}

	async updateAdmin(adminId: string, params: UpdateAdminInfoParams) {
		const { data } = await this.patch<boolean>(`/${adminId}`, params);
		return data;
	}

	async updateMyAdminInfo(params: UpdateAdminInfoParams) {
		const { data } = await this.patch<boolean>('', params);
		return data;
	}

	async getMyAdminInfo() {
		const { data } = await this.get<GetAdminInfoResponseData>('/one');
		return data;
	}
}

export const adminApi: AdminAPIService = AdminAPIService.shared();
