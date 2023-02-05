<!-- Script -->
<script setup lang="ts">
 import { computed } from 'vue';

 const props = defineProps<{ row: (string | number)[] }>();
</script>

<!-- Template -->

<template>
    <tr>
        <td v-for="(entry, index) in row"
            :key="index">
            {{ entry }}
        </td>
    </tr>
</template>

<!-- Preview -->

<preview lang="md">
# preview page of DataRow.vue

## Props

    | Props | Description             | Type                |
    |-------|-------------------------|---------------------|
    | row   | The row to be displayed | (string | number)[] |

## Examples

<script setup>
 const rows = [
     [
         'Record1',
         0.786,
         'Medium',
         'None',
         1
     ],
     [
         'Record2',
         -0.8888,
         'Large',
         'A lot',
         0
     ]
 ];
</script>

<template v-for="row in rows">
    <slot :row="row"></slot>
</template>

<style>
 body {
     background-color: green;
 }
</style>

</preview>
