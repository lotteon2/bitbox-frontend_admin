import { useState } from 'react';
import { useQuery } from '../libs/core/react-query/hooks';
import { useClassStore } from '../stores/class/class.store';
import { examApi } from '../apis/exam/examAPIService';
import { GetExamResponseData } from '../apis/exam/examAPIService.typex';
import { useUserStore } from '../stores/user/user.store';

const GET_ALL_EXAM_QUERY_KEY = '@exam/get';

export const useGetAllExamQuery = (onSettled?: (data?: GetExamResponseData[]) => void, initialEnabled = true) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);
	const [myClassesOption] = useUserStore((state) => [state.myClassesOption]);

	console.log('CLASSID', classId);
	console.log('myClassesOption', myClassesOption);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_ALL_EXAM_QUERY_KEY, classId],
		() => examApi.getExamsByClassId(classId === -1 ? myClassesOption[0].value : classId),
		{
			enabled: true && Boolean(classId),
			onSettled: (result) => {
				setEnabled(initialEnabled);
				onSettled?.(result);
			},
		},
	);

	console.log(data.data);

	return {
		fetchQuery,
		...data,
	};
};
