<template>
  <div class="resources-view">
      <div class="list-box" v-if="resources.length > 0">
        <button @click="this.$router.push('/resource/add')"> Add a new resource </button>
        <ul v-if="resources.length > 0">
            <li v-for="res in resources" :key="res.name"> {{res.name}}</li>
        </ul>
        <p v-else> No resources available</p>
      </div>
  </div>
</template>
<script lang="ts">

import { useRemoteResource } from "@/hooks/resource";


import { defineComponent, ref } from "vue"

import Resource from "@/models/Resource";


export default defineComponent({
    setup() {
        const [Get] = useRemoteResource(`${process.env.VUE_APP_API_URL}/type`);
        const resources = ref<Array<Resource>>([]);
        
        async function fetchResources() {
            const response:Resource[] = await Get();
            resources.value = response;
        }
        fetchResources()
        
        
        return { resources }
    }
})
</script>
<style lang="scss">
    .resources-view {
        @include fx-jc-c;
        .list-box {
            @include fx-jc-c;
            flex-direction: column;
            margin-top: 20px;
            width: 300px;
            padding: 20px;
            background-color: #EEE;
            box-shadow: 0 0 3px 1px #000;
            ul {
                list-style-type: none;
                padding-left:0;
            }
        }

    }
</style>