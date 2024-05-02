import type { WeatherData } from '@/models/WeatherData';
import UtilService from '@/services/utils';
import axios from 'axios';
import { createStore } from 'vuex';

interface State {
  cityName: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  weatherData: WeatherData | null;
}

const initialState: State = {
  cityName: '',
  loading: false,
  error: false,
  errorMessage: '',
  weatherData: null,
};

export default createStore({
  state: initialState,
  mutations: {
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: boolean) {
      state.error = error;
    },
    setErrorMessage(state, errorMessage: string) {
      state.errorMessage = errorMessage;
    },
    setWeatherData(state, weatherData: WeatherData) {
      state.weatherData = weatherData;
    },
  },
  actions: {
    async searchWeather({ commit }, city: string) {
      if (!city) return;
      commit('setLoading', true);
      try {
        const unit = await UtilService.getTemperatureUnit();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`;
        const data = await axios.get(url);
        const weatherData: WeatherData = {
          cityName: data.data.name,
          temperature: data.data.main.temp,
          unit: unit === 'metric' ? '°C' : '°F',
          description: data.data.weather[0].description,
          iconUrl: `http://openweathermap.org/img/wn/${data.data.weather[0].icon}.png`,
        };
        commit('setWeatherData', weatherData);
        commit('setError', false);
        commit('setErrorMessage', '');
      } catch (error: any) {
        console.error('Error fetching weather data:', error);
        commit('setWeatherData', null);
        commit('setError', true);
        const { response: { status } } = error;
        const errorMessage = status ? 'Sorry, we could not find weather information for the provided city.' : 'Failed to fetch weather data. Please try again later.';
        commit('setErrorMessage', errorMessage);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    weatherData: (state: State) => state.weatherData,
    loading: (state: State) => state.loading,
    error: (state: State) => state.error,
    errorMessage: (state: State) => state.errorMessage,
  },
});
