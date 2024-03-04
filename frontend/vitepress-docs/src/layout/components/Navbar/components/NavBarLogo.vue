<template>
  <a
    class="nav-bar-logo"
    :href="localePath"
    :aria-label="`${site.title}, back to home`"
  >
    <!-- <svg-icon
      v-if="theme.logoName"
      class="logo"
      :icon-name="theme.logoName"
      alt="Logo"
    /> -->
    <LazyImg src="shared/logo.png"></LazyImg>
  </a>
</template>

<script setup>
const { site, theme, localePath } = useData();
</script>

<style lang="sass" scoped>
@import '@css/base'
.nav-bar-logo
  margin-right: 16px
  padding: 0.5rem 0.75rem
  display: flex
  justify-content: center
  align-items: center
  svg, img
    width: 131px
    height: auto
    margin-right:0
    +mobile
      width: 96px

.nav-bar-logo:hover
  text-decoration: none

.logo
  margin-right: 0.75rem
  height: 1.3rem
  vertical-align: bottom
</style>
