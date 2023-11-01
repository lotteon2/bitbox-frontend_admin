import { useState } from 'react';
import { useQuery } from '../libs/core/react-query/hooks';
import { useClassStore } from '../stores/class/class.store';
import { useUserStore } from '../stores/user/user.store';
import { gradeApi } from '../apis/grade/gradeAPIService';
import { GetGradesResponseDataForDashBoard } from '../apis/grade/gradeAPIService.types';

const GET_GRADE_BY_CLASSID_DASHBOARD = '@admin/dashboard/get';

export const useGetGradeByClassIdForDashBoardQuery = (
	onSettled?: (data?: GetGradesResponseDataForDashBoard[]) => void,
	initialEnabled = true,
) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);
	const [myClassesOption] = useUserStore((state) => [state.myClassesOption]);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_GRADE_BY_CLASSID_DASHBOARD, classId],
		() => gradeApi.getGradesByClassId(classId === -1 ? myClassesOption[0].value : classId),
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
