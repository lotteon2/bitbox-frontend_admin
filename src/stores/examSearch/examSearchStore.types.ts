export interface ExamState {
	selectedExamId: number;
}

export interface ExamStateDispatcher extends ExamState {
	dispatchSelectedExamId: (value: number) => void;
}
