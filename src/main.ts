import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button, Tabbar, TabbarItem, NavBar, Icon, Popup, Field, Cell, CellGroup } from 'vant';

Vue.use(Button).use(Tabbar).use(TabbarItem)
.use(Icon).use(NavBar).use(Popup)
.use(Field).use(Cell).use(CellGroup);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
