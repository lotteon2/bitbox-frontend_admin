import { requestApi } from '../apis/request/requestAPIService';
import { useMutation } from '../libs/core/react-query';

const USE_PATCH_REQUEST_IS_READ_MUTATION_KEY = '@request/patch/isRead';

export const usePatchRequestIsReadMutation = () => {
	const { mutateAsync } = useMutation(
		(requestStatementId: number) => requestApi.updateRequestIsRead(requestStatementId),
		{
			mutationKey: [USE_PATCH_REQUEST_IS_READ_MUTATION_KEY],
		},
	);

	return {
		mutateAsync,
	};
};
