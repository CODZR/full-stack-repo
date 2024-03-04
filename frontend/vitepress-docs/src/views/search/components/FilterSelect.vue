<template>
  <div class="select-item">
    <input
      v-model="listQuery.name"
      placeholder="Name (中文/拼音)"
      class="select-input"
      @click="showList=!showList"
      @input="remoteMethod($event.target.value)"
      @keyup.enter="fetchList"
      @blur="blurList"
    >
    <i class="el-icon-caret-bottom select-icon"></i>
    <ul
      v-show="showList"
      class="select-list"
    >
      <li
        v-for="(item, index) in nameList"
        :key="index"
        class="select-list-item"
        @click="selectChange(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// import { debounce } from '@/utils';

const emit = defineEmits(['fetchList']);
const fetchList = () => emit('fetchList');

const listQuery = inject('listQuery');
const dataList = inject('dataList');
const nameList = ref([]);
const showList = ref(false);

const remoteMethod = (query) => {
  if (query) {
    listQuery.value.page = 1;
    fetchList();
    nameList.value = dataList.value.filter(item => {
      if (item.name.includes(query) || item.search.includes(query))
        return true;
    }).map(item => item.name) || [];
    showList.value = true;
  } else {
    nameList.value = [];
  }
};

const blurList = () => {
  setTimeout(()=>{
    showList.value = false;
  },200);
};

const selectChange = (item) => {
  listQuery.value.name = item;
  fetchList();
};
</script>

<style lang="sass" scoped>
.select-item
  position: relative
  // .select-input
  .select-list
    position: absolute
    z-index: 999
    top: 12px
    padding: 6px 0
    background: #fff
    border: 1px solid #E6E6E6
  .select-list-item
    list-style: none
    padding: .5rem 1.25rem
    cursor: pointer
    &:hover
      background-color: #f5f7fa
  
</style>
