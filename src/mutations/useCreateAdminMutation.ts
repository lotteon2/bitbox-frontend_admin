import { useIsMutating } from 'react-query';
import { adminApi } from '../apis/admin/adminAPIService';
import { CreateAdminParams } from '../apis/admin/adminAPIService.types';
import { useMutation } from '../libs/core/react-query/hooks';
import { useClassStore } from '../stores/class/class.store';
import { useUserStore } from '../stores/user/user.store';

const CREATE_ADMIN_MUTATION_KEY = '@admin/create';

export const useCreateAdminMutation = () => {
	const classId: number = useClassStore((state) => state.classId);
	const myClassesOption = useUserStore((state) => state.myClassesOption);
	const { mutateAsync } = useMutation(
		(params: CreateAdminParams) => adminApi.createAdmin(classId === -1 ? myClassesOption[0].value : classId, params),
		{
			mutationKey: [CREATE_ADMIN_MUTATION_KEY],
		},
	);

	const isMutating = useIsMutating([CREATE_ADMIN_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
