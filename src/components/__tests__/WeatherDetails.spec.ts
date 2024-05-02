import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createStore } from 'vuex';
import WeatherDetails from '../WeatherDetails.vue';

describe('WeatherDetails', () => {
  it('renders correct weather information', () => {
    const mockStore = createStore({
      modules: {
        weather: {
          getters: {
            weatherData: () => ({
              cityName: 'Test City',
              iconUrl: 'testIconUrl',
              temperature: 20,
              unit: '°C',
              description: 'Test description',
            }),
          },
        },
      },
    });

    const wrapper = mount(WeatherDetails, {
      global: {
        plugins: [mockStore],
      },
    });

    expect(wrapper.find('h2').text()).to.equal('Test City');

    const img = wrapper.find('img');
    expect(img.exists()).to.be.true;
    expect(img.attributes('src')).to.equal('testIconUrl');
    expect(img.attributes('alt')).to.equal('Test description');

    expect(wrapper.find('.temperature').text()).to.equal('20 °C');
    expect(wrapper.find('.description p').text()).to.equal('Test description');
  });
});
