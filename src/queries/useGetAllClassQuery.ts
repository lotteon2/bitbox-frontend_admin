import { classApi } from '../apis/class/classAPIService';
import { useQuery } from '../libs/core/react-query/hooks';

const GET_ALL_CLASS_QUERY_KEY = '@class/get';

export const useGetAllClassQuery = () => {
	return useQuery([GET_ALL_CLASS_QUERY_KEY], () => classApi.getClasses(), {
		enabled: true,
	});
};
