export const ATTENDANCE = {
	ABSENT: 'ABSENT',
	TARDY: 'TARDY',
	ATTENDANCE: 'ATTENDANCE',
	GO_OUT: 'GO_OUT',
	LEAVE_EARLY: 'LEAVE_EARLY',
} as const;

type ATTENDANCE = (typeof ATTENDANCE)[keyof typeof ATTENDANCE];

export function getAttendacne(params: ATTENDANCE) {
	return ATTENDANCE[params] as string;
}

export const translateAttendance = (status: ATTENDANCE) => {
	let transltatedStatus = '';
	switch (status) {
		case 'ATTENDANCE':
			transltatedStatus = '출석';
			break;
		case 'ABSENT':
			transltatedStatus = '결석';
			break;
		case 'GO_OUT':
			transltatedStatus = '외출';
			break;
		case 'LEAVE_EARLY':
			transltatedStatus = '조퇴';
			break;
		case 'TARDY':
			transltatedStatus = '지각';
			break;
		default:
			transltatedStatus = '';
	}
	return transltatedStatus;
};
