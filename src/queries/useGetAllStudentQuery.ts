import { useState } from 'react';
import { memberApi } from '../apis/member/memberAPIService';
import { GetAllStudentsResponseData } from '../apis/member/memberAPIService.types';
import { useQuery } from '../libs/core/react-query';
import { useClassStore } from '../stores/class/class.store';

const GET_ALL_STUDENT_QUERY_KEY = '@student/get';

export const useGetAllStudentQuery = (
	onSettled?: (data?: GetAllStudentsResponseData) => void,
	initialEnabled = true,
) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_ALL_STUDENT_QUERY_KEY, classId],
		() => memberApi.getAllStudentsByClassIdAndPageAndSize({ classId, size: 10, page: 0 }),
		{
			enabled: enabled && Boolean(classId),
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
