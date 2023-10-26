import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ExamState, ExamStateDispatcher } from './examSearchStore.types';
import { useUserStore } from '../user/user.store';

const initialState: ExamState = {
	selectedExamId: -1,
};

export const useExamStore = create(
	immer<ExamStateDispatcher>((set) => ({
		...initialState,
		dispatchSelectedExamId: (value: number) => {
			set({ selectedExamId: value });
		},
	})),
);
