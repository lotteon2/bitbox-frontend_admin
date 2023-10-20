import { adminApi } from '../apis/admin/adminAPIService';
import { useQuery } from '../libs/core/react-query/hooks';

const GET_ALL_ADMIN_QUERY_KEY = '@admin/get';

export const useGetAllAdminQuery = () => {
	return useQuery([GET_ALL_ADMIN_QUERY_KEY], () => adminApi.getAllAdmin(), {
		enabled: true,
	});
};
