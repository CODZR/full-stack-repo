<template>
  <div class="nav-end-btn">
    <a
      class="button is-primary is-rounded"
      href="/blog/food/"
    >
      <span>See Diet</span>
    </a>
    <div class="nav-divider"></div>
    <button
      class="mgr-8"
    >
      <svg-icon
        class="nav-icon is-hidden"
        icon-name="global-cart-cart"
        alt="cart icon"
      />
    </button>
    <template v-if="user">
      <div class="user-wrapper">
        <img
          class="user-picture"
          :src="user.picture"
        >
        <div class="user-dropdown">
          <div class="height-placeholder"></div>
          <div class="dropdown-wrapper">
            <ul>
              <li class="dropdown-item">
                {{ user.email }}
              </li>
              <li class="dropdown-item">
                {{ user.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <button @click="showLoginDialog">
        <svg-icon
          class="nav-icon"
          icon-name="global-cart-user"
          alt="user icon"
        />
      </button>
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
</script>

<style lang="sass" scoped>
@import '@css/base'
.nav-end-btn
   display: flex
   align-items: center
   padding: 8px 0
   +until(1080px)
      display: none
   .button.is-primary
      background-color: #f66
      border-color: transparent
      color: #fff
      font-weight: 500
   button
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
   +touch
      .button
         display: none


.user-wrapper
  position: relative
  cursor: pointer
  .user-picture
    width: 40px
  &:hover .user-dropdown
    display: block
  .user-dropdown
    display: none
    position: absolute
    right: 0
    .height-placeholder
      height: 1rem
    .dropdown-wrapper
      padding: 6px 0
      border: 1px solid #E6E6E6
      background: #fff
      .dropdown-item
        padding: .5rem 1.25rem
        cursor: pointer
        &:hover
          background-color: #f5f7fa
</style>
