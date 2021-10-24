<template>
    <nav class="navbar is-primary" role="navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <figure class="image is-128">
                    <img src="@/assets/heada-logo.svg"/>
                </figure>
                
            </div>
            <a role="button" aria-label="menu" @click.stop="showBurgerMenu = !showBurgerMenu" class="navbar-burger" :class="{'is-active': showBurgerMenu}">
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{'is-active': showBurgerMenu}">
            <div class="navbar-start">
                <a class="navbar-item" @click.stop="el.routeHandler" v-for="el in menuPositions" :key="el.name">
                    {{el.name}}
                </a>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        const router = useRouter();

        // eslint-disable-next-line @typescript-eslint/no-var-requires

        const showBurgerMenu = ref(false);

        const menuPositions = reactive([
            {name: "Home", href: "/"},
            {name: "Resources", href: "/resources"}
        ].map(el => ({
            ...el,
            routeHandler: () => { showBurgerMenu.value = false; router.push(el.href); }
        }))
        
        )


        return {menuPositions,showBurgerMenu}
    },
})
</script>

