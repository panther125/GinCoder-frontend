import { createApp } from "vue";
import App from "./App.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "@/access";
import "bytemd/dist/index.css";


const app = createApp(App);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(store);
app.use(router);
app.component("svg-icon", SvgIcon);
app.mount("#app");
