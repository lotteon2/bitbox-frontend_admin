import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';

// React-Query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import router from './routes';
import Loading from './components/common/Loading';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} fallbackElement={<Loading />} />
		<ReactQueryDevtools initialIsOpen />
	</QueryClientProvider>,
);
