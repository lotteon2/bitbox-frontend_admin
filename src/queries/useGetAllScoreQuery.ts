import { useState } from 'react';
import { useQuery } from '../libs/core/react-query/hooks';
import { useClassStore } from '../stores/class/class.store';
import { useUserStore } from '../stores/user/user.store';
import { gradeApi } from '../apis/grade/gradeAPIService';
import { GetGradesResponseDataByExamId } from '../apis/grade/gradeAPIService.types';
import { useExamStore } from '../stores/examSearch/examSearchStore';

const GET_ALL_SCORE_QUERY_KEY = '@score/get';

export const useGetAllScoreByExamIdQuery = (
	onSettled?: (data?: GetGradesResponseDataByExamId[]) => void,
	initialEnabled = true,
) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);
	const [myClassesOption] = useUserStore((state) => [state.myClassesOption]);
	const [selectedExamId] = useExamStore((state) => [state.selectedExamId]);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery([GET_ALL_SCORE_QUERY_KEY, classId], () => gradeApi.getGradesByExamId(selectedExamId), {
		enabled: true && Boolean(classId),
		onSettled: (result) => {
			setEnabled(initialEnabled);
			onSettled?.(result);
		},
	});

	return {
		fetchQuery,
		...data,
	};
};
