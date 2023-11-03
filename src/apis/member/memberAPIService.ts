import APIService from '../../libs/core/api/APIService';
import {
	GetAllStudentByClassIdAndPageAndSizeParams,
	GetAllStudentsResponseData,
	UpdateStudentParams,
} from './memberAPIService.types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/user-service/member/admin`;

class MemberAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async getAllStudentsByClassIdAndPageAndSize(params: GetAllStudentByClassIdAndPageAndSizeParams) {
		const { data } = await this.get<GetAllStudentsResponseData>(
			`${params.classId}?page=${params.page}&size=${params.size}`,
		);
		return data;
	}

	async updateStudent(params: UpdateStudentParams) {
		const { data } = await this.patch('', params);
		return data;
	}
}

export const memberApi: MemberAPIService = MemberAPIService.shared();
