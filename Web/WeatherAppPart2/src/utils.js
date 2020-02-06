export function formatData (response) {
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
    return data;
}
