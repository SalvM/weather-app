/* eslint-disable prettier/prettier */
const apiKey = 'b2d61a00534fe567518effcb75e1cd58';

export default class WeatherAPI {


    static async getCity(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).catch(console.err);
    }

    static async getCityForecast(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).catch(console.err);
    }

    static async getCityFuture(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).catch(console.err);
    }
}
