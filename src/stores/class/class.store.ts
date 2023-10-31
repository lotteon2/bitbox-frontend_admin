import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ClassState, ClassStateDispatcher } from './class.types';

const initialState: ClassState = {
	classId: -1,
	classValue: '',
};

export const useClassStore = create(
	immer<ClassStateDispatcher>((set) => ({
		...initialState,
		dispatchSelectedClassId: (value: number) => {
			set({ classId: value });
		},
		dispatchSelectedClassValue: (value: string) => {
			set({ classValue: value });
		},
	})),
);
