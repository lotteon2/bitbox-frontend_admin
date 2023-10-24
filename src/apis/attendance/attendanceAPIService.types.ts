import { ATTENDANCE } from '../../constants/AttendanceType';

export interface UpdateAttendanceInfoParams {
	attendanceId: number;
	attendanceState: string;
	attendanceModifyReason?: string;
}

export interface GetAllAttendanceInfoResponse {
	memberId: string;
	memberProfileImg: string;
	memberName: string;
	attendanceId: number;
	attendanceDate: string;
	entrace: string;
	quit: string;
	attendanceState: keyof typeof ATTENDANCE;
	attendanceModifyReason?: string;
	reasonTitle?: string;
}
