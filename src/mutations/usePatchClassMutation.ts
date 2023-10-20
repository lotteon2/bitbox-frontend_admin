import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query';
import { classApi } from '../apis/class/classAPIService';
import { UpdateClassParams } from '../apis/class/classAPIService.types';

const USE_PATCH_CLASS_MUTATION_KEY = '@class/patch';

interface UpdateClassParamsWithClassId {
	classId: number;
	params: UpdateClassParams;
}

export const usePatchClassMutation = () => {
	const { mutateAsync } = useMutation(
		(params: UpdateClassParamsWithClassId) => classApi.updateClasses(params.classId, params.params),
		{
			mutationKey: [USE_PATCH_CLASS_MUTATION_KEY],
		},
	);
	const isMutating = useIsMutating([USE_PATCH_CLASS_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
