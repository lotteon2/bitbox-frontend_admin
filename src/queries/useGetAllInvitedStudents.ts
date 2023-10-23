import { authApi } from '../apis/auth/authAPIService';
import { useQuery } from '../libs/core/react-query';

const GET_ALL_INVITED_STUDENTS_QUERY_KEY = '@invitedStudent/get';

export const useGetAllInvitedStudentQuery = () => {
	return useQuery([GET_ALL_INVITED_STUDENTS_QUERY_KEY], () => authApi.getAllInvitedStudents(), {
		enabled: true,
	});
};
