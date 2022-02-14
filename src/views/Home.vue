

<template>
  <div class="home">
    <div class="columns is-centered">
      <div class="title column is-half">
        <h1>Welcome to Heada</h1>
        <figure class="image is-128x128">
          <img src="@/assets/heada-logo.svg"/>
        </figure>
      </div>
    </div>
    <div class="links">
      <button class="button is-link" v-for="path in paths" :key="path" @click="router.push(path.path)">{{ path.title }}</button>
      <button class="button is-danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";  
  export default defineComponent({
    setup() {
      const router = useRouter();
      const store = useStore();

      const logout = async () => {
        await store.dispatch('logout');
        router.push('/login');
      }

      const paths = [
        {
          title: "Resources",
          path: '/resources'
        },
        {
          title: "Users",
          path: '/users'
        },
        {
          title: "API Key creation",
          path: '/apikey'
        }
      ]
      return { paths, router, logout }
    }
  })
</script>
<style lang="scss" scoped>
  .title {
    text-align: center;
  }
  h1 { 
    margin: auto;
  }
  figure { 
    margin: auto;
  }
  .links {
    width: 50%;
    display: flex;
    margin: auto;
    button { 
      width: 20%;
      margin: auto;
    }
  }
</style>