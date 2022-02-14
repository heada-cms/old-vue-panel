<template >
    <div class="columns is-centered">
        <div class="column is-half">
            <button class="button is-fullwidth is-link" @click="saveInstance">
                Update instance
            </button>
            <button class="button is-fullwidth is-danger" @click="deleteInstance">
                Delete instance
            </button>
            <table class="table is-fullwidth">
                <thead>
                    <th>Field</th>
                    <th>Value</th>
                </thead>
                <tbody>
                    <tr v-for="key in Object.keys(resourceSchema)" :key="key">
                        <td>{{key}}</td>
                        <td> 
                            <textarea class="textarea" cols="30" rows="10" v-if="resourceSchema[key].type === 'Object'" v-model="input.value[key]"></textarea>
                            <input class="input"   type="text" v-model="input.value[key]" v-else> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import useFetch from '@/hooks/useFetch';
import * as R from "ramda";

function validateInputs(input: Record<string,any>, schema: Record<string, Record<string,any>>) {
    return R.pipe(
        R.keys,
        R.filter(
            (key:string) => schema[key].required && (input[key] === undefined || !input[key].length)
        ),  
        
        (keys: Array<string>) => keys.length > 0 ? false : true
    )(schema)
}




export default defineComponent({
    setup() {
        const resourceName = useRoute().params.name;
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const { getOne,update, del } = useFetch(`${process.env.VUE_APP_API_URL}/${resourceName}`, {"Authorization": `Bearer ${store.getters['Token']}`});
        const resourceSchema = computed<Record<string,Record<string,any>>>(() => JSON.parse(store.state.resources.filter((el: Record<string, any>) => el.name == resourceName)[0].schema));
        
        const input = reactive<Record<string, any>>({});

        getOne(typeof route.params.id === 'string' ? route.params.id : route.params.id[0])
            .then(fetched => {
                input.value = R.clone(fetched);
            })


        const computedInput = computed<Record<string, any>>(
            () => R.mapObjIndexed(
                (value: any, key: string) => R.toLower(value.type) === "object" ? JSON.parse(input.value[key]) : input.value[key]
            , resourceSchema.value)
        )

       
        const saveInstance = async () => {
            console.log(computedInput)
            const validateInput = validateInputs(computedInput.value, resourceSchema.value);
            if (!validateInput) {
                alert('Required fields must be filled');
            } else {
                const id = route.params.id;
                const response = await update(typeof id === 'string' ?  id : id[0],computedInput.value);
                console.log(response);
                
                router.push(`/resources/${resourceName}`)
            }   
        }

        const deleteInstance = async () => {
            const id = route.params.id;
            console.log("Id: ", id)
            await del(typeof id === 'string' ?  id : id[0]);
            router.push(`/resources/${resourceName}`)
        }

        return {resourceSchema, resourceName, input, saveInstance, deleteInstance, computedInput};
    },
})
</script>
