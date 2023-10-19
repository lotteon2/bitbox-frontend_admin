import {
	MutationFunction,
	useMutation as useOriginalMutation,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';

import { ErrorModel } from '../models';

export function useMutation<TData, TError = ErrorModel, TVariables = void, TContext = unknown>(
	mutationFn: MutationFunction<TData, TVariables>,
	options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
	return useOriginalMutation(mutationFn, options);
}
