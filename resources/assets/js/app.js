import Vue from 'vue';
import axios from 'axios';

import store from './store';
import router from './router';
import App from './components/App';

window.Vue = Vue;
window.axios = axios;

axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

const app = new Vue({
    el: 'app',
    store,
    router,

    components: {
        App
    }
});
