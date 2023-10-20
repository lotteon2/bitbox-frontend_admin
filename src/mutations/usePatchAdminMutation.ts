import { useIsMutating } from 'react-query';
import { adminApi } from '../apis/admin/adminAPIService';
import { UpdateAdminInfoParams } from '../apis/admin/adminAPIService.types';
import { useMutation } from '../libs/core/react-query';

const USE_PATCH_ADMIN_MUTATION_KEY = '@admin/patch';

interface UpdateClassParamsWithClassId {
	adminId: string;
	params: UpdateAdminInfoParams;
}

export const usePatchAdminMutation = () => {
	const { mutateAsync } = useMutation(
		(params: UpdateClassParamsWithClassId) => adminApi.updateAdmin(params.adminId, params.params),
		{
			mutationKey: [USE_PATCH_ADMIN_MUTATION_KEY],
		},
	);
	const isMutating = useIsMutating([USE_PATCH_ADMIN_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
