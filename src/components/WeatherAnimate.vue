<template>
    <div :class="[
        { 'weather-animate': true },
        { 'weather-rain': weatherData?.info == 'Rain' },
        { 'weather-snow': weatherData?.info == 'Snow' },
        { 'weather-clear': weatherData?.info == 'Clear' || weatherData?.info == 'Mist' },
        { 'weather-clouds': weatherData?.info == 'Clouds' || weatherData?.info == 'Haze' }]">
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'WeatherAnimate',
    computed: {
        ...mapGetters(["weatherData"])
    }
};
</script>

<style lang="scss" scoped>
.weather-animate {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    transition: background-image 2s;
    background-size: cover;
    background-position: center;
    z-index: -1;
    background-image: url("../assets/images/clear.jpg");
    background-position: revert;

    // clear weather
    &.weather-clear {
        background-image: url("../assets/images/clear.jpg");

        &::after,
        &::before {
            content: "";
            background-image: url("../assets/images/fog.png");
            height: 810px;
            position: absolute;
            width: 100%;
            background-repeat: repeat-x;
        }

        &::after {
            top: -50px;
            animation: animateCloud var(--cloudAnimateTime) linear infinite alternate-reverse;
        }

        &::before {
            top: 200px;
            animation: animateCloud calc(var(--clearAnimationTime) / 2) linear infinite alternate;
        }
    }

    // cloudy weather
    &.weather-clouds {
        background-image: url("../assets/images/clouds.jpg");

        &::after,
        &::before {
            content: "";
            background-image: url("../assets/images/fog.png");
            height: 810px;
            position: absolute;
            width: 100%;
            background-repeat: repeat-x;
        }

        &::after {
            top: -50px;
            animation: animateCloud var(--cloudAnimateTime) linear infinite alternate-reverse;
        }

        &::before {
            top: 300px;
            animation: animateCloud calc(var(--cloudAnimateTime) / 2) linear infinite alternate;
        }
    }

    // snow weather
    &.weather-snow {
        background-image: url("../assets/images/snow.jpg");

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            animation: animateSnow var(--snowAnimateTime) cubic-bezier(0.28, 0.54, 0.47, 0.56) infinite normal;
            background-image: url("../assets/images/snow2.png"), url("../assets/images/snow3.png"), url("../assets/images/snow4.png"), url("../assets/images/snow3.png");
        }
    }

    // snow weather
    &.weather-rain {
        background-image: url("../assets/images/rain-bg.jpg");

        &::after {
            content: "";
            background-repeat: repeat;
            animation: animateRain var(--rainAnimateTime) cubic-bezier(0.28, 0.54, 0.47, 0.56) infinite normal;
            background-image: url("../assets/images/rain-1.png"), url("../assets/images/rain-2.png");
            opacity: 0.8;
        }
    }
}
</style>