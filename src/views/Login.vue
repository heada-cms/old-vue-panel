<template>
    <div class="login">
        <div class="form-card">
                <div class="form-wrapper">
                    <h3>Login to your app</h3>
                    <input type="text" v-model="login" placeholder="Username">
                    <input type="password" v-model="password" placeholder="Password">
                    <button v-on:click="handleLogin">
                        Login
                    </button>
                </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        const login = ref("");
        const password = ref("");

        function handleLogin() {
            console.log("Login: ", login.value)
        }
        
        return { login, password, handleLogin }

    }
})
</script>
<style lang="scss" >
    @import "../styles/_global.scss";
    .login {
        @include fx-jc-c;
        @include fx-ai-c;
        height: 100vh;
        width: 100%;
        background: $loginViewBackgroundColor;
        color: white;

        .form-card {
            width: 350px;
            height: 0.75 * 350px;
            border-radius: 25px;
            background: white;
            color: black;
            box-shadow: 0 0 13px 2px #555;

                .form-wrapper {
                    @include fx-jc-c;
                    
                    margin: auto;
                    flex-direction: column;
                    width: 70%;
                    input[type="text"] {
                        margin-bottom: 12px;
                    }
                    input[type="password"] {
                        margin-bottom: 12px;
                    }
                }
        }
        
    }
</style>