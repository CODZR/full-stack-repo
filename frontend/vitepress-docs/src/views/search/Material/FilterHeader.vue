<template>
  <div class="f-row mgb-5">
    <FilterSelect
      @fetch-list="fetchList"
    />
    <button @click="fetchList">
      Search
    </button>
  </div>
</template>

<script setup>
import FilterSelect from '../components/FilterSelect.vue';

const emit = defineEmits(['fetchList']);

const fetchList = () => emit('fetchList');
</script>
  
<style lang="sass" scoped>

</style>
