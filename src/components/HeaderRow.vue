<script setup lang="ts">
 import { computed } from 'vue';

 const props = defineProps<{ row: string[] }>();
</script>

<template>
    <tr>
        <th
            v-for="(entry, index) in row"
            :key="index"
        >
            {{ entry }}
        </th>
    </tr>
</template>
