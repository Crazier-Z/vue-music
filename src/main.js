import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import Fastclick from "fastclick";
import "@/assets/style/index.less";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: require("@/assets/image/default.png")
});

import { NavBar, Icon } from "vant";

Vue.use(NavBar).use(Icon);

Fastclick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
