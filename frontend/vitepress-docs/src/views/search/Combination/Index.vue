<template>
  <div class="page">
    <FilterHeader
      :data-list="dataList"
      @fetch-list="fetchList"
    />
    

    <template
      v-for="combination in dataList"
      :key="combination.id"
    >
      <CombinationCard :combination="combination">
        <template #footer>
          <button
            class="co-button co-button--success"
            @click="showCombinationDialog(combination.id)"
          >
            View Detail
          </button>
        </template>
      </CombinationCard>
    </template>

    <CombinationDialog
      v-model="dialogCombinationVisible"
      title="Combination Dialog"
    >
      <CombinationCard
        :combination="combinationObj"
        @show-material-dialog="showMaterialDialog"
        @show-symptom-dialog="showSymptomDialog"
      />
    
      <template #footer>
        <button
          class="co-button"
          @click="closeCombinationDialog"
        >
          Close
        </button>
      </template>
    </CombinationDialog>

    <MaterialDialog
      v-model="dialogMaterialVisible"
      title="Material Dialog"
    >
      <MaterialCard :material="materialObj" />
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
import CombinationDialog from '@vcomp/Dialog.vue';
import CombinationCard from './Card.vue';
import MaterialDialog from '@vcomp/Dialog.vue';
import MaterialCard from '../components/MaterialCard.vue';
import SympotmDialog from '@vcomp/Dialog.vue';
import SympotmCard from '../components/SymptomCard.vue';
import { queryCombinationsAPI, findCombinationAPI, findMaterialAPI, findSymptomAPI } from '@/api/health';

/* Start Data */
const dataList = shallowRef(null);
const total = ref(null);
const dialogCombinationVisible = ref(false);
const dialogMaterialVisible = ref(false);
const dialogSymptomVisible = ref(false);

const listQuery = ref({
  // offset: 1,
  page: 1,
  limit: 99,
  name: undefined,
});

const combinationObj = ref({
  id: 0,
  name: null,
  efficacy: null,
  description: null,
  tabooCrowd: null,
  suitableCrowd: null,
  unfavorableFeedWith: null,
  categoryId: null,
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

function queryCombination() {
  queryCombinationsAPI(listQuery.value).then(data => {
    dataList.value = data.rows;
    total.value = data.count;
  });
}

const fetchList = () => {
  setTimeout(() => queryCombination(), 200);
};

const showCombinationDialog = (combinationId) => {
  findCombinationAPI(combinationId).then(data => {
    combinationObj.value = data;
    dialogCombinationVisible.value = true;
  });
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

const closeCombinationDialog = () => {
  dialogCombinationVisible.value = false;
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
