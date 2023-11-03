import axios, { HttpStatusCode, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export type Headers = Record<string, string>;

export interface APIResponse<T> {
	status: number;
	data: T;
	message: T;
}

const trimSlash = (str = '') => `${str}`.replace(/^\/+|\/+$/g, '');
const trimLeftSlash = (str = '') => `${str}`.replace(/^\/+/g, '').replace(/\/+$/g, '/');

class APIService {
	baseUrl: string;

	headers: Headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'https://bitbox.kro.kr',
		Authorization: localStorage.getItem('accessToken') || '',
		'Access-Control-Allow-Credentials': 'true',
	};

	withCredentials = true;

	static $instance: APIService;

	public static shared<T extends APIService>(): T {
		if (this.$instance) {
			return this.$instance as T;
		}

		this.$instance = new this();

		return this.$instance as T;
	}

	constructor(baseUrl?: string) {
		this.baseUrl = trimSlash(baseUrl);
	}

	public setBaseUrl(url: string) {
		this.baseUrl = trimSlash(url);
	}

	private async request<R = unknown, P = unknown>(
		method: Method,
		path: string,
		params?: P,
		config?: AxiosRequestConfig,
	) {
		const headers: Headers = {
			...this.headers,
			...((config?.headers as Headers | undefined) ?? {}),
		};

		const options: AxiosRequestConfig = {
			method,
			headers,
			url: `${this.baseUrl}/${trimLeftSlash(path)}`,
			withCredentials: true,
		};

		if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
			options.data = params;
		} else {
			options.params = params;
		}

		/* eslint no-useless-catch: "off" */

		try {
			const response: AxiosResponse<R> = await axios(options);
			return {
				status: response.status,
				data: response.data,
			} as APIResponse<R>;
		} catch (error) {
			throw error;
		}
	}

	get<R, P = unknown>(path: string, data?: P, config?: AxiosRequestConfig) {
		return this.request<R, P>('GET', path, data, config);
	}

	post<R, P = unknown>(path: string, data?: P, config?: AxiosRequestConfig) {
		return this.request<R, P>('POST', path, data, config);
	}

	put<R, P = unknown>(path: string, data?: P, config?: AxiosRequestConfig) {
		return this.request<R, P>('PUT', path, data, config);
	}

	delete<R, P = unknown>(path: string, data?: P, config?: AxiosRequestConfig) {
		return this.request<R>('DELETE', path, data, config);
	}

	patch<R, P = unknown>(path: string, data?: P, config?: AxiosRequestConfig) {
		return this.request<R, P>('PATCH', path, data, config);
	}
}

export default APIService;

/* eslint no-param-reassign: "off" */
axios.interceptors.request.use((config) => {
	config.headers['Content-Type'] = 'application/json';
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
	return config;
});
