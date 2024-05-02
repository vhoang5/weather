<template>
  <div class='layout'>
    <HeaderComponent />
    <main class="main">
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './Header.vue';
import FooterComponent from './Footer.vue';

export default {
  name: 'LayoutComponent',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
.layout{
  background-image: url('../assets/background.png');
  background-size: cover;
}

.main {
  width: 100%;
  height: calc(100vh - 150px);
}
</style>
