import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query/hooks';
import { authApi } from '../apis/auth/authAPIService';
import { LoginParams } from '../apis/auth/authAPIService.types';

const LOGIN_MUTATION_KEY = '@auth/login';

export const useLoginMutation = () => {
	const { mutateAsync } = useMutation((params: LoginParams) => authApi.localLogin(params), {
		mutationKey: [LOGIN_MUTATION_KEY],
	});

	const isMutating = useIsMutating([LOGIN_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
