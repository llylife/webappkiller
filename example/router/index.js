/**
 * 定义路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


const router= new VueRouter({
  mode: 'hash',
  routes: [
    {path: '/buttons', component:() => System.import("../views/buttons")},

    {path: '/badge', component: () => System.import('../views/badge')},
    //{path: '/badge', component: badge},
    {path: '/icon', component: () => System.import('../views/vuexicon')},
    {path: '/list', component: () => System.import('../views/list')},
    {path: '/', component: () => System.import('../views/home')},
    {
      path: '/cell', component:() =>  System.import('../views/cell'), children: [
      {
        path: 'abc',
        component:() =>  System.import('../views/grid')
      }
    ]
    },
    {path: '/grid', component: () => System.import('../views/grid')},
    {path: '/nothing', component: () => System.import('../views/nothing')},
    {path: '/icontext', component: () => System.import('../views/iconText')},
    {path: '/headerbar', component: () => System.import('../views/headerBar')},
    {path: '/spinner', component:  () => System.import('../views/spinner')},
    {path: '/vuexexample', component: () => System.import('../views/vuexexample')},
    {path: '/infiniteloader', component: () => System.import('../views/infiniteloaderexample')},
    {path: '/form', component: () => System.import('../views/form')},
    {path: '/picker', component: () => System.import('../views/pickers')},
    {path: '/actionSheet', component: () => System.import('../views/actionSheet')},
    {path: '/overlay', component: () => System.import('../views/overlay.vue')},
    {path: '/tabbar', component: () => System.import('../views/tabbar.vue')},
    {path: '/bottomnav', component: () => System.import('../views/bottomNav.vue')},
    {path: '/pop', component: () => System.import('../views/popup.vue')},
  ],
});
export default router;