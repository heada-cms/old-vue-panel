<template>
    <div class="resourcesPage columns is-centered">
        <div class="column is-half">
            <table class="table is-bordered is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Resource name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Post</td>
                    </tr>
                    <tr>
                        <td>Book</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const text = ref("Cello der");

        return { text }
    },
})
</script>
