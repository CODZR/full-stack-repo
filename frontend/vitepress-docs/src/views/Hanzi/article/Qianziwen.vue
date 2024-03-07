<template>
  <div class="article">
    <p class="title">
      {{ title }}
    </p>

    <div class="body">
      <template
        v-for="(char, idx) in body"
        :key="idx"
      >
        <p
          :class="`char ${(idx + 1) % 5 === 0 ? 'default-cursor' : '' }`"
          @click="showSearchDialog(char)"
        >
          {{ char }}
        </p>
      </template>
    </div>
  </div>

  <SearchHanziDialog
    v-model="dialogSearchHanziVisible"
    title="Search Hanzi Dialog"
  >
    <ZiCard :wenzi="wenziObj" />
    <template #footer>
      <button
        class="co-button"
        @click="closeSearchHanziDialog"
      >
        Close
      </button>
    </template>
  </SearchHanziDialog>
</template>

<script setup>
import SearchHanziDialog from '@vcomp/Dialog.vue';
import ZiCard from './components/ZiCard.vue';

import { title, body } from '@/data/hanzi/article/qianziwen';
import {searchHanziAPI} from '@/api/hanzi';

const dialogSearchHanziVisible = ref(false);
const wenziObj = ref({});

const punctuationSet = new Set(['，', '。']);

const showSearchDialog = (char) => {
  if (punctuationSet.has(char)) {
    return;
  }
  
  searchHanziAPI(char).then((data) => {
    console.log('data: ', data);
    wenziObj.value = data;
    dialogSearchHanziVisible.value = true;
  });
};

const closeSearchHanziDialog = () => {
  dialogSearchHanziVisible.value = false;
};
</script>

<style lang="sass" scoped>
.body
  display: inline-flex
  max-width: calc(38px * 20)
  flex-wrap: wrap
  .char
    margin: 0
    padding: 10px
    background-color: #f2f2f2
    border: 1px dashed #ccc
    line-height: 1
    cursor: pointer
    &.default-cursor
      cursor: default
</style>
