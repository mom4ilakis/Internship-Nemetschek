import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    headers: {}
});

const api = {
    get: (url, auth_token) => {
        return request.get(url, { Authorisation: `Token : ${auth_token}` });
    },
    post: (url, data, auth_token) => {
        return request.patch(url, data, { Authorisation: `Token : ${auth_token}` });
    },
    patch: (url, new_data, auth_token) => {
        return request.patch(url, new_data, { Authorisation: `Token : ${auth_token}` });
    },
    delete: (url, user, auth_token) => {
        return request.delete(url, { Authorisation: `Token : ${auth_token}` });
    },
    login: (name, pass) => {
        const response = request.post('/auth/', {
            username: name,
            password: pass
        });
        return response;
    },
    logout: () => {
    }

};

export default api;
