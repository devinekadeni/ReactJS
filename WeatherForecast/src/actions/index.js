import axios from 'axios';

const API_KEY = '94f3b67a9b69f4043e4d18835d21bed8';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},id`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}