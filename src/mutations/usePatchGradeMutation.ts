import { gradeApi } from '../apis/grade/gradeAPIService';
import { UpdateGradeByGradeIdParams } from '../apis/grade/gradeAPIService.types';
import { useMutation } from '../libs/core/react-query';

const USE_PATCH_GRADE_MUTATION_KEY = '@grade/patch';

interface UpdatGradeParamsWithGradeId {
	gradeId: number;
	params: UpdateGradeByGradeIdParams;
}

export const usePatchRequestIsReadMutation = () => {
	const { mutateAsync } = useMutation(
		(params: UpdatGradeParamsWithGradeId) => gradeApi.updateGradeByGradeId(params.gradeId, params.params),
		{
			mutationKey: [USE_PATCH_GRADE_MUTATION_KEY],
		},
	);

	return {
		mutateAsync,
	};
};
