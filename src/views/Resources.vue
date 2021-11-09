<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <button class="button is-link is-fullwidth" @click="() => router.push('/resource/create')">
                Create a new schema
            </button>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-half">
            <Table :classProps="{'is-bordered': true, 'is-fullwidth': true, 'is-hoverable': true}" :keys="[{name:'Resource name', displayName: 'Resource name'}]"
                :data="resources"
             />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Table from '@/components/Table.vue';

export default defineComponent({
    components: {
        Table
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        store.dispatch('fetchResources');
        const resources = computed(() => store.state.resources.map((el:Record<string, unknown>) => ({data: el.name, onClick: () => router.push(`/resources/${el.name}`)})))
        return { resources, router }
    },
})
</script>
