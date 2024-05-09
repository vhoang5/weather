import type { WeatherData } from '@/models/WeatherData';
import axios from 'axios';

class WeatherService {

    async getWeather(city: string, unit: string): Promise<WeatherData> { 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`;
        const response = await axios.get(url);
        const icon = response.data.weather[0].icon.substring(0, 2);
        const weatherData: WeatherData = {
            cityName: response.data.name,
            temperature: response.data.main.temp,
            unit: unit === 'metric' ? '°C' : '°F',
            description: response.data.weather[0].description,
            icon: 'http://openweathermap.org/img/wn/' + icon + 'd@2x.png',
            info: response.data.weather[0].main,
        };
        return weatherData;
    }
}

export default new WeatherService();