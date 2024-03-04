<template>
  <div class="nav-item">
    <a
      class="nav-link"
      v-bind="linkProps"
    >
      {{ menu.title }} <OutboundLink v-if="isExternal" />
    </a>
  </div>
</template>

<script setup>
import { useNavLink } from '@/composables/navLink';
import OutboundLink from '@vcomp/icons/OutboundLink.vue';

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
});

const propsRefs = toRefs(props);

const { props: linkProps, isExternal } = useNavLink(propsRefs.menu);
</script>

