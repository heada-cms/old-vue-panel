<template >
    <div class="columns is-centered">
        <div class="column is-half">
            <button class="button is-fullwidth is-link" @click="saveInstance">
                Save instance
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
                            <textarea class="textarea" cols="30" rows="10" v-if="resourceSchema[key].type === 'Object'" v-model="input[key]"></textarea>
                            <input class="input"   type="text" v-model="input[key]" v-else> 
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
        const { create } = useFetch(`${process.env.VUE_APP_API_URL}/${resourceName}`, {"Authorization": `Bearer ${store.getters['Token']}`});
        const resourceSchema = computed<Record<string,Record<string,any>>>(() => JSON.parse(store.state.resources.filter((el: Record<string, any>) => el.name == resourceName)[0].schema));
        
        const input = reactive<Record<string, any>>({});

        const computedInput = computed<Record<string, any>>(
            () => R.mapObjIndexed(
                (value: any, key: string) => R.toLower(resourceSchema.value[key].type) === "object" ? JSON.parse(value) : value 
            , input)
        )

       
        const saveInstance = async () => {
            console.log(computedInput)
            const validateInput = validateInputs(computedInput.value, resourceSchema.value);
            if (!validateInput) {
                alert('Required fields must be filled');
            } else {
            
                const response = await create(computedInput.value);
                console.log(response);
                
                router.push(`/resources/${resourceName}`)
            }
            
        }


        return {resourceSchema, resourceName, input, saveInstance, computedInput};
        
    },
})
</script>
