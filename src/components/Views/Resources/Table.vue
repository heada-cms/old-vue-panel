<template>
     <table>
         <tr>
            <th>Resource name</th>
            <th>Schema</th>
        </tr>
        <tr v-for="res in resources" :key="res.name">
            <td> {{ res.name }}</td>
            <td> {{ res.schema }}</td>
        </tr>
                
     </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    props: {
       resources: Object
    }
})
</script>