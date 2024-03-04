<template>
  <main
    class="home"
    aria-labelledby="main-title"
  >
    <!-- {{ device }} -->
    <HomeHero />
    <slot name="hero" />
    <HomeFeatures />
    <slot name="features" />
    <HomeFooter />
    <slot name="footer" />
  </main>
</template>

<script setup>
import HomeHero from './components/HomeHero.vue';
import HomeFeatures from './components/HomeFeatures.vue';
import HomeFooter from './components/HomeFooter.vue';

// const cart = useCartStore();
// const app = useAppStore();
// const device = computed(() => app.device);


/* End Data */

</script>

<style lang="sass" scoped>
@import '@css/base'
.home
  padding-top: var(--header-height)

.home-content
  max-width: 960px
  margin: 0px auto
  padding: 0 1.5rem

img
  +mobile
    width: 200px
</style>
