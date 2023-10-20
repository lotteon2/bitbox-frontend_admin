export const useLogout = () => {
	localStorage.removeItem('accessToken');
};
