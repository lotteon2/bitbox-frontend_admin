export interface GetAllRequestByClassIdResponseData {
    data:{
        reasonStatementId: number;
        attendanceDate: string,
        memberName: string,
        reasonTitle: string,
        reasonContents: string,
        reasonAttachedFile: string,
        reasonState: string,
        isRead: boolean,
    }[],
    total_count: number;
}

export interface UpdateRequestStateParams {
    reasonState: string;
    rejectReason: string;
}

//reason sta