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
	const [myClasses] = useUserStore((state) => [state.myClasses]);
	const [selectedExamId] = useExamStore((state) => [state.selectedExamId]);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_ALL_SCORE_QUERY_KEY, selectedExamId],
		() => gradeApi.getGradesByExamId(selectedExamId === -1 ? myClasses[0].exams[0].examId : selectedExamId),
		{
			enabled: true && Boolean(selectedExamId),
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
