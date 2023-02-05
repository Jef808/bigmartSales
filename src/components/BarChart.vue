<script setup lang="ts">
 import { computed, reactive, ref } from 'vue';
 import { Bar } from 'vue-chartjs'
 import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

 export interface Props {
     header: string[];
     body: (string | number)[][];
     isReady: boolean;
 }

 ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

 const props = defineProps<Props>();

 const categoricalVars = [
     "Item Fat Content",
     "Item Type",
     "Outlet Size",
     "Outlet Location Type",
     "Outlet Type"
 ];
 const selectedHeader = ref("");
 const selectedHeaderIdx = computed(() => {
     if (selectedHeader.value.length === 0)
         return -1;
     return props.header.indexOf(selectedHeader.value);
 });

 // const chartData = reactive({
 //     labels: [ 'January', 'February', 'March' ],
       //     datasets: [ { data: [40, 20, 12] } ]
 // });

 function makeCounter(i: number)  {
     return props.body.reduce((c, r) => {
         const v = r[i].toString();
         c[v] = (c[v] || 0) + 1;
         return c;
     },
     Object.create(null) as Record<string | number, number>);

 const chartData = computed(() => {
     const i = selectedHeaderIdx.value;
     const uniqCounter = makeCounter(i)
         return {
             labels: Object.keys(uniqCounter),
             datasets: [ { data: Object.values(uniqCounter) } ]
         };
 });



 const chartOptions = reactive({
     responsive: true
 });

</script>

<template>
    <div>
        <div v-if="isReady">
            <div>
                Selected Header: {{ selectedHeader  }}
            </div>
            <select v-model="selectedHeader">
                <option disabled value="">Select one</option>
                <option>Item Fat Content</option>
                <option>Item Type</option>
                <option>Outlet Size</option>
                <option>Outlet Location Type</option>
                <option>Outlet Type</option>
            </select>
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
