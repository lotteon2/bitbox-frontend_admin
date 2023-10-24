import { useIsMutating } from 'react-query';
import { useMutation } from '../libs/core/react-query';
import { attendanceApi } from '../apis/attendance/attendanceAPIService';
import { UpdateAttendanceInfoParams } from '../apis/attendance/attendanceAPIService.types';

const USE_PATCH_ATTENDANCE_MUTATION_KEY = '@admin/patch';

export const usePatchAttendanceMutation = () => {
	const { mutateAsync } = useMutation(
		(params: UpdateAttendanceInfoParams) => attendanceApi.updateAttendanceInfo(params),
		{
			mutationKey: [USE_PATCH_ATTENDANCE_MUTATION_KEY],
		},
	);
	const isMutating = useIsMutating([USE_PATCH_ATTENDANCE_MUTATION_KEY]) > 0;

	return {
		mutateAsync,
		isMutating,
	};
};
