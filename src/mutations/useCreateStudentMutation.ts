import { useIsMutating } from 'react-query';
import { authApi } from '../apis/auth/authAPIService';
import { CreateInviteStudentParams } from '../apis/auth/authAPIService.types';
import { useMutation } from '../libs/core/react-query';

const CREATE_STUDENT_MUTATION_KEY = '@student/create';

export const useCreateStudentMutation = () => {
	const { mutateAsync } = useMutation((params: CreateInviteStudentParams) => authApi.inviteStudent(params), {
		mutationKey: [CREATE_STUDENT_MUTATION_KEY],
	});

	const isMutating = useIsMutating([CREATE_STUDENT_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
