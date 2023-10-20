import { classApi } from '../apis/class/classAPIService';
import { useQuery } from '../libs/core/react-query/hooks';

const GET_ALL_CLASS_QUERY_KEY = '@class/get';

export const useGetAllClassQuery = () => {
	// TODO : store에서 classId 가져오기
	return useQuery([GET_ALL_CLASS_QUERY_KEY], () => classApi.getClasses(0), {
		enabled: true,
	});
};
