import { useIsMutating } from 'react-query';
import { memberApi } from '../apis/member/memberAPIService';
import { useMutation } from '../libs/core/react-query';
import { UpdateStudentParams } from '../apis/member/memberAPIService.types';

const USE_PATCH_STUDENT_MUTATION_KEY = '@student/patch';
export const usePatchStudentMutation = () => {
	const { mutateAsync } = useMutation((params: UpdateStudentParams) => memberApi.updateStudent(params), {
		mutationKey: [USE_PATCH_STUDENT_MUTATION_KEY],
	});

	const isMutating = useIsMutating([USE_PATCH_STUDENT_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
