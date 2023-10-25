import APIService from "../../libs/core/api/APIService";
import { GetAllRequestByClassIdResponseData, UpdateRequestStateParams } from "./requestAPIService.types";

const BASE_URL = `${process.env.REACT_APP_API_URL}/user-service/member/admin/reason`;

class RequestAPIService extends APIService {
	constructor() {
		super();
		this.setBaseUrl(BASE_URL);
	}

    async getAllRequestByClassId(classId: number) {
        const { data } = await this.get<GetAllRequestByClassIdResponseData>(`/${classId}`);
        return data;
    }

    async updateRequestIsRead(reasonStatementId: number) {
        const { data } = await this.patch(`/detail/${reasonStatementId}`);
        return data;
    }

    async updateRequestState(reasonStatementId: number, params: UpdateRequestStateParams) {
        const { data } = await this.patch(`/state/${reasonStatementId}`, params);
        return data;
    }
};

export const requestApi: RequestAPIService = RequestAPIService.shared();

