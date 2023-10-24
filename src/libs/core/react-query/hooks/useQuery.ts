import { QueryKey, useQuery as useOriginalQuery, UseQueryOptions, UseQueryResult, QueryFunction } from 'react-query';

import { ErrorModel } from '../models';

export function useQuery<TQueryFnData = unknown, TError = ErrorModel, TData = TQueryFnData>(
	queryKey: QueryKey,
	queryFn: QueryFunction<TQueryFnData>,
	options?: UseQueryOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> {
	return useOriginalQuery(queryKey, queryFn, {
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
		retry: false,
		...options,
	});
}
