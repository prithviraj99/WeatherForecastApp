
import axios from 'axios';
const apiToken = 'f91d5415f228378d5aee06f85749cdbf';




const apiUrl = 'https://api.openweathermap.org/data/2.5';

const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {


	const requestUrl = `${apiUrl}${endPoint}?q=${payload.q}&units=${payload.units}&appid=${apiToken}`

	 return axios.get(requestUrl)

}

export const fetchForecastByCityName = cityName => fetchApi(`/forecast`, { q: cityName, units: 'metric' });
