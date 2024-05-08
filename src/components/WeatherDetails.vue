<template>
  <v-card class="weather-main">
    <v-card-text>
      <strong>
        <v-card-title class="headline text-center">{{ weatherData.cityName }}</v-card-title>
      </strong>
    </v-card-text>
    <v-card-text class="weather-temp">
      <div class="weather-icon"
        :style="[weatherData.icon ? { 'background-image': 'url(http://openweathermap.org/img/wn/' + weatherData.icon + 'd@2x.png)' } : {}]">
      </div>
      <span>{{ weatherData.temperature }} </span>
      <sup>{{ weatherData.unit }}</sup>
    </v-card-text>
    <v-card-text class="weather-description">{{ weatherData.description }}</v-card-text>
  </v-card>
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

<style lang="scss" scoped>
.weather {
  &-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0px;

    .weather {
      &-temp {
        position: relative;
        width: 250px;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        margin: 20px 0;

        span {
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -2px;
          position: relative;
        }

        sup {
          position: relative;
          top: -21px;
          font-size: 20px;
        }
      }

      &-icon {
        position: absolute;
        top: -35px;
        left: -35px;
        width: 110px;
        height: 110px;
        background-repeat: no-repeat;
        background-size: 100%;
        filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.03)) drop-shadow(-5px -5px 0 rgba(0, 0, 0, 0.08));
      }

      &-feelsLike,
      &-description {
        font-size: 18px;
        color: var(--darkColor);
        text-transform: capitalize;

        sup {
          position: relative;
          top: 5px;
          left: -2px;
          font-size: 18px;
        }
      }
    }
  }
}

.v-card--variant-elevated,
.v-card--variant-flat {
  background: none;
  box-shadow: none;
}

@media (max-height: 767px) {
  .weather-main {
    margin: 5px;

    .weather-temp {
      width: 250px;
      height: 250px;
      margin: 10px 0;
    }
  }
}
</style>
