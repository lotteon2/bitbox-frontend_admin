import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import dayjs from 'dayjs';
import { AttendanceSearchState, AttendanceSearchDispatcher } from './attendanceSearch.types';

const AttendanceStorageKey = 'attendance-storage';

const getToday = () => {
	const now = dayjs();
	return now.format('YYYY-MM-DD');
};

const initialState: AttendanceSearchState = {
	selectedDateString: getToday(),
	searchName: '',
};

export const useAttendanceSearchStore = create(
	persist<AttendanceSearchDispatcher>(
		(set) => ({
			...initialState,
			dispatchSelectedDateString: (value: string) => {
				set({ selectedDateString: value });
			},
			dispatchSearchName: (value: string) => {
				set({ searchName: value });
			},
		}),
		{
			name: AttendanceStorageKey,
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
