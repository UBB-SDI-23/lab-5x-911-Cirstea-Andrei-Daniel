import axios from 'axios';
import { ServerSettings } from '../components/ServerIP';
import { UserDTO } from '../models/DTO/UserDTO';
import { UserRole } from '../models/UserRole';

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

export const getAuthRole = () : UserRole => {
    const val = window.localStorage.getItem('auth_role');
    let role = new UserRole();
    if (val != null) {
        role = JSON.parse(val);
    }
    return role;
}

export const getRoleParsed = (user_role: UserRole) : string => {
    const formattedRole = user_role.name.replace(/^ROLE_/, ''); // remove prefix "ROLE_"
    return formattedRole.charAt(0).toUpperCase() + formattedRole.slice(1).toLowerCase(); // capitalize first letter and convert rest to lowercase
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

export const setAuthRole = (role: UserRole) => {
    window.localStorage.setItem('auth_role', JSON.stringify(role));
}

export const setAuth = (dto: UserDTO) => {
    setAuthId(dto.id)
    setAuthUsername(dto.username)
    setAuthHeader(dto.token)
    setAuthRole(dto.role);
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