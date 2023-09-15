import axios from "axios";

const BASE_URL = process.env["REACT_APP_API_URL "];

// 기본 API 요청 처리
const axiosApi = (baseURL: any) => {
    const instance = axios.create({
        baseURL,
        withCredentials: true,
    });
    return instance;
};

// 로그인 이용자 API 요청 처리
const axiosAuthApi = (baseURL: any) => {
    const instance = axios.create({
        baseURL,
        withCredentials: true,
    });

    // TODO: 로그인 정보 저장 및 API에 인증 토큰 붙이는 코드

    return instance;
}
export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);