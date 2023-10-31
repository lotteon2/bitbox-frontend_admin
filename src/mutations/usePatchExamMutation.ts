import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query/hooks';
import { examApi } from '../apis/exam/examAPIService';
import { UpdateExamParams } from '../apis/exam/examAPIService.typex';

const USE_PATCH_EXAM_MUTATION_KEY = '@exam/patch';

interface UpdateExamParamsWithExamId {
	examId: number;
	params: UpdateExamParams;
}

export const usePatchExamMutation = () => {
	const { mutateAsync } = useMutation(
		(params: UpdateExamParamsWithExamId) => examApi.updateExam(params.examId, params.params),
		{
			mutationKey: [USE_PATCH_EXAM_MUTATION_KEY],
		},
	);

	const isMutating = useIsMutating([USE_PATCH_EXAM_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
