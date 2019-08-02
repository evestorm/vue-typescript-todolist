import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadView(view: string) {
  return () => import(`./views/${view}`)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: loadView('Welcome'),
    },
    {
      path: '/main/:status',
      name: 'main',
      component: loadView('Main'),
    },
    {
      path: '*',
      redirect: '/main/todo',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'welcome') {
    next()
  } else {
    // 第一次访问页面转到欢迎页
    const versionNo = '1.0.0'
    if (!window.localStorage.getItem('update-version') || window.localStorage.getItem('update-version') !== versionNo) {
      window.localStorage.setItem('update-version', versionNo)
      next({name: 'welcome'})
    } else {
      next()
    }
  }
})

export default router
