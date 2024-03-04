<template>
  <div class="sympotm-wrapper">
    <h2 :id="sympotm.name">
      {{ sympotm.name }}
      <a
        class="header-anchor"
        :href="'#' + sympotm.name"
        aria-hidden="true"
      >#</a>
    </h2>

    <h3>概述</h3>
    <ul>
      <template
        v-for="(description, idx) in splitTextByNum(sympotm.description)"
        :key="idx"
      >
        <li>
          {{ description }}
        </li>
      </template>
    </ul>

    <h3>表现</h3>
    <ul>
      <template
        v-for="(performance, idx) in splitTextByNum(sympotm.performance)"
        :key="idx"
      >
        <li>
          {{ performance }}
        </li>
      </template>
    </ul>

    <h3>起因</h3>
    <ul>
      <li>{{ sympotm.cause }}</li>
    </ul>


    <h3>饮食</h3>
    <ul>
      <li>{{ sympotm.diet }}</li>
    </ul>

    <slot name="footer" />
  </div>
</template>

<script setup>
import { splitTextByNum } from '@/utils';

defineProps({
  sympotm: {
    type: Object,
    required: true
  }
});


</script>

<style lang="sass" scoped>
.sympotm-wrapper
  margin-bottom: 1rem
  padding: .5rem 1.75rem
  border: 1px solid grey
.co-dialog .sympotm-wrapper
  border: none
</style>
