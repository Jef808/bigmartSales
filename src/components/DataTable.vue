<!-- TODO:
   - [ ] Highlight missing/NaN values
   - [ ] Emit event on column click
   - [ ] Dynamically adjust which items are shown
         to allow scrolling.
-->

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({ name: "DataTable" });
export interface Props {
  header: string[];
  body: (string | number)[][];
  isReady: boolean;
  selectedColumn?: number;
}
</script>

<script setup lang="ts">
import DataRow from "./DataRow.vue";
import HeaderRow from "./HeaderRow.vue";

withDefaults(defineProps<Props>(), {
  selectedColumn: -1,
});
</script>

<template>
  <div>
    <div v-if="isReady">
      <table>
        <thead>
          <HeaderRow :row="header" :header="true" />
        </thead>
        <tbody>
          <DataRow v-for="row in body" :key="row[0]" :row="row" />
        </tbody>
      </table>
    </div>
    <div v-else>Loading....</div>
  </div>
</template>
