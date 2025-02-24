import { route } from "../constants/routePath";
import AxiosRequest from '../configs/api';

const AuthService = {};

AuthService.signup = (payload) => AxiosRequest.post(
    `/api/${route.auth}/signup`,
    payload
);

AuthService.login = (payload) => AxiosRequest.post(
    `/api/${route.auth}/login`,
    payload
);

export default AuthService;