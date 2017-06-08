import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';
import Guard from '../router/guard';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: Guard.guest
        },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: Guard.auth
        },
        {
            path: '*',
            redirect: '/',
            beforeEnter: Guard.auth
        }
    ],
    linkActiveClass: 'is-active'
});
