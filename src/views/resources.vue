<template>
  <div class="resources">
      <div class="list-box">
        <Table :resources="resources" />
      </div>
  </div>
</template>
<script lang="ts">

import { useRemoteResource } from "@/hooks/resource";
import Table from "@/components/Views/Resources/Table.vue";

import { defineComponent, ref } from "vue"

interface Res {
    name: string;
    schema: string;
}

export default defineComponent({
    components: {
        Table
    },
    setup() {
        const [Get] = useRemoteResource(`${process.env.VUE_APP_API_URL}/resource`);
        const resources = ref<Array<Res>>([]);
        
        async function fetchResources() {
            const response:Res[] = await Get();
            resources.value = response;
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