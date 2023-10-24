import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import dayjs from 'dayjs';
import { AttendanceSearchState, AttendanceSearchDispatcher } from './attendanceSearch.types';

const getToday = () => {
	const now = dayjs();
	return now.format('YYYY-MM-DD');
};

const initialState: AttendanceSearchState = {
	selectedDateString: getToday(),
	searchName: '',
};

export const useAttendanceSearchStore = create(
	immer<AttendanceSearchDispatcher>((set) => ({
		...initialState,
		dispatchSelectedDateString: (value: string) => {
			set({ selectedDateString: value });
		},
		dispatchSearchName: (value: string) => {
			set({ searchName: value });
		},
	})),
);
