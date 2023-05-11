import axios from 'axios';
import { ServerSettings } from '../components/ServerIP';
import { UserDTO } from '../models/DTO/UserDTO';

export const getAuthToken = () : string => {
    const val = window.localStorage.getItem('auth_token');
    return val == null ? "" : val;
};

export const getAuthUsername = () : string => {
    const val = window.localStorage.getItem('auth_username');
    return val == null ? "" : val;
}

export const getAuthId = () : number => {
    const val = window.localStorage.getItem('auth_id');
    return val == null ? -1 : parseInt(val);
}

export const setAuthHeader = (token: any) => {
    window.localStorage.setItem('auth_token', token);
};

export const setAuthUsername = (username: any) => {
    window.localStorage.setItem('auth_username', username);
}

export const setAuthId = (id: any) => {
    window.localStorage.setItem('auth_id', id);
}

export const setAuth = (dto: UserDTO) => {
    setAuthId(dto.id)
    setAuthUsername(dto.username)
    setAuthHeader(dto.token)
}

axios.defaults.baseURL = ServerSettings.API_ENDPOINT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const make_request = (method: any, url: any, data: any) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data}
    );
};