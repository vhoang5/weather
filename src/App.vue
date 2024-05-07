<template>
  <v-layout class="rounded rounded-md">
    <!-- <v-app-bar color="surface-variant" title="Weather App"></v-app-bar> -->

    <v-navigation-drawer>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">

    </v-navigation-drawer>

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