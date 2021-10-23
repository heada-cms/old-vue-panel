<template>
    <div class="resourcesPage columns is-centered">
        <div class="column is-half">
            <Table :classProps="{'is-bordered': true, 'is-fullwidth': true, 'is-hoverable': true}" :keys="[{name:'Resource name', displayName: 'Resource name'}]"
                :data="resources.values"
             />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from "vue-router";
import useFetch from "@/hooks/useFetch";
import Table from '@/components/Table.vue';

export default defineComponent({
    components: {
        Table,
    },
    setup() {
        const { getMany } = useFetch('http://localhost:3000/template');
        const resources = reactive([]);
        const router = useRouter();

        getMany()
            .then(fetched => { 
                resources.values = fetched.map((el:Record<string, unknown>) => ({data: el.name, onClick: () => router.push(`/resources/${el.name}`)}))
            })

        return { resources }
    },
})
</script>
