export interface UpdateAttendanceInfoParams {
	attendanceId: number;
	attendanceState: string;
	attendanceModifyReason: string;
}

export interface GetAllAttendanceInfoResponse {
	memberId: string;
	memberProfileImg: string;
	memberName: string;
	attendanceId: number;
	attendanceDate: string;
	entrance: string;
	quit: string;
	attendanceState: string;
	attendanceModifyReason?: string;
	reasonTitle?: string;
}
