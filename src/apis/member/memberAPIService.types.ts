import { AUTHORITY } from '../../constants/AuthorityType';

export interface GetAllStudentsResponseData {
	memberInfoList: {
		className: string;
		memberName: string;
		memberNickname: string;
		memberEmail: string;
		memberProfileImg: string;
		memberCredit: string;
		memberId: string;
		memberAuthority: keyof typeof AUTHORITY;
		createAt: string;
		updatedAt: string;
		deleted: boolean;
	}[];
	totalCount: number;
}

export interface GetAllStudentByClassIdAndPageAndSizeParams {
	classId: number;
	page?: number;
	size?: number;
}
