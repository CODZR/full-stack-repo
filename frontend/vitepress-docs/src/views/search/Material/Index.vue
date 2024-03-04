<template>
  <div class="page">
    <FilterHeader
      :data-list="dataList"
      @fetch-list="fetchList"
    />

    <template
      v-for="material in dataList"
      :key="material.id"
    >
      <MaterialCard :material="material">
        <template #footer>
          <button
            class="co-button co-button--success"
            @click="showMaterialDialog(material.id)"
          >
            View Detail
          </button>
        </template>
      </MaterialCard>
    </template>

    <MaterialDialog
      v-model="dialogMaterialVisible"
      title="Material Dialog"
    >
      <MaterialCard
        :material="materialObj"
        @showSymptomDialog="showSymptomDialog"
      />
      <template #footer>
        <button
          class="co-button"
          @click="closeMaterialDialog"
        >
          Close
        </button>
      </template>
    </MaterialDialog>

    <SympotmDialog
      v-model="dialogSymptomVisible"
      title="Sympotm Dialog"
    >
      <SympotmCard :sympotm="symptomObj" />
      <template #footer>
        <button
          class="co-button"
          @click="closeSymptomDialog"
        >
          Close
        </button>
      </template>
    </SympotmDialog>
  </div>
</template>

<script setup>
import FilterHeader from './FilterHeader.vue';
import MaterialCard from '../components/MaterialCard.vue';
import MaterialDialog from '@vcomp/Dialog.vue';
import SympotmDialog from '@vcomp/Dialog.vue';
import SympotmCard from '../components/SymptomCard.vue';
import { queryMaterialsAPI, findMaterialAPI, findSymptomAPI } from '@/api/health';

/* Start Data */
const dataList = shallowRef(null);
const total = ref(null);
const dialogMaterialVisible = ref(false);
const dialogSymptomVisible = ref(false);

const listQuery = ref({
  // offset: 1,
  page: 1,
  limit: 99,
  name: undefined,
});

const materialObj = ref({
  id: 0,
  name: null,
  efficacy: null,
  description: null,
  tabooCrowd: null,
  suitableCrowd: null,
  unfavorableFeedWith: null,
  categoryId: null,
});
const symptomObj = ref({
  id: 0,
  name: null,
  description: null,
  cause: null,
  performance: null,
  diet: null,
});


provide('listQuery', listQuery);
provide('dataList', dataList);
/* End Data */

function queryMaterial() {
  queryMaterialsAPI(listQuery.value).then(data => {
    console.log('data: ', data);
    dataList.value = data.rows;
    total.value = data.count;
  });
}

const fetchList = () => {
  setTimeout(() => queryMaterial(), 200);
};

const showMaterialDialog = (materialId) => {
  findMaterialAPI(materialId).then(data => {
    materialObj.value = data;
    dialogMaterialVisible.value = true;
  });
};
const showSymptomDialog = (sympotmId) => {
  findSymptomAPI(sympotmId).then(data => {
    symptomObj.value = data;
    dialogSymptomVisible.value = true;
  });
};

const closeMaterialDialog = () => {
  dialogMaterialVisible.value = false;
};
const closeSymptomDialog = () => {
  dialogSymptomVisible.value = false;
};

onMounted(() => {
  fetchList();
});
</script>

<style lang="sass" scoped>
.sidebar
  display: none
</style>
