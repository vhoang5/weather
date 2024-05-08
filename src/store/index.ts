import type { WeatherData } from '@/models/WeatherData';
import UtilService from '@/services/utils';
import WeatherService from '@/services/weather';
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
    async searchWeather({ commit }, searchText: string) {
      if (!searchText) return;
      commit('setLoading', true);
      try {
        const unit = await UtilService.getTemperatureUnit();
        const weatherData = await WeatherService.getWeather(searchText, unit);
        commit('setWeatherData', weatherData);
        commit('setError', false);
        commit('setErrorMessage', '');
      } catch (error: any) {
        console.error('Error fetching weather data:', error);
        commit('setWeatherData', null);
        commit('setError', true);
        if(error.code === "ERR_NETWORK") {
          commit('setErrorMessage', "Network error. Please check your internet connection and try again.");
        } else {
          const { response : { status } } = error;
          const errorMessage = status == 404 ? 'Sorry, we could not find weather information for the provided city.' : 'Failed to fetch weather data. Please try again later.';
          commit('setErrorMessage', errorMessage);
        }
        
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
