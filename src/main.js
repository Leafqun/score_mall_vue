import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { goodUrl, picUrl, userUrl, orderUrl } from "./config/url";

Vue.config.productionTip = false;
Vue.prototype.$goodUrl = goodUrl;
Vue.prototype.$picUrl = picUrl;
Vue.prototype.$userUrl = userUrl;
Vue.prototype.$orderUrl = orderUrl;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
