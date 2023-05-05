import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5';

const apiKey = process.env.REACT_APP_API_KEY;

const getWeather = (lat, lon) => {
  return axios
    .get(`${baseURL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response) => response.data);
};

const weatherAPI = { getWeather };

export default weatherAPI;
