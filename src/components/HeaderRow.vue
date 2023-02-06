<script lang="ts">
 import { computed, defineComponent } from 'vue';
 export default defineComponent({ name: 'HeaderRow' });
 export interface Props {
     row: string[],
 }
 export interface Emits {
     (e: "columnSelect", idx: number): void,
 }
</script>

<script setup lang="ts">
 const props = defineProps<Props>();
 const emit = defineEmits<Emits>();

 function onClick(idx: number): void {
     emit("columnSelect", idx);
 }
</script>

<template>
    <tr>
        <th
            v-for="(entry, index) in row"
            :key="index"
            @click="onClick(index)"
        >
            {{ entry }}
        </th>
    </tr>
</template>
