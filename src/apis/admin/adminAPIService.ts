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
		this.headers = {
			Authorization:
				'eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJfaWQiOiJhNGFjZDFhMC03Y2U0LTRmOGMtOTg1ZC05ZTliODJmYWE1MTciLCJtZW1iZXJfbmlja25hbWUiOiLrp6Tri4jsoIAxMiIsImNsYXNzX2lkIjpudWxsLCJtZW1iZXJfYXV0aG9yaXR5IjoiTUFOQUdFUiIsImV4cCI6MTY5ODk5OTIzMn0.hF6GOKf1tXZiOWQHnXP5b367LGW2uDmshHWv0swP-mI',
		};
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
