import Vue from 'vue';
import VueRouter from 'vue-router';
import Background from 'components/Background/background';

Vue.use(VueRouter);

import 'src/config/http';
import routes from 'src/routes';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

new Vue({
  router,
  components: {
    Background
  }
}).$mount('#app');
