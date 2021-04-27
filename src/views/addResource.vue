<template >
    <div class="addResource-view">
        <div class="res-form-wrapper">
            <label for="schemaName"> Schema's name: </label> <input type="text" name="schemaName" v-model="schema.name">
            <div class="wrap-btn">
                <button id="addFieldBtn" @click="setAddNewField"> Add a new field</button>
                <button @click="saveSchema"> Save schema </button>
            </div>
            <div class="new-field-form" v-if="toAddNewField === true">
                <label for="fieldName">Field's name: </label> <input type="text" name="fieldName" v-model="fieldName">
                <label for="fieldType">Type: </label> <input type="text" name="fieldType" v-model="field.type">

                
                <label for="fieldRequired">Required: </label>
                <div class="radio-group">
                    <label for="fieldRequiredFalse">False</label> 
                    <input type="radio" id="fieldRequiredFalse" name="fieldRequired" :value="false" v-model="field.required"> 
                    <label for="fieldRequiredTrue">True</label> 
                    <input type="radio" id="fieldRequiredTrue" name="fieldRequired" :value="true" v-model="field.required">
                </div>

                <label for="fieldUnique">Unique: </label>
                <div class="radio-group">
                    <label for="fieldUniqueFalse">False</label> 
                    <input type="radio" id="fieldUniqueFalse" name="fieldUnique" :value="false" v-model="field.unique"> 
                    <label for="fieldUniqueTrue">True</label> 
                    <input type="radio" id="fieldUniqueTrue" name="fieldUnique" :value="true" v-model="field.unique">
                </div>
                <label for="fieldTrim" v-if="field.type === 'String'">Trim: </label>
                <div class="radio-group" v-if="field.type === 'String'">
                    <label for="fieldTrimFalse">False</label> 
                    <input type="radio" id="fieldTrimFalse" name="fieldTrim" :value="false" v-model="field.trim"> 
                    <label for="fieldTrimTrue">True</label> 
                    <input type="radio" id="fieldTrimTrue" name="fieldTrim" :value="true" v-model="field.trim">
                </div>
                <button @click="addNewField"> Save field </button>
               
            </div>
            <div class="fields" v-if="!toAddNewField">
                <ul>
                    <li v-for="field in Array.from(schema.schema)" :key="field[0]" > {{field[0]}} </li>
                </ul>
            </div>
            

        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { useRemoteResource } from "@/hooks/resource";
import { useRouter } from "vue-router";
import Schema from "../models/Schema";
import SchemaField from "../models/SchemaField";


interface prepSchema {
    name: string;
    schema: Record<string, SchemaField>;
}



export default defineComponent({
    setup() {
        const router = useRouter()


        const schema = reactive<Schema>({name: "", schema: new Map<string, SchemaField>()});
        //flag to see if you want add a new field
        const toAddNewField = ref(false);
        //name of new field
        const fieldName = ref("");
        //props of a new field
        const field= reactive<SchemaField>({
            type: "",
            unique: false,
            required: false,
            trim: false
        })

        function setAddNewField() {
            toAddNewField.value = !toAddNewField.value;
        }

        function addNewField() {
            schema.schema.set(fieldName.value, {...field})
            toAddNewField.value = false;
        }
        watchEffect(() => console.log(schema.schema))


        //post new schema 

        const [, post] = useRemoteResource(`${process.env.VUE_APP_API_URL}/type`);
        async function saveSchema(){
            const preparedSchema: prepSchema = {name: schema.name, schema: {}};
            Array.from(schema.schema).forEach(el => {
                preparedSchema.schema[el[0]] = el[1]
            })
            
            const schemaStringified = JSON.stringify(preparedSchema.schema)
            const response = await post({name: preparedSchema.name, schema: schemaStringified});
            console.log(response)
            router.push('/resources')

        }


        return { schema, saveSchema,  toAddNewField ,addNewField, setAddNewField, fieldName, field }
    }
})

</script>
<style lang="scss">
    .addResource-view {
        padding-top: 15px;
        @include fx-jc-c;
        .res-form-wrapper {
            @include fx-jc-c;
            font-size: 17px;
            flex-direction: column;
            width: 500px;
            input[type="text"] {
                padding: 5px;
            }
            .wrap-btn {
                @include fx-jc-c;
                margin: 15px;
                width: 100%;
            }
            .new-field-form {
                @include fx-jc-c;
                flex-direction: column;
                .radio-group {
                    margin: 5px;
                    label {
                        font-size: 13px;
                    }
                }
            }
        }
    }
</style>