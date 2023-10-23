export interface ClassState {
	classId: number;
}

export interface ClassStateDispatcher extends ClassState {
	dispatchSelectedClassId: (value: number) => void;
}
