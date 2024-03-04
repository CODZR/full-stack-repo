<template>
  <div class="nav-shrink buttons">
    <a
      class="button is-primary is-rounded"
      href="/blog/food/"
    >
      <span>See Diet</span>
    </a>
    <div
      class="nav-divider is-hidden-mobile"
      data-v-00cdf7b5=""
    ></div>
    <button
      class="nav-btn nav-cart-icon mgl-8 is-hidden"
    >
      <svg-icon
        class="nav-icon"
        icon-name="global-cart-cart"
        alt="cart icon"
      />
    </button>
    <button
      class="nav-btn nav-user-icon is-hidden"
      @click="showLoginDialog"
    >
      <svg-icon
        class="nav-icon"
        icon-name="global-cart-user"
        alt="user icon"
      />
    </button>
    <template v-if="user">
      <img :src="user.picture">
    </template>
    <template v-else>
      <div
        id="nav-burger"
        class="nav-burger"
        @click="toggleMenuActive($event.currentTarget)"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </template>
  </div>
</template>

<script setup>
const { frontmatter: fm } = useData();
// import { useCartStore } from '@/store/cart';
// const { handleOpenCartModal } = useCartStore();

const user = inject('user');
const emit = defineEmits(['showLoginDialog']);
const showLoginDialog = () => emit('showLoginDialog');

const toggleMenuActive = (burger) => {
  // const navBurger = document.getElementById('nav-burger');
  burger.classList.toggle('is-active');
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('is-active');
};

// const onCartClick = () => {
//   Extend.config({ storeId: '91426846-4d2c-482d-a9e9-1031f0ffb6b0' });
//   showCartModal.value = true;
// };
</script>
<style lang="sass" scoped>
@import '@css/base'
.nav-shrink.buttons
  display: none
  .nav-btn
    display: block
    position: relative
    padding: 0
    border: none
    background: 0 0
    cursor: pointer
  .nav-icon
    width: 45px
    height: 45px
    color: #f66
.nav-burger
  display: block
  position: relative
  min-width: 48px
  width: 48px
  height: 48px
  margin-right: .25rem
  padding: 0.5rem 0.75rem
  color: #111
  cursor: pointer
  span
    background-color: #111
    display: block
    height: 2px
    left: calc(50% - 8px)
    position: absolute
    transform-origin: center
    transition-duration: 86ms
    transition-property: background-color,opacity,transform
    transition-timing-function: ease-out
    width: 16px
  span:nth-child(1)
    top: calc(50% - 6px)
  span:nth-child(2)
    top: calc(50% - 1px)
  span:nth-child(3)
    top: calc(50% + 4px)
  &.is-active
    span:nth-child(1)
      transform: translateY(5px)rotate(45deg)
    span:nth-child(2)
      opacity: 0
    span:nth-child(3)
      transform: translateY(-5px)rotate(-45deg)

</style>
