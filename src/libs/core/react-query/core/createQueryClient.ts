import { QueryClient } from 'react-query';

export const createQueryClient = (): QueryClient =>
	new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	});
