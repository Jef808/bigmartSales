<script setup lang="ts">
 import { computed, ref, reactive } from 'vue';
 import DataRow from './DataRow.vue';
 import HeaderRow from './HeaderRow.vue';

 export interface Props {
     header: string[];
     body: (string | number)[][];
     isReady: boolean;
 }

 const props = defineProps<Props>();
</script>

<template>
  <div>
    <div v-if="isReady">
      <table>
            <HeaderRow
                :row="header"
            ></HeaderRow>
            <DataRow
                v-for="row in body"
                :row="row"
            ></DataRow>
      </table>
    </div>
    <div v-else>Loading....</div>
  </div>
</template>
