import {useState} from 'react';
import { useQuery } from '../libs/core/react-query';
import { requestApi } from "../apis/request/requestAPIService";
import { GetAllRequestByClassIdResponseData } from "../apis/request/requestAPIService.types";
import { useClassStore } from "../stores/class/class.store";

const GET_ALL_REQUEST_QUERY_KEY = '@request/get';

export const useGetAllStudentQuery = (
	onSettled?: (data?: GetAllRequestByClassIdResponseData) => void,
	initialEnabled = true,
) => {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [classId] = useClassStore((state) => [state.classId]);

	const fetchQuery = () => {
		setEnabled(true);
	};

	const data = useQuery(
		[GET_ALL_REQUEST_QUERY_KEY, classId],
		() => requestApi.getAllRequestByClassId(classId),
		{
			enabled: enabled && Boolean(classId),
			onSettled: (result) => {
				setEnabled(initialEnabled);
				onSettled?.(result);
			},
		},
	);
	return {
		fetchQuery,
		...data,
	};
};
