
<template>
  <div class="loginPage  hero is-fullheight has-background-primary">
    <div class="hero-body container ">
        <div class="box has-text-centered">
            <form method="post">
                <label for="username">Username: </label>
                <input type="text" name="username" class="input m-3" v-model="form.username" />
                <label for="password">Password: </label>
                <input type="password" name="password" class="input m-3" v-model="form.password" />
                <button @click="login" class="button is-primary" :class="{'is-loading': buttonLoading}">Login</button>
            </form>
            
        </div>
    </div>

    </div>
</template>
<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useStore} from "vuex"
import {useRouter} from "vue-router";


export default defineComponent({



    
    setup() {
        const form = reactive({
            username: "",
            password: ""
        });

        const buttonLoading = ref(false);

        console.log(form);
        const store = useStore();
        const router = useRouter();

        async function login(e: Event) {
            e.preventDefault();
            buttonLoading.value = true;
            await store.dispatch('login', form);
            buttonLoading.value = false;
            if (store.getters["loggedIn"]) {
                router.push('/');
            } else {
                buttonLoading.value = false;
            }
        }

        return { form, login, buttonLoading };
            
    }
})
</script>


<style>

</style>


