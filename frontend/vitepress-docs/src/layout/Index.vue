<template>
  <NavBar v-if="showNavbar">
  </NavBar>

  <Blog v-if="isBlog">
    <template #top>
      <slot name="page-top" />
    </template>
    <template #bottom>
      <slot name="page-bottom" />
    </template>
  </Blog>

  <!-- Vitepress's own component -->
  <Content
    v-else
    class="app-content"
  />

  <VFooter />

  <Debug />
</template>

<script setup>
// import { createPinia } from 'pinia';
// import { isSideBarEmpty, getSideBarConfig } from './support/sideBar';
import { useAppStore } from '@/store/app';
const { changeDevice } = useAppStore();

// components
import { NavBar, VFooter, Blog } from './components';

const NoopComponent = () => null;

// const AlgoliaSearchBox = __ALGOLIA__
//   ? defineAsyncComponent(() => import('./components/AlgoliaSearchBox.vue'))
//   : NoopComponent;

// generic state
const route = useRoute();
const { site, page, theme, frontmatter: fm } = useData();

// TODO: err router Maximum call stack size exceeded
// CustomLayout = import('@/views/' + fm.value.layout + '/Index.vue');
// ? 
// : defineAsyncComponent(() => import('../pageWebsite/' + fm.value.layout + '/Index.vue'));

// custom layout
const isBlog = computed(() => !!fm.value.isBlog);

// automatic multilang check for AlgoliaSearchBox
const isMultiLang = computed(() => Object.keys(site.value.langs).length > 1);

// navbar
const showNavbar = computed(() => {
  const themeConfig = theme.value;
  if (fm.value.navbar === false || themeConfig.navbar === false) {
    return false;
  }
  return (
    site.value.title || themeConfig.logo || themeConfig.repo || themeConfig.nav
  );
});

// sidebar
// const openSideBar = ref(false);

// const showSidebar = computed(() => {
//   if (fm.value.sidebar !== true)
//     return false;

//   return !isSideBarEmpty(
//     getSideBarConfig(theme.value.sidebar, route.data.relativePath)
//   );
// });

// const hideSidebar = toggleSidebar.bind(null, false);
// close the sidebar when navigating to a different location
// watch(route, hideSidebar);
// TODO: route only changes when the pathname changes
// listening to hashchange does nothing because it's prevented in router

const closeNavbarAfterRouteChange = () => {
  const navMenu = document.getElementById('nav-menu');
  const navBurger = document.getElementById('nav-burger');
  watch(route, () => {
    if (navMenu.className.includes('is-active')) {
      navBurger.click();
    }
  });
};

onMounted(() => {
  changeDevice();
  window.addEventListener('resize', function() {
    changeDevice();
  });

  if (window.innerWidth < 1100) { 
    closeNavbarAfterRouteChange();
  }
});
</script>

<style lang="sass">
@import '@css/base'
.app-content
  min-height: calc(100vh - $navbar-height)

#ads-container
  margin: 0 auto


@media (min-width: 420px)
  #ads-container
    position: relative
    right: 0
    float: right
    margin: -8px -8px 24px 24px
    width: 146px
  


@media (max-width: 420px)
  #ads-container
    /* Avoid layout shift */
    height: 105px
    margin: 1.75rem 0
  


@media (min-width: 1400px)
  #ads-container
    position: fixed
    right: 8px
    bottom: 8px
  

</style>
