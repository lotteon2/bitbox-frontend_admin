import { BarChartDataType } from '../../components/DashBoard/BarChartDataType';
import APIService from '../../libs/core/api/APIService';
import { GetAllAttendanceInfoResponse, UpdateAttendanceInfoParams } from './attendanceAPIService.types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/user-service/member/admin/attendance`;

class AttendanceAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

	async getAttendanceInfoByClassIdForDashBoard(classId: number) {
		const { data } = await this.get<BarChartDataType[]>(`/dashboard/${classId}`);
		console.log(data);
		return data;
	}

	async getAllAttendanceInfo(classId: number, localDate: string, memberName: string) {
		const { data } = await this.get<GetAllAttendanceInfoResponse[]>(
			`/${classId}?current=${localDate}?memberName=${memberName}`,
		);
		return data;
	}

	async updateAttendanceInfo(params: UpdateAttendanceInfoParams) {
		const { data } = await this.patch<string>('', params);
		return data;
	}
}

export const attendanceApi: AttendanceAPIService = AttendanceAPIService.shared();
