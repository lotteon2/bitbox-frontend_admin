import { useState } from 'react';
import { useQuery } from '../libs/core/react-query/hooks';
import { useClassStore } from '../stores/class/class.store';
import { attendanceApi } from '../apis/attendance/attendanceAPIService';
import { GetAllAttendanceInfoResponse } from '../apis/attendance/attendanceAPIService.types';
import { useUserStore } from '../stores/user/user.store';

const GET_ALL_ATTENDANCE_QUERY_KEY = '@admin/get';

export const useGetAllAttendanceQuery = (
	onSettled?: (data?: GetAllAttendanceInfoResponse[]) => void,
	initialEnabled = true,
) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);
	const myClassesOption = useUserStore((state) => state.myClassesOption);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_ALL_ATTENDANCE_QUERY_KEY, classId],
		() => attendanceApi.getAllAttendanceInfo(classId === -1 ? myClassesOption[0].value : classId),
		{
			enabled: true && Boolean(classId),
			onSettled: (result) => {
				setEnabled(initialEnabled);
				onSettled?.(result);
			},
		},
	);

	return {
		fetchQuery,
		...data,
	};
};
