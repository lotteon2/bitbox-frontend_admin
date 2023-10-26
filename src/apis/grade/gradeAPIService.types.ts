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
	gradeId: number;
	score: number;
	perfectScore: number;
	examName: string;
}
