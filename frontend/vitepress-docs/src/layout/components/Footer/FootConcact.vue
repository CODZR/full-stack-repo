<template>
  <div class="section is-foot-contact">
    {{ copyright }}
  </div>
</template>

<script setup>
const props = defineProps({
  contact: {
    type: Object,
    required: true,
    default: () => {}
  },
  copyright: {
    type: String,
    required: true,
  },
});
console.log('props: ', props);

</script>

<style lang="sass" scoped>
.is-foot-contact
  text-align: center
  color: #828282

</style>
