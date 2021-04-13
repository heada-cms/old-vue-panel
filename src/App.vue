<template>
  <NavBar v-if="!isLoginView"></NavBar>
  <router-view/>
</template>

<script lang="ts">
import { NavBar } from "@/components/NavBar";
export default {
  components: {
    NavBar
  },
  computed: {
    isLoginView(): boolean {
      return this.$route.path === "/login"
    }
  }
}
</script>

<style lang="scss">
  @import "./styles/_global.scss";
</style>
