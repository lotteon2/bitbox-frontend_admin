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
