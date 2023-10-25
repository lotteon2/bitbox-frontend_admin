import { useState } from 'react';
import { adminApi } from '../apis/admin/adminAPIService';
import { GetAdminInfoResponseData } from '../apis/admin/adminAPIService.types';
import { useQuery } from '../libs/core/react-query/hooks';
import { useClassStore } from '../stores/class/class.store';
import { useUserStore } from '../stores/user/user.store';

const GET_ALL_ADMIN_QUERY_KEY = '@admin/get';

export const useGetAllAdminQuery = (onSettled?: (data?: GetAdminInfoResponseData[]) => void, initialEnabled = true) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);
	const [myClassesOption] = useUserStore((state) => [state.myClassesOption]);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_ALL_ADMIN_QUERY_KEY, classId],
		() => adminApi.getAllAdmin(classId === -1 ? myClassesOption[0].value : classId),
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
