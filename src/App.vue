<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>
  </v-layout>

  <WeatherAnimate />
</template>

<script>
import WeatherAnimate from '@/components/WeatherAnimate.vue';

export default {
  name: 'App',
  components: {
    WeatherAnimate,
  },
};
</script>