import APIService from '../../libs/core/api/APIService';
import { GetLoginParams } from './authAPIService.types';

const BASE_URL = 'http://localhost:8000/authentication-service/auth';

class AuthAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async localLogin(params: GetLoginParams) {
		const { data } = await this.post('/admin', params);
		return data;
	}
}

export const authApi: AuthAPIService = AuthAPIService.shared();
