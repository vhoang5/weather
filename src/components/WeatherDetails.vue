<template>
  <div class='weather-info-panel'>
    <h2>{{ weatherData.cityName }}</h2>
    <div class="weather-info">
      <img :src='weatherData.iconUrl' :alt='weatherData.description' />
      <p class="temperature">{{ weatherData.temperature }} {{ weatherData.unit }}</p>
    </div>
    <div class="description">
      <p>{{ weatherData.description }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'WeatherDetails',
  setup() {
    const store = useStore();
    const weatherData = computed(() => store.getters.weatherData);

    return { weatherData };
  },
};
</script>

<style scoped>
.weather-info-panel {
  margin-top: 20px;
  text-align: center;
}

.weather-info-panel h2 {
  font-size: 46px;
  font-family: "Roboto", sans-serif;
  color: #484141a1;
  @media (max-width: 768px){
    margin-bottom: 0px;
  }
}

.weather-info{
  width: 60%;
  display: flex;
  height: auto;
  margin: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.weather-info img {
  width: 100px;
  height: 100px;
}

.weather-info .temperature{
  color: #688bcb;
  line-height: 51px;
  font-size: 32px;
}

.description{
  width: 70%;
  height: auto;
  padding: 17px 0;
  border: 1px solid #645d5d;
  border-radius: 20px;
  margin: auto;
  flex-direction: column;
  margin-top: 25px;
  display: flex;
}

.description p {
  font-size: 18px;
  text-transform: capitalize;
}

</style>
