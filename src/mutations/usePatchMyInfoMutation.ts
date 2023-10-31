import { adminApi } from '../apis/admin/adminAPIService';
import { UpdateAdminInfoParams } from '../apis/admin/adminAPIService.types';
import { useMutation } from '../libs/core/react-query';

const USE_PATCH_MY_INFO_MUTATION_KEY = '@patch/myinfo';

export const usePatchMyInfoMutation = () => {
	const { mutateAsync } = useMutation((params: UpdateAdminInfoParams) => adminApi.updateMyAdminInfo(params), {
		mutationKey: [USE_PATCH_MY_INFO_MUTATION_KEY],
	});

	return {
		mutateAsync,
	};
};
