import { useQuery } from '../libs/core/react-query';
import { adminApi } from '../apis/admin/adminAPIService';

const GET_MY_ADMIN_QUERY_KEY = '@myinfo/get';

export const useGetMyAdimInfoQuery = () => {
	return useQuery([GET_MY_ADMIN_QUERY_KEY], () => adminApi.getMyAdminInfo(), {
		enabled: true,
		cacheTime: 1000 * 60,
	});
};
