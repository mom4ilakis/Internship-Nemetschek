import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    headers: {}
});

const api = {
    get: (target_url) => {},
    post: (target_url, data, user) => {},
    patch: (target_url, new_data, user) => {},
    delete: (target_url, user) => {},
    login: (name, pass) => {
        const response = request.post('/auth/', {
            username: name,
            password: pass
        });
        return response;
    },
    logout: () => {}

};

export default api;
