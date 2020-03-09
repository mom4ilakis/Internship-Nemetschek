import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    headers: {},
    token: null
});

const api = {
    get: (url) => {
        return request.get(url, { Authorization: `Token ${request.token}` });
    },
    post: (url, data) => {
        return request.post(url, data, { headers: { Authorization: `Token ${request.token}` } });
    },
    patch: (url, new_data) => {
        return request.patch(url, new_data, { Authorization: `Token ${request.token}` });
    },
    delete: (url) => {
        return request.delete(url, { Authorization: `Token ${request.token}` });
    },
    login: (name, pass) => {
        const response = request.post('/auth/', {
            username: name,
            password: pass
        });
        response.then(({ data }) => {
            request.token = data.token;
        });
        return response;
    },
    logout: () => {
    }

};

export default api;
