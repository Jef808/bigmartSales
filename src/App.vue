<script setup lang="ts">
 import { computed, reactive, ref, onBeforeMount } from 'vue';
 import { useAsyncState } from '@vueuse/core';
 import { readFile } from './scripts/fileReader';
 import { formatCsvData } from './scripts/formatCsv'
 import DataTable from './components/DataTable.vue'
 import BarChart from './components/BarChart.vue'

 const dataSource = ref('data/train.csv');

 const { state, isReady, isLoading } = useAsyncState(
     readFile(dataSource.value),
     "",
     {
         delay: 500,
         onError: function(e) {
             console.error("App:Error:", e);
         },
         onSuccess: function(data) {
             console.log("App:Ok");
         }
     }
 );

 const nbRows = ref(1000);

 const data = computed(() => {
     return formatCsvData(isReady.value ? state.value : "", nbRows.value);
 });

</script>

<template>
  <div id="main" class="container">
      <div>
          <BarChart
              :header="data.header"
              :body="data.body"
              :isReady="isReady"
          />
      </div>
      <div>
          <DataTable
              :header="data.header"
              :body="data.body"
              :isReady="isReady"
          />
      </div>
  </div>
</template>

<style>
    html {
        font-family: sans-serif
    }

    #main.container {
        max-width: 60%;
        max-height: 70%;
    }

    table {
    border-collapse: collapse;
    border: 2px solid rgb(200,200,200);
    letter-spacing: 1px;
    font-size: 0.8rem;
    }

    td, th {
    border: 1px solid rgb(190,190,190);
    padding: 10px 20px;
    }

    th {
    background-color: rgb(235,235,235);
    }

    td {
    text-align: center
    }

    tr:nth-child(even) td {
    background-color: rgb(250,250,250);
    }

    tr:nth-child(odd) td {
    background-color: rgb(245,245,245);
    }

    caption {
    padding: 10px;
    }
</style>
