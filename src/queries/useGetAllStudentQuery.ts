import { memberApi } from '../apis/member/memberAPIService';
import { GetAllStudentByClassIdAndPageAndSizeParams } from '../apis/member/memberAPIService.types';
import { useQuery } from '../libs/core/react-query';

const GET_ALL_STUDENT_QUERY_KEY = '@student/get';

export const useGetAllStudentQuery = (params: GetAllStudentByClassIdAndPageAndSizeParams) => {
	return useQuery([GET_ALL_STUDENT_QUERY_KEY], () => memberApi.getAllStudentsByClassIdAndPageAndSize(params), {
		enabled: true,
	});
};
