export interface GetAllStudentsResponseData {
	data: {
		className: string;
		memberName: string;
		memberNickname: string;
		memberEmail: string;
		memebrProfileImg: string;
		memberCredit: string;
	};
	totalCount: number;
}

export interface GetAllStudentByClassIdAndPageAndSizeParams {
	classId: number;
	page: number;
	size: number;
}
