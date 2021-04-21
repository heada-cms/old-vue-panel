<template>
  <NavBar v-if="!isLoginView"></NavBar>
  <router-view/>
</template>

<script lang="ts">
import { NavBar } from "@/components/NavBar";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    NavBar
  },
  computed: {
    isLoginView(){
      return this.$route.path === "/login";
    }
  }
})
</script>

<style lang="scss">
  @import "./styles/_global.scss";
</style>
