const formatData = (response) => {
    const data = {};
    data.location = response.data.name;
    // temperature info
    data.minTemp = response.data.main.temp_min || null;
    data.maxTemp = response.data.main.temp_max || null;
    data.currentTemp = response.data.main.temp || null;
    data.feelsLikeTemperature = response.data.main.feels_like || null;
    // quick info i.e  synny/stormy etc
    data.description = response.data.weather[0].description || null;
    data.condition = response.data.weather.main || null;
    data.clouds = response.data.clouds.all || null;
    // wind ifno
    data.wind = {};
    data.wind.speed = (response.data.wind && response.data.wind.speed) || null;
    data.wind.direction = (response.data.wind && response.data.wind.deg) || null;
    // precipitation info
    data.humidity = response.data.main.humidity || null;
    data.precipitation = {};
    data.precipitation.snow = (response.data.snow && response.data.snow['3h']) || null;
    data.precipitation.rain = (response.data.rain && response.data.rain['3h']) || null;
    // other info
    data.sunrise = response.data.sys.sunrise || null;
    data.sunset = response.data.sys.sunset || null;
    return data;
};
export {
    formatData
};
