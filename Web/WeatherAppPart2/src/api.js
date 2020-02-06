import axios from 'axios';
// const api = {
//     location: null,
//     promise: null,
//     get: (location, url, API_KEY) => {
//         if (api.location === location) {
//             return api.promise;
//         }
//         api.location = location;
//         const params = { q: location, APPID: API_KEY };
//         api.promise = axios.get(url, { params: params });
//         return api.promise;
//     }

// };

const API_KEY = 'b91abb81348473629b33669fb955de64';
const url = 'http://api.openweathermap.org/data/2.5/weather';

const api = {
    get: (location) => {
        const params = { q: location, APPID: API_KEY };
        return axios.get(url, { params: params });
    }
};

export default api;
