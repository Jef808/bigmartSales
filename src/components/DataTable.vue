<!-- TODO:
   - [ ] Highlight missing/NaN values
   - [ ] Emit event on column click
   - [ ] Dynamically adjust which items are shown
         to allow scrolling.
-->

<script lang="ts">
import { defineComponent, reactive } from "vue";
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

const props = withDefaults(defineProps<Props>(), {
  selectedColumn: -1,
});

const getStyle = (p: Props) => {

 };



function onClick(e: Event) {
   console.log("DataTable: Received click:", e);
   console.log("target:", e.target, "currentTarget:", e.currentTarget);
}

function getColumnIdx(e: Event) {
   (e.target as HTMLElement).closest("tr")
 }
</script>

<template>
  <div>
    <div v-if="isReady">
      <table>
        <thead>
          <HeaderRow
            :row="header" />
        </thead>
        <tbody>
          <DataRow
            v-for="row in body"
            :key="row[0]"
            :row="row"
            @click.stop="onClick"
          />
        </tbody>
      </table>
    </div>
    <div v-else>Loading....</div>
  </div>
</template>
