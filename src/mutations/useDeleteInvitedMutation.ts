import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query';
import { authApi } from '../apis/auth/authAPIService';

const USE_DELETE_INVITED_MUTATION_KEY = '@invited/delete';

export const useDeleteInvitedMutation = () => {
	const { mutateAsync } = useMutation((deleteEmail: string) => authApi.deleteInvitedStudent(deleteEmail), {
		mutationKey: [USE_DELETE_INVITED_MUTATION_KEY],
	});
	const isMutating = useIsMutating([USE_DELETE_INVITED_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
