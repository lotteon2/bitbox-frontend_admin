export interface AttendanceSearchState {
	selectedDateString: string;
	searchName: string;
}

export interface AttendanceSearchDispatcher extends AttendanceSearchState {
	dispatchSelectedDateString: (value: string) => void;
	dispatchSearchName: (value: string) => void;
}
