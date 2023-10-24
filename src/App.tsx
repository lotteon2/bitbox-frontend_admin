import { QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import router from './routes';
import Loading from './components/common/Loading';
import { useAppMount } from './App.hooks';

const App = () => {
	const { queryClientRef } = useAppMount();

	return (
		<QueryClientProvider client={queryClientRef.current}>
			<RouterProvider router={router} fallbackElement={<Loading />} />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
};
export default App;
