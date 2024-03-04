<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <NavBarLogo />
      <NavShrink @show-login-dialog="showLoginDialog" />

      <div
        id="nav-menu"
        class="nav-menu"
      >
        <NavDropdown />
        <NavEndBtn @show-login-dialog="showLoginDialog" />
      </div>
    </div>
    <div id="extend-offer"></div>
    <LoginDialog v-model="dialogLoginVisible">
      <GoogleLogin :callback="callback" />
    </LoginDialog>
    <slot name="search" />
  </nav>
</template>

<script setup>
import { NavDropdown, NavBarLogo, NavEndBtn, NavShrink } from './components';
import LoginDialog from '@vcomp/Dialog.vue';
import { decodeCredential } from 'vue3-google-login';

/* Start Data */
const user = ref(null);
const { frontmatter: fm } = useData();
// const { handleSetShopifyClient } = useCartStore();
const dialogLoginVisible = ref(false);


const showLoginDialog = () => {
  dialogLoginVisible.value = true;
};

const callback = (response) => {
  user.value = decodeCredential(response.credential);
  dialogLoginVisible.value = false;
};

provide('dialogLoginVisible', dialogLoginVisible);
provide('user', user);
// /* End Data */


// Delay load sidebar after page load. If user clicks cart within the timeout period, this will be a no-op.
onMounted(() => {
  const width = document.body.clientWidth;
  if (width < 1025) {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-menu');
    const navbarTop = navbar.getBoundingClientRect().top;
    navMenu.style.height = `calc(${window.innerHeight - navbarTop}px - 4.125rem)`;
  }
});
</script>

<style lang="sass" scoped>
@import '@css/base'
.navbar
  position: relative
  background-color: #FFF
  font-family: $family-head
  font-size: 16px
  box-shadow: 0 10px 20px rgb(0 0 0 / 3%)
  // transition: top .8s cubic-bezier(.215,.61,.355,1)
  // -moz-transition: top .8s cubic-bezier(.215,.61,.355,1)
  // -webkit-transition: top .8s cubic-bezier(.215,.61,.355,1)
  // -o-transition: top .8s cubic-bezier(.215,.61,.355,1)
  &.is-fixed-top
    position: sticky
    top: 0
    z-index: 9999
  .container
    display: flex
    justify-content: center
    align-items: center
    max-width: 1520px
    height: $navbar-height
    padding: 0 40px
    margin: 0 auto
    +until($navbar-breakpoint)
      padding: 0
      justify-content: space-between
.nav-menu
  display: flex
  justify-content: space-between
  flex-grow: 1
  +from($navbar-breakpoint)
    align-items: center

</style>
