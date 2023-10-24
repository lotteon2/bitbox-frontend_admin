import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query/hooks';
import { examApi } from '../apis/exam/examAPIService';
import { CreateExamParams } from '../apis/exam/examAPIService.typex';

const CREATE_EXAM_MUTATION_KEY = '@exam/create';

export const useCreateExamMutation = () => {
	const { mutateAsync } = useMutation((params: CreateExamParams) => examApi.createExam(params), {
		mutationKey: [CREATE_EXAM_MUTATION_KEY],
	});

	const isMutating = useIsMutating([CREATE_EXAM_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
