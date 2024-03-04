<template>
  <div class="material-wrapper">
    <h2 :id="material.name">
      {{ material.name }}
      <a
        class="header-anchor"
        :href="'#' + material.name"
        aria-hidden="true"
      >#</a>
    </h2>

    <h3>功效</h3>
    <ul>
      <template
        v-for="(efficacy, idx) in material.efficacy.split('、')"
        :key="idx"
      >
        <li>{{ efficacy }}</li>
      </template>
    </ul>

    <h3>概述</h3>
    <ul>
      <template
        v-for="(description, idx) in splitTextByNum(material.description)"
        :key="idx"
      >
        <li>
          {{ description }}
        </li>
      </template>
    </ul>

    <h3>禁忌人群</h3>
    <ul>
      <li>{{ material.tabooCrowd }}</li>
    </ul>

    <h3>适宜人群</h3>
    <ul>
      <li>{{ material.suitableCrowd }}</li>
    </ul>


    <h3>不宜同食</h3>
    <ul>
      <li>{{ material.unfavorableFeedWith }}</li>
    </ul>

    <h3>类别</h3>
    <ul>
      <li>{{ material.category.title }}</li>
    </ul>

    <h3 v-if="material.symptoms?.length">
      相关症状
    </h3>
    <ul>
      <template
        v-for="symptom in material.symptoms"
        :key="symptom.id"
      >
        <li>
          <button
            class="co-button cursor-pointer"
            @click="showSymptomDialog(symptom.id)"
          >
            {{ symptom.name }}
          </button>
        </li>
      </template>
    </ul>

    <slot name="footer" />
  </div>
</template>

<script setup>
import { splitTextByNum } from '@/utils';

defineProps({
  material: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['showSymptomDialog']);

const showSymptomDialog = (symptomId) => emit('showSymptomDialog', symptomId);
</script>

<style lang="sass" scoped>
.material-wrapper
  margin-bottom: 1rem
  padding: .5rem 1.75rem
  border: 1px solid grey
.co-dialog .material-wrapper
  border: none
</style>
