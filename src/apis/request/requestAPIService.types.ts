export interface GetAllRequestByClassIdResponseData {
	reasonStatements: {
		reasonStatementId: number;
		attendanceDate: string;
		memberName: string;
		reasonTitle: string;
		reasonContent: string;
		reasonAttachedFile: string;
		reasonState: string;
		read: boolean;
	}[];
	totalCount: number;
}

export interface UpdateRequestStateParams {
	reasonState: string;
	rejectReason: string;
}

// reason sta
