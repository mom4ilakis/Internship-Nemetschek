import axios from 'axios';
const api = {
    location,
    response,
    get: (location, url, API_key) => {
        if (api.location === location) {
            return api.response;
        }
        api.location = location;
        const params = { q: location, APPID: API_KEY };
        api.response = axios.get(url, { params: params });
        return api.response;
    }

};

export default Api;
