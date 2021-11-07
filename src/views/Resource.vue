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
import { useStore } from 'vuex';


export default defineComponent({
    components: {
        Table
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const resourceName = ref(route.params.name);
        const {getMany} = useFetch(`${process.env.VUE_APP_API_URL}/${resourceName.value}`, {
           "Authorization": `Bearer ${store.getters["Token"]}`
        });
        
        const data = reactive([]);

        getMany()
            .then(fetched => {
                data.values = fetched.map((el: Record<string, unknown>) => ({data: el}));
            })
            

        return {data, resourceName};
    },
})
</script>
