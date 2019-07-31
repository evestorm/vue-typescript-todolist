import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button, Tabbar, TabbarItem, NavBar, Icon } from 'vant';

Vue.use(Button).use(Tabbar).use(TabbarItem)
.use(Icon).use(NavBar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
