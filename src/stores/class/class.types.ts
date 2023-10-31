export interface ClassState {
	classId: number;
	classValue: string;
}

export interface ClassStateDispatcher extends ClassState {
	dispatchSelectedClassId: (value: number) => void;
	dispatchSelectedClassValue: (value: string) => void;
}
