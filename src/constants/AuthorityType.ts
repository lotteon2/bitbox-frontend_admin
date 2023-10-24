export const AUTHORITY = {
	ADMIN: 'ADMIN',
	MANAGER: 'MANAGER',
	TEACHER: 'TEACHER',
	GRADUATE: 'GRADUATE',
	TRAINEE: 'TRAINEE',
	GENERAL: 'GENERAL',
} as const;

type AUTHORITY = (typeof AUTHORITY)[keyof typeof AUTHORITY];

export function getAuthority(params: AUTHORITY) {
	return AUTHORITY[params] as string;
}

export const translateAuthority = (status: AUTHORITY) => {
	let transltatedAuthority = '';
	switch (status) {
		case 'ADMIN':
			transltatedAuthority = '관리자';
			break;
		case 'MANAGER':
			transltatedAuthority = '매니저';
			break;
		case 'TEACHER':
			transltatedAuthority = '강사';
			break;
		default:
			transltatedAuthority = '';
	}
	return transltatedAuthority;
};
