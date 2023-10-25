export const REASON_STATEMENT = {
	SUBMIT: 'SUBMIT',
	APPROVE: 'APPROVE',
	REJECT: 'REJECT',
} as const;

type REASON_STATEMENT = (typeof REASON_STATEMENT)[keyof typeof REASON_STATEMENT];

export function getReasonStatement(params: REASON_STATEMENT) {
	return REASON_STATEMENT[params] as string;
}

export const translateReasonStatement = (status: REASON_STATEMENT) => {
	let translatatedStatus = '';
	switch (status) {
		case 'SUBMIT':
			translatatedStatus = '제출';
			break;
		case 'APPROVE':
			translatatedStatus = '승인';
			break;
		case 'REJECT':
			translatatedStatus = '거절';
			break;
		default:
			translatatedStatus = '';
	}
	return translatatedStatus;
};
