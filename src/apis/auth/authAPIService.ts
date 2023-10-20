import APIService from '../../libs/core/api/APIService';
import { GetLoginParams, GetLoginResponseData } from './authAPIService.types';

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
}

export const authApi: AuthAPIService = AuthAPIService.shared();
