import { defineComponent } from "vue";

export const Button = defineComponent({
    props: {
        text: String
    },
    setup(props) {
        return () => <div class="navbar-btn">{props.text}</div>
    }
})