<template>
    <div class="columns is-centered is-multiline">
        <div class="column is-one-quarter">
            <label for="templateName">Resource's name: </label>
            <input type="text" name="templateName" class="input" v-model="templateName">
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-one-quarter">
            <button class="button is-fullwidth is-link is-outlined" @click="createSchema">
                Save Schema
            </button>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-half">
              <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Operation</th>
                        <th>Requires Auth</th>
                        <th>Available auth methods</th>
                    </tr>  
                </thead>
                <tbody>
                    <tr v-for="key in Object.keys(authorizationOptions)" :key="key">
                        <td>{{key}}</td>
                        <td>
                            <div class="select is-primary">
                                <select v-model="authorizationOptions[key].requiresAuth">
                                    <option :value="false">False</option>
                                    <option :value="true">True</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <input type="checkbox" v-model="authorizationOptions[key].availableMethods" value="Bearer" :id="`${key}Bearer`">
                            <label :for="`${key}Bearer`">Bearer</label>
                            <input type="checkbox" v-model="authorizationOptions[key].availableMethods" value="apiKey" :id="`${key}apiKey`">
                            <label :for="`${key}apiKey`">API key</label>
                        </td>
                    </tr>
                </tbody>
                    
            </table>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-one-quarter">
           <button class="button is-link is-fullwidth is-outlined" @click="FieldLogic.pushField">Add a field</button>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-half" >
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Type</th>
                        <th>Is required?</th>
                        <th>Is unique?</th>
                    </tr>
                    
                </thead>
                <tbody>
                    <tr v-for="field in FieldLogic.fields" :key="field">
                        <td><input class="input" type="text" v-model="field.fieldName"></td>
                        <td>
                            <div class="select is-primary">
                                <select v-model="field.properties.type">
                                    <option selected>String</option>
                                    <option>Number</option>
                                    <option>Object</option>
                                    <option>Array</option>
                                    <option>Boolean</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="select is-primary">
                                <select v-model="field.properties.required">
                                    <option :value="false">False</option>
                                    <option :value="true">True</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="select is-primary">
                                <select v-model="field.properties.unique">
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
import { defineComponent, ref, reactive } from 'vue';
import useFetch from "@/hooks/useFetch";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
interface IField {
    fieldName: string;
    properties: {
        type: string;
        required: boolean;
        unique: boolean;
    };
}



const fieldLogic = () => { 
    const fields = reactive<Array<IField>>([]);

    const pushField = () => fields.push({
        fieldName: "", 
        properties: {
            type: "String", 
            required: false, 
            unique: false
        }
    });

    return {fields, pushField};
}




export default defineComponent({
    setup() {
        const router = useRouter();
        const store = useStore();
        const { create } = useFetch(`${process.env.VUE_APP_API_URL}/template`, {"Authorization": `Bearer ${store.getters['Token']}`})


        const FieldLogic = fieldLogic();
        const authorizationOptions = reactive({
            read: {
                requiresAuth: true,
                availableMethods: ["Bearer"]
            },
            create: {
                requiresAuth: true,
                availableMethods: ["Bearer"]
            },
            update: {
                requiresAuth: true,
                availableMethods: ["Bearer"]
            },
            delete: {
                requiresAuth: true,
                availableMethods: ["Bearer"]
            }
        })


        const createSchema = async () => {
            if (templateName.value.trim() !== "") {
                    const template = {
                    name: templateName.value,
                    authorization: authorizationOptions,
                    schema: JSON.stringify(Object.fromEntries(FieldLogic.fields.filter(el => el.fieldName.length > 0).map(el => [el.fieldName, el.properties])) )
                }

                console.log(template)
                const response = await create(template);

                console.log(response);
                router.push('/resources')

            } 
            
            

        }
        




        const templateName = ref('');
        return {templateName, FieldLogic, authorizationOptions, createSchema};
    },
})








</script>
