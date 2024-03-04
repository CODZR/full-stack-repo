<template>
  <div class="nav-item">
    <span
      class="nav-link"
      :aria-label="menu.ariaLabel"
      @click="handleClickNavLink($event.currentTarget)"
    >
      {{ menu.title }}
    </span>
    <div class="nav-dropdown is-boxed">
      <template v-if="menu.submenu">
        <template
          v-for="item in menu.submenu"
          :key="item.title"
        >
          <a
            class="nav-dropdown-item"
            v-bind="bindLinkProps(item)"
          >
            {{ item.text }} <OutboundLink v-if="isExternal(item.link)" />
          </a>
        </template>
      </template>
      <template v-else>
        <div class="f-row">
          <div
            v-for="submenu in menu.columnSubmenu"
            :key="submenu.title"
            class="f-col"
          >
            <span class="nav-dropdown-item is-column-title">{{ submenu.title }}</span>
            <template
              v-for="item in submenu.items"
              :key="item.text"
            >
              <a
                class="nav-dropdown-item"
                v-bind="bindLinkProps(item)"
              >
                {{ item.text }} <OutboundLink v-if="isExternal(item.link)" />
              </a>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useNavLink } from '@/composables/navLink';
import OutboundLink from '@vcomp/icons/OutboundLink.vue';
import { isExternal } from '@/utils';

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});

const handleClickNavLink = el => {
  const navLinks = document.querySelectorAll('.nav-link.is-active');
  navLinks.forEach(linkEl => linkEl.classList.remove('is-active'));
  el.classList.add('is-active');
};

const bindLinkProps = item => {
  return useNavLink(item).props.value;
};
</script>

<style lang="sass" scoped>
@import '@css/base'
.nav-link
  &::after
    content: " "
    position: absolute
    top: 50%
    display: block
    width: 0.425em
    height: 0.425em
    margin-top: -0.4em
    right: 18px
    transform: rotate(-45deg)
    transform-origin: center
    border: 3px solid transparent
    border-top: 0
    border-radius: 2px
    border-right: 0
    border-color: #111
  +from(1080px)
    padding-right: 2.5em
    &:hover + .nav-dropdown
      display: flex
      flex-direction: column
      opacity: 1

.nav-dropdown
  position: absolute
  top: 50px
  left: -24px
  z-index: 998
  display: none
  margin-top: -12px
  padding-top: .5rem
  padding-bottom: .5rem
  background-color: #fff
  box-shadow: 0 -1px 10px rgb(55 55 55 / 10%)
  border-radius: 2px
  font-size: 16px
  +widescreen
    border-radius: 6px
    border-top: none
    box-shadow: 0 8px 8px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%)
  &:hover, &:focus
    display: flex
    flex-direction: column
    pointer-events: auto
    transform: translateY(0)
  &.is-boxed .f-col
    align-items: center
    
  .nav-dropdown-item
    white-space: nowrap
    padding: .75rem 76px .75rem 38px
    &:hover
      color: #f66
      text-decoration: none
    &.is-column-title
      font-weight: 500
      color: #b2b2b2
</style>
