<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <label for="templateName">Resource's name: </label>
            <input type="text" name="templateName" class="input" v-model="templateName">
        </div>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const templateName = ref('');


        return {templateName};
    },
})
</script>
