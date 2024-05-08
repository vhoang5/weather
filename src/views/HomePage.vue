<template>
  <transition name="fade" mode="out-in" appear>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-card class="weather-app-card" elevation="5">
          <SearchBar @search="searchWeather" :loading="loading" />

          <v-alert v-if="errorMessage && !loading" type="error" outlined>{{ errorMessage }}</v-alert>

          <div class="text-center">
            <v-progress-circular v-if="loading" color="purple" indeterminate :rotate="360"
              :size="100"></v-progress-circular>
          </div>

          <WeatherDetails :weatherData="weatherData" v-if="weatherData && !loading" />
        </v-card>
      </v-layout>
    </v-container>
  </transition>
</template>

<style lang="scss">
.weather-app-card {
  width: 100%;
  padding: 40px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 0 70px fade(black, 30);
  z-index: 9999;
  background-color: var(--cardBgColor);
  margin-top: calc(50vh - 325px);
  min-height: var(--cardHight);

  @media (max-height: 767px) {
    padding: 20px 5px;
    margin-top: calc(50vh - 300px);
  }
}

@media (max-width: 480px) {
  .weather-app-card {
    padding: 10px 5px;
  }
}
</style>

<script lang="ts">
import { mapGetters, useStore } from 'vuex';
import { defineComponent, ref } from 'vue';
import WeatherDetails from '@/components/WeatherDetails.vue';
import SearchBar from '@/components/SearchBar.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    WeatherDetails,
    SearchBar,
  },
  computed: {
    ...mapGetters(['loading', 'error', 'errorMessage', 'weatherData']),
  },
  setup() {
    const store = useStore();
    const searchWeather = (searchText: string) => {
      if (!searchText) return;
      store.dispatch('searchWeather', searchText);
    };

    store.dispatch('searchWeather', "London");

    return {
      searchWeather,
    };
  },
});
</script>
