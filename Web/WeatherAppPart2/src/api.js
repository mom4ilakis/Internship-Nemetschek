import axios from 'axios';
class Api {
    constructor (url, API_KEY) {
        this.url = url;
        this.API_KEY = API_KEY;
        this.location = null;
        this.response = null;
    }

    get = (location) => {
        if (location === this.location) {
            return this.response;
        }
        this.location = location;
        const params = { q: this.location, APPID: this.API_KEY };
        this.response = axios.get(this.url, { params: params });
    }

    formatData (response) {
        const data = {};
        // temperature info
        data.minTemp = response.main.temp_min;
        data.maxTemp = response.main.temp_max;
        data.currentTemp = response.main.temp;
        data.feelsLikeTemperature = response.main.feels_like;
        // quick info i.e  synny/stormy etc
        data.description = response.weather[0].description;
        data.condition = response.weather.main;
        data.clouds = response.clouds.all;
        // wind ifno
        data.wind.speed = response.wind.speed;
        data.wind.direction = response.wind.deg;
        // precipitation info
        data.humidity = response.main.humidity;
        data.precipitation.snow = response.snow['3h'];
        data.precipitation.rain = response.rain['3h'];
        // other info
        data.sunrise = response.sys.sunrise;
        data.sunset = response.sys.sunset;
    }
}

export default Api;
