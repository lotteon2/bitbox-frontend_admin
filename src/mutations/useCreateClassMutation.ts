import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query/hooks';
import { classApi } from '../apis/class/classAPIService';
import { CreateClassParams } from '../apis/class/classAPIService.types';

const CREATE_CLASS_MUTATION_KEY = '@class/create';

export const useCreateClassMutation = () => {
	const { mutateAsync } = useMutation((params: CreateClassParams) => classApi.createClass(params), {
		mutationKey: [CREATE_CLASS_MUTATION_KEY],
	});

	const isMutating = useIsMutating([CREATE_CLASS_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
