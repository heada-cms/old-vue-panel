<template>
    <table class="table" :class="classProps">
            <thead>
                <tr>
                    <th v-for="key in keys" :key="key.name">{{ key.displayName }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="el in data" :key="el" @click="el.onClick">
                    <td>
                        {{ el.data }}
                    </td>
                </tr>
            </tbody>
    </table>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Key {
    name: string;
    displayName: string;
}

interface TableData {
    data: Record<string, unknown> | string;
    onClick?: () => void; 
} 



export default defineComponent({
    props: {
        classProps: Object,
        data: {
            type: Array as PropType<Array<TableData>>,
            required: true,
            default: () => []
        }, 
        keys: {
            type: Array as PropType<Array<Key>>,
            required: true
        }
    },
    
})
</script>

