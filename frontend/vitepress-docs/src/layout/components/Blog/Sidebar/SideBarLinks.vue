<template>
  <ul
    v-if="items.length > 0"
    class="sidebar-links"
  >
    <SideBarLink
      v-for="item of items"
      :key="item"
      :item="item"
    />
  </ul>
</template>

<script setup>
import { useSideBar } from '@/composables/sideBar';
import { SideBarLink } from './SideBarLink';

const items = useSideBar();
</script>


<style lang="sass" scoped>
.sidebar-links
  margin: 0
  padding: 0
  list-style: none


.sidebar-link-item
  display: block
  margin: 0
  border-left: 0.25rem solid transparent
  color: var(--c-text)


a.sidebar-link-item:hover
  text-decoration: none
  color: var(--c-brand)


a.sidebar-link-item.active
  color: var(--c-brand)


.sidebar > .sidebar-links
  padding: 0.75rem 0 5rem


@media (min-width: 720px)
  .sidebar > .sidebar-links
    padding: 1.5rem 0
  


.sidebar > .sidebar-links > .sidebar-link + .sidebar-link
  padding-top: 0.5rem


@media (min-width: 720px)
  .sidebar > .sidebar-links > .sidebar-link + .sidebar-link
    padding-top: 1.25rem
  


.sidebar > .sidebar-links > .sidebar-link > .sidebar-link-item
  padding: 0.35rem 1.5rem 0.35rem 1.25rem
  font-size: 1.1rem
  font-weight: 700


.sidebar > .sidebar-links > .sidebar-link > a.sidebar-link-item.active
  border-left-color: var(--c-brand)
  font-weight: 600


.sidebar
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-link-item
    display: block
    padding: 0.35rem 1.5rem 0.35rem 2rem
    line-height: 1.4
    font-size: 1rem
    font-weight: 400


.sidebar
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > a.sidebar-link-item.active
    border-left-color: var(--c-brand)
    font-weight: 600


.sidebar
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-link-item
    display: block
    padding: 0.3rem 1.5rem 0.3rem 3rem
    line-height: 1.4
    font-size: 0.9rem
    font-weight: 400


.sidebar
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-links,
  > .sidebar-link,
  > .sidebar-link-item
    display: block
    padding: 0.3rem 1.5rem 0.3rem 4rem
    line-height: 1.4
    font-size: 0.9rem
    font-weight: 400


</style>
