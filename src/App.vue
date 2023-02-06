<script setup lang="ts">
import { computed, ref } from "vue";
import { useAsyncState } from "@vueuse/core";
import { readFile } from "./scripts/fileReader";
import { formatCsvData } from "./scripts/formatCsv";
import DataTable from "./components/DataTable.vue";
import BarChart from "./components/BarChart.vue";

const dataSource = ref("data/train.csv");

const { state, isReady } = useAsyncState(readFile(dataSource.value), "", {
  delay: 500,
  onError: function (e) {
    console.error("App:Error:", e);
  },
  onSuccess: function () {
    console.log("App:Ok");
  },
});

 const catColumnsIdx = (() => [
   2, 4, 8, 9, 10
 ])();
 const columnHeaders = (() => [
   "",
   "",
   "Item Fat Content",
   "",
   "Item Type",
   "",
   "",
   "",
   "Outlet Size",
   "Outlet Location Type",
   "Outlet Type",
   "",
 ])();

 const nbRows = ref(1000);
 const selectedColumnIdx = ref(catColumnsIdx[0]);
 const selectedColumn = computed(() => {
   return columnHeaders[selectedColumnIdx.value];
 });

const tableData = computed(() => {
  return formatCsvData(isReady.value ? state.value : "", nbRows.value);
});
const dataProps = computed(() => ({
  header: tableData.value.header,
  body: tableData.value.body,
  isReady: isReady.value,
  selectedColumn: selectedColumnIdx.value,
}));
</script>

<template>
  <div id="main" class="container">
    <div id="controls" class="container">
      <div id="select-column" class="container dev">
        <select
            id="select-column-select"
            v-model="selectedColumnIdx"
        >
          <option
              v-for="colIdx in catColumnsIdx"
              :key="colIdx"
              :value="colIdx"
          >{{ columnHeaders[colIdx] }}
          </option>
        </select>
        <label for="select-column-select">
            Select column: {{ columnHeaders[selectedColumnIdx]  }}
        </label>
      </div>
    </div>
    <div id="chart" class="container">
      <BarChart v-bind="dataProps" />
    </div>
    <div id="table" class="container">
      <DataTable v-bind="dataProps" />
    </div>
  </div>
</template>



<style>
html {
  font-family: sans-serif;
}

#main.container {
  max-width: 60%;
  max-height: 70%;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-size: 0.8rem;
}

td,
th {
  border: 1px solid rgb(190, 190, 190);
  padding: 10px 20px;
}

th {
  background-color: rgb(235, 235, 235);
}

td {
  text-align: center;
}

tr:nth-child(even) td {
  background-color: rgb(250, 250, 250);
}

tr:nth-child(odd) td {
  background-color: rgb(245, 245, 245);
}

caption {
  padding: 10px;
}
</style>
