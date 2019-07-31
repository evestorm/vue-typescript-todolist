import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadView(view: string) {
  return () => import(`./views/${view}`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: loadView('Welcome'),
    },
    {
      path: '/main',
      component: loadView('Main'),
      children: [
        {
          path: 'todo',
          name: 'todo',
          component: loadView('Todo'),
        },
        {
          path: 'done',
          name: 'done',
          component: loadView('Done'),
        },
        {
          path: 'all',
          name: 'all',
          component: loadView('All'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/',
      redirect: '/main',
    },
  ],
});
