<template>
  <Navbar v-if="showNavbar" />
  <router-view/>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router';
import Navbar from "./components/Navbar.vue";
export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const showNavbar =  computed(() => route.fullPath !== '/login')
    return {showNavbar}
  },
})
</script>

