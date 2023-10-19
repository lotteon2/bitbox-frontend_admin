export interface ErrorModel {
	status: number;
	name: string;
	message: string;
	code?: string;
	data?: unknown;
}
