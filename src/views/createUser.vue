<template >
    <div class="columns is-centered">
        <div class="column is-half">
            <button class="button is-link is-fullwidth" @click="saveUser">Save a user</button>
            <input type="text" class="input" placeholder="username" v-model="input.username">
            <input type="password" class="input" placeholder="password" v-model="input.password">
            Is admin: 
            <div class="select is-primary">
                <select v-model="input.isAdmin">
                    <option :value="false">False</option>
                    <option :value="true">True</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive} from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useFetch from '@/hooks/useFetch';
import * as R from "ramda";

function validateInput(input: Record<string,any>) {
    return input.username.trim().length > 0 && input.password.trim().length > 0;
}


export default defineComponent({
    setup() {
        const store = useStore();
        const input = reactive<Record<string,any>>({
            username: '', 
            password: '', 
            isAdmin: false
        });
        const router = useRouter();

        const { create }  = useFetch(`${process.env.VUE_APP_API_URL}/user`, {"Authorization": `Bearer ${store.getters['Token']}`});

        const saveUser = async () => {
            if (validateInput(input)) {
                const response  = await create(input)
                router.push('/users')
                return;
            }
            alert('Username and password cannot be empty');
        }

        return { input, saveUser } 
    }
})
</script>
  