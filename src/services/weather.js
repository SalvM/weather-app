/* eslint-disable prettier/prettier */
export default class WeatherAPI {

    static async getCity(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b2d61a00534fe567518effcb75e1cd58`;
        console.warn({cityName, url});
        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).catch(console.err);
    }
}
