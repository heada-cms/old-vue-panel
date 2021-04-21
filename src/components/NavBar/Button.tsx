import { defineComponent } from "vue";
import router from "../../router"
export const Button = defineComponent({
    props: {
        text: String,
        to: {
            default: "",
            type: String,
            required: false
        }
    },
    setup(props) {
        return () => <div class="navbar-btn" onClick={() => router.push(props.to)}> {props.text} </div>
    }
})