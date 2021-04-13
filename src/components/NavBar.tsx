import { defineComponent } from "vue";
import { Button } from "./NavBar/Button"
export const NavBar = defineComponent({
    setup() {
        const paths = ["Start", "Resources","Logout"]
        return () => <div class="navbar">
            <div class="btn-wrap">
                {paths.map(el => <Button text={el}></Button>)}
            </div>
        </div>
    }
})