<script setup>
import { toRefs } from 'vue';
import { useNavLink } from '../composables/navLink';
import OutboundLink from './icons/OutboundLink.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const propsRefs = toRefs(props);

const { props: linkProps, isExternal } = useNavLink(propsRefs.item);
</script>

<template>
  <div class="nav-link">
    <a
      class="item"
      v-bind="linkProps"
    >
      {{ item.text }} <OutboundLink v-if="isExternal" />
    </a>
  </div>
</template>

<style scoped>
.item {
  display: block;
  padding: 0 1.5rem;
  line-height: 36px;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.item:hover,
.item.active {
  text-decoration: none;
  color: #3eaf7c;
}

.item.external:hover {
  border-bottom-color: transparent;
  color: #2c3e50;
}

@media (min-width: 720px) {
  .item {
    border-bottom: 2px solid transparent;
    padding: 0;
    line-height: 24px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .item:hover,
  .item.active {
    border-bottom-color: #3eaf7c;
    color: #2c3e50;
  }
}
</style>
