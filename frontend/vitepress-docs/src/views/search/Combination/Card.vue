<template>
  <div class="combination-wrapper">
    <h2 :id="combination.name">
      {{ combination.name }}
      <a
        class="header-anchor"
        :href="'#' + combination.name"
        aria-hidden="true"
      >#</a>
    </h2>

    <h3>功效</h3>
    <ul>
      <template
        v-for="(efficacy, idx) in combination.efficacy.split('、')"
        :key="idx"
      >
        <li>{{ efficacy }}</li>
      </template>
    </ul>

    <h3>概述</h3>
    <ul>
      <template
        v-for="(description, idx) in splitTextByNum(combination.description)"
        :key="idx"
      >
        <li>
          {{ description }}
        </li>
      </template>
    </ul>

    <h3>禁忌人群</h3>
    <ul>
      <li>{{ combination.tabooCrowd }}</li>
    </ul>

    <h3>适宜人群</h3>
    <ul>
      <li>{{ combination.suitableCrowd }}</li>
    </ul>


    <h3>不宜同食</h3>
    <ul>
      <li>{{ combination.unfavorableFeedWith }}</li>
    </ul>

    <h3>类别</h3>
    <ul>
      <li>{{ combination.category.title }}</li>
    </ul>

    <h3>材料</h3>
    <ul>
      <template
        v-for="material in combination.materials"
        :key="material.id"
      >
        <li>
          <button
            class="co-button cursor-pointer"
            @click="showMaterialDialog(material.id)"
          >
            {{ material.name }}
          </button>
        </li>
      </template>
    </ul>

    <h3 v-if="combination.symptoms?.length">
      相关症状
    </h3>
    <ul>
      <template
        v-for="symptom in combination.symptoms"
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
  combination: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['showMaterialDialog', 'showSymptomDialog']);

const showMaterialDialog = (materialId) => emit('showMaterialDialog', materialId);

const showSymptomDialog = (symptomId) => emit('showSymptomDialog', symptomId);
</script>

<style lang="sass" scoped>
.combination-wrapper
  margin-bottom: 1rem
  padding: .5rem 1.75rem
  border: 1px solid grey
.co-dialog .combination-wrapper
  border: none
</style>
