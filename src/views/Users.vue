<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <button class="button is-link is-fullwidth" @click="() => router.push('/users/create')">
                Create a new user
            </button>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-half">
            <Table :classProps="{'is-bordered': true, 'is-fullwidth': true, 'is-hoverable': true}" :keys="[{name:'User', displayName: 'User'}]"
                :data="users"
             />
        </div>
    </div>
</template>
<script lang="ts">
import Table from "../components/Table.vue";
import { computed, defineComponent } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from "vue-router";
export default defineComponent({
    components: {
        Table
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        store.dispatch('fetchUsers');
        const users = computed(() => store.state.users.map((el: {username: string, _id: string}) => ({data: el.username})))
        
        return { users, router };
    },
})
</script>
