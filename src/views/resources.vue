<template>
  <div class="resources">
      <div class="list-box">
        <table>
            <tr>
                <th>Resource name</th>
                <th>Schema</th>
            </tr>
            <tr v-for="res in resources" :key="res._id">
                <td>{{res.name}}</td>
                <td>{{res.schema}}</td>
            </tr>
        </table>
      </div>
  </div>
</template>
<script lang="ts">

import { useRemoteResource } from "@/hooks/resource";


import { defineComponent, ref } from "vue";

interface Resource {
    _id: string;
    name: string;
    schema: string;
}


export default defineComponent({
    setup() {
        const [Get] = useRemoteResource(`${process.env.VUE_APP_API_URL}/resource`);
        const resources = ref<Resource[]>([])
        
        async function fetchResources() {
            const response: Resource[] = await Get()
            resources.value = response
            console.log(resources.value)
        }
        fetchResources()
        
        return { resources }
    }
})
</script>
<style lang="scss">
    .resources {
        @include fx-jc-c;
        .list-box {
            @include fx-jc-c;
            margin-top: 20px;
            
            width: 600px;
            padding: 20px;
            background-color: #EEE;
            box-shadow: 0 0 3px 1px #000;
        }

    }
</style>