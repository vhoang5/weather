<template>
  <Layout>
    <div class="weather-panel">
      <div class="search-container">
        <label for="city">
          <input type="text" v-model="city" id="city" placeholder="Enter city name" />
        </label>
        <button @click="searchWeather" :disabled="loading || !city">Search</button>
      </div>
      <div v-if="loading" class="loading-spinner">
        <font-awesome-icon icon="spinner" spin-pulse style="color: #74C0FC;" />
      </div>
      <div v-if="error && !loading" class="error-message">{{ errorMessage }}</div>
      <WeatherDetails v-if="weatherData && !loading" :weatherData="weatherData" />
    </div>
  </Layout>
</template>

<script lang="ts">
import { mapGetters, useStore } from 'vuex';
import { defineComponent, ref } from 'vue';
import Layout from '@/template/Layout.vue';
import WeatherDetails from '@/components/WeatherDetails.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    WeatherDetails,
  },
  computed: {
    ...mapGetters(['loading', 'error', 'errorMessage', 'weatherData']),
  },
  setup() {
    const store = useStore();
    const city = ref('');
    const searchWeather = () => {
      if (!city.value) return;
      store.dispatch('searchWeather', city.value);
    };

    return {
      city,
      searchWeather,
    };
  },
});
</script>

<style scoped>
.weather-panel {
  margin: 0 auto;
  padding: 20px;
}

.weather-panel {
  width: 29%;
  height: calc(100vh - 180px);
  @media (max-width: 1440px) and (min-width: 1024px) {
    width: 45%;
  }
  @media (max-width: 1024px) and (min-width: 425px) {
    width: 50%;
  }
  @media (max-width: 768px) and (min-width: 258px) {
    width: 90%;
  }
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-container label {
  margin-right: 10px;
  flex: 1;
}

.search-container input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(100% - 10px)
}

.search-container button {
  padding: 10px 20px;
  margin-left: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #b8b8b8;
  }
}

.search-container button:hover {
  background-color: #0056b3;
}

.loading-spinner {
  font-size: 40px;
  margin: 100px calc(50% - 20px);
}

.error-message {
  color: red;
  margin: 20px 0;
}

</style>
