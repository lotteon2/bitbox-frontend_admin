import { REASON_STATEMENT } from '../../constants/ReasonStatementType';

export interface GetAllRequestByClassIdResponseData {
	reasonStatements: {
		reasonStatementId: number;
		attendanceDate: string;
		memberName: string;
		reasonTitle: string;
		reasonContent: string;
		reasonAttachedFile: string;
		reasonState: keyof typeof REASON_STATEMENT;
		read: boolean;
	}[];
	totalCount: number;
}

export interface UpdateRequestStateParams {
	reasonState: string;
	rejectReason: string;
}

// reason sta
