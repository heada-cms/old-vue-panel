<template>
    <div class="resourcePage columns is-centered">
        <div class="column is-half">
            <Table :classProps="{'is-fullwidth': true, 'is-bordered': true, 'is-hoverable': true}" :keys="[{name: `${resourceName}`, displayName: `${resourceName}`}]"
                :data="data.values"
             />
        </div>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Table from "@/components/Table.vue";
import { useRoute } from "vue-router";
import useFetch from "@/hooks/useFetch";


export default defineComponent({
    components: {
        Table
    },
    setup() {
        const route = useRoute();
        const resourceName = ref(route.params.name);
        const {getMany} = useFetch(`http://localhost:3000/${resourceName.value}`);
        
        const data = reactive([]);

        getMany()
            .then(fetched => {
                data.values = fetched.map((el: Record<string, unknown>) => ({data: el}));
            })
            

        return {data, resourceName};
    },
})
</script>
