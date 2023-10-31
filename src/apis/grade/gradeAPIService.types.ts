export interface GetGradesResponseDataForDashBoard {
	gradeId: number;
	perfectScore: number;
	classId: number;
	examName: string;
	examId: number;
	avgScore: number;
}

export interface GetGradesResponseDataByExamId {
	memberId: string;
	memberName: string;
	gradeId: number;
	score: number;
	examName: string;
	perfectScore: number;
}

export interface UpdateGradeByGradeIdParams {
	score: number;
}
