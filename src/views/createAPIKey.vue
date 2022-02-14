<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <button class="button is-fullwidth is-link" @click="CreateAKey">
                Create a key
            </button>
            <p v-if="key">Copy that key. You will not be able later to retrieve it.</p>
            <input type="text" class="input" v-model="key" disabled placeholder="Your key will show here">
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-half">
              <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Operation</th>
                        <th>Authorizes?</th>
                    </tr>  
                </thead>
                <tbody>
                    <tr v-for="key in Object.keys(authorizationOptions)" :key="key">
                        <td>{{key}}</td>
                        <td>
                            <div class="select is-primary">
                                <select v-model="authorizationOptions[key]">
                                    <option :value="false">False</option>
                                    <option :value="true">True</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                </tbody>
                    
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import {useStore} from "vuex";
import { defineComponent, reactive, ref } from 'vue';
import useFetch from "@/hooks/useFetch";

export default defineComponent({
    setup() {
        const authorizationOptions = reactive({
            read: false,
            create: false,
            update: false,
            delete: false
        })
        const store = useStore();
        const key = ref<string>("")

        const {create} = useFetch(`${process.env.VUE_APP_API_URL}/keys`, {"Authorization": `Bearer ${store.getters['Token']}`})
        
        function CreateAKey() {
            return create({operation: authorizationOptions})
                .then(res => res.key ? key.value = res.key : key.value = "")
        }

        return { authorizationOptions, key, CreateAKey }
    },
})
</script>
