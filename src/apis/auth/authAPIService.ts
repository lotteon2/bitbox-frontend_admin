import APIService from '../../libs/core/api/APIService';
import {
	GetLoginParams,
	GetLoginResponseData,
	CreateInviteStudentParams,
	GetAllInvitedStudentsResponseData,
} from './authAPIService.types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/authentication-service/auth`;

class AuthAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async localLogin(params: GetLoginParams) {
		const { data } = await this.post<GetLoginResponseData>('/admin', params);
		return data;
	}

	async inviteStudent(params: CreateInviteStudentParams) {
		const { data } = await this.post('/invitation', params);
		return data;
	}

	async getAllInvitedStudents() {
		const { data } = await this.get<GetAllInvitedStudentsResponseData[]>('/invitation');
		return data;
	}
}

export const authApi: AuthAPIService = AuthAPIService.shared();
