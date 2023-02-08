<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({ name: "BarChart" });
export interface Props {
  header: string[];
  body: (string | number)[][];
  isReady: boolean;
  selectedColumn: number;
}
</script>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps<Props>();

// Utility function used to create a counter object
// for a given column index
function makeCounter(index: number) {
  return props.body.reduce((c, r) => {
    const v = `${r[index]}`;
    c[v] = (c[v] || 0) + 1;
    return c;
  }, {} as Record<string | number, number>);
}
// Compute the number of occurence of each distinct record
// and return results formatted as follows:
// {
//    labels: [ <rec_1.name>, <rec_2.name>, ... ]
//    datasets: [ { data: [rec_1.count, rec_2.count, ...] } ]
// }
// where the records are ordered in decreasing order of their count.
const chartData = computed(() => {
   const uniqCounter = Object.entries(
     makeCounter(props.selectedColumn)).sort(orderFn);
   function orderFn(a: [string,number], b: [string,number]) {
       return a[1] > b[1] ? -1 : 1;
   }
   return {
     labels: uniqCounter.map(([name,]) => name),
     datasets: [{
         data: uniqCounter.map(([,count]) => count)
     }],
   };
 });

 const chartLabel = computed(() => {
     return props.header[props.selectedColumn];
 })

const chartOptions = reactive({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Value distribution",
    },
    subtitle: {
      display: true,
      text: chartLabel.value,
    },
    legend: {
      display: false,
    }
  },
});
</script>

<template>
  <div>
    <div v-if="isReady">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData"></Bar>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
