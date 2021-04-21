import { defineComponent } from "vue";
import { Button } from "./NavBar/Button";


export const NavBar = defineComponent({
    setup() {
        const paths = [{text: "Start", to: "/"}, {text: "Resources", to: "/resources"},{text:"Logout"}]
        return () => <div class="navbar">
            <div class="btn-wrap">
                {paths.map(el => <Button text={el.text} to={el.to}></Button>)}
            </div>
        </div>
    }
})