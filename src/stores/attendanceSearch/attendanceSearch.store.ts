import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import dayjs from 'dayjs';
import { AttendanceSearchState, AttendanceSearchDispatcher } from './attendanceSearch.types';

const StorageKey = 'storage-key';

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
			name: StorageKey,
			storage: createJSONStorage(() => sessionStorage),
			// partialize: (state) => ({ selectedDateString: state.selectedDateString, searchName: state.searchName }),
		},
	),
);
